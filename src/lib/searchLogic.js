import { services as mockServices } from './mockData';
import { supabase } from './supabaseClient';

export const INTENT_SEARCH = 'SEARCH';
export const INTENT_REGISTER = 'REGISTER';

export function detectIntent(query) {
    if (!query) return INTENT_SEARCH;

    const lower = query.toLowerCase();
    const registerKeywords = [
        'cadastrar', 'cadastro', 'registrar', 'registro',
        'sou prestador', 'oferecer serviço', 'vender serviço',
        'trabalhar', 'anunciar', 'criar conta'
    ];

    if (registerKeywords.some(keyword => lower.includes(keyword))) {
        return INTENT_REGISTER;
    }

    return INTENT_SEARCH;
}

// Levenshtein Distance for fuzzy matching
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function isFuzzyMatch(text, pattern) {
    if (!text || !pattern) return false;
    const lowerText = text.toLowerCase();
    const lowerPattern = pattern.toLowerCase();

    // Direct match
    if (lowerText.includes(lowerPattern)) return true;

    // Fuzzy match for words > 3 chars
    if (lowerPattern.length > 3) {
        const words = lowerText.split(/\s+/);
        return words.some(word => {
            const distance = levenshteinDistance(word, lowerPattern);
            // Allow 1 edit for every 4 characters
            const maxDistance = Math.floor(lowerPattern.length / 4) + 1;
            return distance <= maxDistance;
        });
    }

    return false;
}

// Helper to calculate score
function calculateScore(service, lowerQuery, queryTokens) {
    let score = 0;

    // Direct matches in title (Very High weight)
    if (service.title.toLowerCase().includes(lowerQuery)) score += 20;

    // Direct matches in category (High weight)
    if (service.category.toLowerCase().includes(lowerQuery)) score += 10;

    // Tag matches (High weight per tag)
    if (service.tags && Array.isArray(service.tags)) {
        service.tags.forEach(tag => {
            if (lowerQuery.includes(tag.toLowerCase())) score += 15;
        });
    }

    // Fuzzy/Token matching
    queryTokens.forEach(token => {
        // Title fuzzy match
        if (isFuzzyMatch(service.title, token)) score += 5;

        // Category fuzzy match
        if (isFuzzyMatch(service.category, token)) score += 4;

        // Description fuzzy match
        if (isFuzzyMatch(service.description, token)) score += 2;

        // Tags fuzzy match
        if (service.tags && Array.isArray(service.tags)) {
            service.tags.forEach(tag => {
                if (isFuzzyMatch(tag, token)) score += 6;
            });
        }
    });

    return score;
}

export async function searchServices(query) {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    const queryTokens = lowerQuery.split(/\s+/).filter(t => t.length > 2);

    let allServices = [];

    try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
            .from('services')
            .select('*');

        if (error || !data || data.length === 0) {
            console.warn('Supabase fetch failed or empty, using mock data:', error);
            allServices = mockServices;
        } else {
            allServices = data;
        }
    } catch (err) {
        console.warn('Supabase connection error, using mock data:', err);
        allServices = mockServices;
    }

    // Apply "AI" scoring logic client-side
    return allServices.map(service => {
        const score = calculateScore(service, lowerQuery, queryTokens);
        return { ...service, score };
    })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);
}
