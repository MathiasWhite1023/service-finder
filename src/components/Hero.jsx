import { Search, Plus, Sparkles, Mic } from 'lucide-react';
import { useState } from 'react';

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-16 text-center animate-fade-in">
            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Encontre serviços de qualidade
            </h1>
            <p className="text-lg text-gray-600 mb-12">
                Conectamos você aos melhores profissionais da região
            </p>

            {/* Gemini-style Search Bar */}
            <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
                <div className="relative flex items-center gap-3 bg-white border-2 border-gray-300 rounded-full px-5 py-4 shadow-lg hover:shadow-xl transition-shadow focus-within:border-blue-500 focus-within:shadow-xl">

                    {/* Left icons */}
                    <button
                        type="button"
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Plus className="w-5 h-5 text-gray-600" />
                    </button>

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
                        placeholder="Buscar serviços..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />

                    {/* Right icons */}
                    <button
                        type="button"
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Mic className="w-5 h-5 text-gray-600" />
                    </button>

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
        </div>
    );
}
