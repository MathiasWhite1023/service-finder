import { ServiceCard } from './ServiceCard';

export function SearchResults({ results, query }) {
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="bg-white/5 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    Nenhum serviço encontrado para "{query}"
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                    Tente usar termos mais genéricos ou verifique a ortografia.
                </p>
            </div>
        );
    }

    return (
        <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">
                        Resultados para <span className="text-gray-400">"{query}"</span>
                    </h2>
                    <span className="text-sm text-gray-400 border border-white/10 px-3 py-1 rounded-full">
                        {results.length} serviços encontrados
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </div>
    );
}
