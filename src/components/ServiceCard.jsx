import { Star, MapPin, ArrowRight } from 'lucide-react';

export function ServiceCard({ service }) {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm">
                    {service.category}
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                        <span className="text-xs text-gray-500">({service.reviews})</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {service.price}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>

                <button className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
                    <span>Ver Detalhes</span>
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
