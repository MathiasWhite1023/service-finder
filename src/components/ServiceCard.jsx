import { Star, ArrowRight } from 'lucide-react';

export function ServiceCard({ service }) {
    return (
        <div className="card-minimal group relative overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-gray-900">
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white border border-white/10">
                    {service.category}
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-bold text-white">{service.rating}</span>
                        <span className="text-xs text-gray-400">({service.reviews})</span>
                    </div>
                    <div className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded">
                        {service.price}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                    {service.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>

                <button className="w-full flex items-center justify-center space-x-2 bg-white text-black py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                    <span>Ver Detalhes</span>
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
