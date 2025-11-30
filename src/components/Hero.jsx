import { Search, Plus, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const PLACEHOLDERS = [
    "Procuro um encanador...",
    "Busco aulas de inglês...",
    "Preciso de um designer...",
    "Encontrar um jardineiro..."
];

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('search');
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
        if (activeTab === 'search') {
            onSearch(query);
        } else {
            onSearch('cadastrar');
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative z-10">
            {/* Main Glass Card */}
            <div className="glass-frosted rounded-[3rem] p-12 w-full max-w-4xl relative overflow-hidden animate-fade-in-up shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                {/* Decorative Background Elements inside Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Encontre o serviço <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                            perfeito para você
                        </span>
                    </h1>

                    <p className="text-lg text-white/70 mb-10 max-w-xl font-light">
                        Conectamos você aos melhores profissionais da região. Simples, rápido e seguro.
                    </p>

                    {/* Tabs */}
                    <div className="flex p-1.5 bg-black/20 backdrop-blur-md rounded-full border border-white/10 mb-8">
                        <button
                            onClick={() => setActiveTab('search')}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'search'
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Buscar
                        </button>
                        <button
                            onClick={() => setActiveTab('register')}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'register'
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Cadastrar
                        </button>
                    </div>

                    {/* Action Area */}
                    <div className="w-full max-w-2xl">
                        {activeTab === 'search' ? (
                            <form onSubmit={handleSubmit} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                                <div className="relative flex items-center">
                                    <Search className="absolute left-6 text-white/50 w-6 h-6" />
                                    <input
                                        type="text"
                                        className="w-full bg-white/10 border border-white/10 rounded-full py-5 pl-16 pr-6 text-lg text-white placeholder-white/40 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all shadow-inner"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={placeholder + (isPaused ? '|' : '')}
                                        autoFocus
                                    />
                                    <button type="submit" className="absolute right-3 bg-white text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                onClick={() => onSearch('cadastrar')}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg font-bold py-5 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-3 group"
                            >
                                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                Começar Cadastro Gratuito
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
