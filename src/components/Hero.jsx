import { Search, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

const PLACEHOLDERS = [
    "Procuro um encanador...",
    "Busco aulas de inglês...",
    "Preciso de um designer...",
    "Encontrar um jardineiro..."
];

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('search'); // 'search' or 'register'
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
        <div className="w-full flex flex-col items-center justify-center px-4 min-h-[40vh]">
            {/* Premium Glass Tabs */}
            <div className="flex space-x-1 mb-10 p-1 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl animate-fade-in-up">
                <button
                    onClick={() => setActiveTab('search')}
                    className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${activeTab === 'search'
                            ? 'bg-white text-black shadow-lg scale-105'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    Buscar Serviço
                </button>
                <button
                    onClick={() => setActiveTab('register')}
                    className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${activeTab === 'register'
                            ? 'bg-white text-black shadow-lg scale-105'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    Cadastrar Serviço
                </button>
            </div>

            {/* Content */}
            <div className="w-full max-w-3xl relative">
                {activeTab === 'search' ? (
                    <form onSubmit={handleSubmit} className="input-premium-container group relative animate-fade-in-up">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50 group-focus-within:text-white transition-all duration-500 z-10" />
                        <input
                            type="text"
                            className="input-premium"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                            placeholder={placeholder}
                        />
                    </form>
                ) : (
                    <div className="animate-fade-in-up flex flex-col items-center text-center space-y-6">
                        <div className="glass-panel p-10 rounded-[2rem] max-w-xl w-full border border-white/10">
                            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Divulgue seu trabalho</h2>
                            <p className="text-gray-400 mb-8 text-lg font-light">Junte-se a milhares de profissionais e encontre novos clientes hoje mesmo.</p>

                            <button
                                onClick={() => onSearch('cadastrar')}
                                className="btn-premium w-full flex items-center justify-center gap-3 text-lg py-4"
                            >
                                <Plus className="w-5 h-5" />
                                Começar Cadastro
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
