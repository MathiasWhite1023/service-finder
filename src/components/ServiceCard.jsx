import { Star } from 'lucide-react';

export function ServiceCard({ service }) {
    return (
        <div className="card overflow-hidden">
            {/* Image */}
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {service.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                </div>

                {/* Category */}
                <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md mb-3">
                    {service.category}
                </span>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {service.description}
                </p>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">A partir de</p>
                        <p className="text-xl font-bold text-gray-900">{service.price}</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                        Ver detalhes
                    </button>
                </div>
            </div>
        </div>
    );
}
