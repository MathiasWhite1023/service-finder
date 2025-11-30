import { Search } from 'lucide-react';
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

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
                <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
                        placeholder="Buscar serviços..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    {query && (
                        <button
                            type="submit"
                            className="mr-2 px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Buscar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
