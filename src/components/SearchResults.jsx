import { ServiceCard } from './ServiceCard';

export function SearchResults({ results, query }) {
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-24 animate-fade-in-up">
                <div className="glass-panel rounded-[2rem] p-12 max-w-md mx-auto border border-white/5">
                    <div className="bg-white/5 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <span className="text-5xl opacity-80">🔍</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Nenhum serviço encontrado
                    </h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                        Tente usar termos diferentes ou verifique a ortografia. Procure por "{query}"
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Resultados para{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            "{query}"
                        </span>
                    </h2>
                    <span className="text-sm font-medium text-white/60 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10">
                        {results.length} {results.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {results.map((service, index) => (
                        <div
                            key={service.id}
                            className={`w-full max-w-sm animate-fade-in-up stagger-${(index % 6) + 1}`}
                        >
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
