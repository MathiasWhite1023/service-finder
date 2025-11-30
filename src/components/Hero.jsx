import { Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-8 text-white">
                    O que você precisa hoje?
                </h1>

                <form onSubmit={handleSubmit} className="relative w-full group">
                    <input
                        type="text"
                        className="input-minimal text-center md:text-left pl-4 md:pl-12 pr-12 pb-4"
                        placeholder="Ex: Encanador, ou 'Quero cadastrar meu serviço'"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <Search className="absolute left-0 top-0 h-6 w-6 text-gray-500 hidden md:block mt-1" />

                    <button
                        type="submit"
                        className="absolute right-0 top-0 p-2 text-white opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <ArrowRight className="h-6 w-6" />
                    </button>
                </form>

                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                    <span>Sugestões:</span>
                    <button onClick={() => { setQuery('encanador'); onSearch('encanador') }} className="hover:text-white transition-colors">Encanador</button>
                    <button onClick={() => { setQuery('design'); onSearch('design') }} className="hover:text-white transition-colors">Design</button>
                    <button onClick={() => { setQuery('quero cadastrar'); onSearch('quero cadastrar') }} className="hover:text-white transition-colors text-blue-400">Cadastrar Serviço</button>
                </div>
            </div>
        </div>
    );
}
