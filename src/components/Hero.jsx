import { Search, Plus, ArrowRight, Mic, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const PLACEHOLDERS = [
    "Encontrar um encanador...",
    "Aulas de inglês...",
    "Design de logotipo...",
    "Limpeza residencial..."
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
        <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative z-10 px-4">

            {/* Main Content */}
            <div className="w-full max-w-4xl flex flex-col items-center text-center animate-fade-in">

                {/* Greeting / Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 tracking-tight">
                    Olá, Visitante
                </h1>
                <p className="text-xl text-gray-400 mb-12 font-light">
                    Como podemos ajudar você hoje?
                </p>

                {/* Gemini-style Search Bar */}
                <div className="w-full max-w-2xl relative group">
                    <form onSubmit={handleSubmit} className="relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative flex items-center bg-[#1e1e1e] border border-white/10 rounded-full shadow-2xl transition-all duration-300 hover:border-white/20 hover:bg-[#252525]">
                            {/* Left Icon (Plus/Sparkles) */}
                            <button type="button" className="p-4 text-gray-400 hover:text-white transition-colors">
                                <Sparkles className="w-6 h-6" />
                            </button>

                            {/* Input */}
                            <input
                                type="text"
                                className="w-full bg-transparent border-none text-lg text-white placeholder-gray-500 focus:ring-0 focus:outline-none py-4 px-2"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={placeholder + (isPaused ? '|' : '')}
                                autoFocus
                            />

                            {/* Right Icons (Mic/Submit) */}
                            <div className="flex items-center pr-2 gap-1">
                                <button type="button" className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                                    <Mic className="w-5 h-5" />
                                </button>
                                {query && (
                                    <button type="submit" className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Quick Actions / Suggestions */}
                <div className="mt-12 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={() => onSearch('cadastrar')}
                        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Cadastrar Serviço
                    </button>
                    <button
                        onClick={() => onSearch('limpeza')}
                        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                    >
                        Limpeza
                    </button>
                    <button
                        onClick={() => onSearch('manutenção')}
                        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                    >
                        Manutenção
                    </button>
                </div>

            </div>
        </div>
    );
}
