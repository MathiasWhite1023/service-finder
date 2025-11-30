import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const PLACEHOLDERS = [
    "Procuro um encanador...",
    "Quero cadastrar meu serviço...",
    "Busco aulas de inglês...",
    "Preciso de um designer...",
    "Sou prestador de serviços...",
    "Encontrar um jardineiro..."
];

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Typewriter Effect Logic
    useEffect(() => {
        const currentText = PLACEHOLDERS[placeholderIndex];

        let timer;

        if (isPaused) {
            timer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting) {
            if (charIndex > 0) {
                timer = setTimeout(() => {
                    setPlaceholder(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, 50);
            } else {
                setIsDeleting(false);
                setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
            }
        } else {
            if (charIndex < currentText.length) {
                timer = setTimeout(() => {
                    setPlaceholder(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, 100);
            } else {
                setIsPaused(true);
            }
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, isPaused, placeholderIndex]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="input-premium-container group relative animate-fade-in-up animate-pulse-glow">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-7 w-7 text-purple-300 group-focus-within:text-purple-200 transition-all duration-500 z-10 drop-shadow-lg" />

                <input
                    type="text"
                    className="input-premium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    placeholder={placeholder}
                />
            </form>
        </div>
    );
}
