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

// Helper to calculate score (same logic as before)
function calculateScore(service, lowerQuery, queryTokens) {
    let score = 0;

    // Direct matches in title (High weight)
    if (service.title.toLowerCase().includes(lowerQuery)) score += 10;

    // Direct matches in category (Medium weight)
    if (service.category.toLowerCase().includes(lowerQuery)) score += 5;

    // Tag matches (High weight per tag)
    if (service.tags && Array.isArray(service.tags)) {
        service.tags.forEach(tag => {
            if (lowerQuery.includes(tag.toLowerCase())) score += 8;
        });
    }

    // Description matches (Low weight)
    if (service.description.toLowerCase().includes(lowerQuery)) score += 3;

    // Fuzzy/Token matching
    queryTokens.forEach(token => {
        if (service.title.toLowerCase().includes(token)) score += 2;
        if (service.description.toLowerCase().includes(token)) score += 1;
        if (service.tags && Array.isArray(service.tags)) {
            service.tags.forEach(tag => {
                if (tag.toLowerCase().includes(token)) score += 3;
            });
        }
    });

    return score;
}

export async function searchServices(query) {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    const queryTokens = lowerQuery.split(' ').filter(t => t.length > 2);

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
