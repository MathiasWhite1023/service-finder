import { Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export function ServiceCard({ service }) {
    return (
        <div className="card-modern group flex flex-col h-full relative overflow-hidden">

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-60"></div>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                    {service.category}
                </span>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">

                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {service.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{service.rating}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {service.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-5 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                        <span>Verificado</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Rápido</span>
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">A partir de</span>
                        <span className="text-lg font-bold text-white">
                            {service.price}
                        </span>
                    </div>

                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
