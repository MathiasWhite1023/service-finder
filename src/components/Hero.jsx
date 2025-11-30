import { Plus, Sparkles, Mic } from 'lucide-react';
import { useState, useEffect } from 'react';

const SUGGESTIONS = [
    "Busque por encanadores, eletricistas...",
    "Encontre aulas de inglês, música...",
    "Procure por designers, desenvolvedores...",
    "Descubra serviços de limpeza, jardinagem...",
    "Ou adicione seu próprio serviço"
];

export function Hero({ onSearch, onAddService }) {
    const [query, setQuery] = useState('');
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    // Rotate suggestions
    useEffect(() => {
        if (isTyping) return;

        const interval = setInterval(() => {
            setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isTyping]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleAddService = () => {
        onAddService();
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="w-full max-w-3xl text-center animate-fade-in">
                {/* Title */}
                <h1 className="text-6xl font-bold text-gray-900 mb-3">
                    ServiceHub
                </h1>
                <p className="text-lg text-gray-600 mb-10">
                    {SUGGESTIONS[suggestionIndex]}
                </p>

                {/* Gemini-style Search Bar */}
                <form onSubmit={handleSubmit} className="relative">
                    <div className="relative flex items-center gap-3 bg-white border-2 border-gray-300 rounded-full px-5 py-4 shadow-lg hover:shadow-xl transition-all focus-within:border-blue-500 focus-within:shadow-xl">

                        {/* Add Service Button */}
                        <button
                            type="button"
                            onClick={handleAddService}
                            className="p-1.5 hover:bg-blue-50 rounded-full transition-colors group"
                            title="Adicionar serviço"
                        >
                            <Plus className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </button>

                        {/* Categories Button */}
                        <button
                            type="button"
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Sparkles className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600 font-medium">Categorias</span>
                        </button>

                        {/* Input */}
                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-base"
                            placeholder="Busque ou adicione serviços..."
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setIsTyping(e.target.value.length > 0);
                            }}
                            autoFocus
                        />

                        {/* Mic Button */}
                        <button
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Mic className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Search Button (appears when typing) */}
                        {query && (
                            <button
                                type="submit"
                                className="ml-2 px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
                            >
                                Buscar
                            </button>
                        )}
                    </div>
                </form>

                {/* Quick suggestions below */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-sm text-gray-500">Experimente:</span>
                    {['Encanador', 'Aulas de inglês', 'Design'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setQuery(tag);
                                setIsTyping(true);
                                onSearch(tag);
                            }}
                            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
