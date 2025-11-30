import { Search } from 'lucide-react';
import { useState } from 'react';

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center animate-fade-in">
            <form onSubmit={handleSubmit} className="input-glow-container group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-300" />
                <input
                    type="text"
                    className="input-glow"
                    placeholder="O que você procura?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
            </form>
        </div>
    );
}
