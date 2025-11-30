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
            }, 2000); // Wait 2s before deleting
        } else if (isDeleting) {
            if (charIndex > 0) {
                timer = setTimeout(() => {
                    setPlaceholder(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, 50); // Delete speed
            } else {
                setIsDeleting(false);
                setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
            }
        } else {
            if (charIndex < currentText.length) {
                timer = setTimeout(() => {
                    setPlaceholder(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, 100); // Typing speed
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
        <div className="w-full flex flex-col items-center justify-center animate-fade-in px-4">
            <form onSubmit={handleSubmit} className="input-liquid-container group relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-white transition-colors duration-300 z-10" />

                <input
                    type="text"
                    className="input-liquid"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />

                {/* Custom Placeholder Overlay to allow for typewriter effect */}
                {!query && (
                    <div className="absolute left-[4rem] top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-lg font-light tracking-wide">
                        {placeholder}
                        <span className="cursor-blink"></span>
                    </div>
                )}
            </form>
        </div>
    );
}
