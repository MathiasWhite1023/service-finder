import { Search } from 'lucide-react';
import { useState } from 'react';

export function Hero({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
            <div className="container relative z-10 text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                        style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                        Encontre o serviço perfeito, <br /> sem complicações.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground mb-10">
                        De encanadores a designers, conectamos você aos melhores profissionais.
                        Nossa IA encontra exatamente o que você precisa.
                    </p>

                    <form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl">
                        <div className="relative glass-panel rounded-2xl p-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 shadow-lg">
                            <div className="flex items-center">
                                <Search className="ml-4 h-6 w-6 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-none px-4 py-3 text-lg focus:outline-none text-gray-800 placeholder:text-gray-400"
                                    placeholder="O que você está procurando? (ex: conserto pia, logo, jardim)"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary px-8 py-3 rounded-xl shadow-md"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Tente pesquisar por: <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setQuery('encanador'); onSearch('encanador') }}>Encanador</span>, <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setQuery('design'); onSearch('design') }}>Design</span>, <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setQuery('jardim'); onSearch('jardim') }}>Jardim</span>
                        </p>
                    </form>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[600px] opacity-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(255,255,255,0) 70%)',
                    filter: 'blur(60px)'
                }}>
            </div>
        </div >
    );
}
