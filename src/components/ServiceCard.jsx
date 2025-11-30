import { Star, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function ServiceCard({ service }) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="card-premium spotlight-card group relative overflow-hidden cursor-pointer h-full flex flex-col"
        >
            {/* Image with Gradient Overlay */}
            <div className="aspect-video w-full overflow-hidden relative">
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                    {service.category}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20 shadow-lg">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-white">{service.rating}</span>
                    <span className="text-xs text-gray-300">({service.reviews})</span>
                </div>
            </div>

            {/* Content Panel with Glass Effect */}
            <div className="p-6 relative flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {service.tags.slice(0, 3).map(tag => (
                        <span
                            key={tag}
                            className="text-xs text-purple-200 bg-purple-500/10 border border-purple-400/20 px-3 py-1 rounded-full backdrop-blur-sm group-hover:border-purple-400/40 transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer with Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div className="text-lg font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {service.price}
                    </div>
                    <button className="flex items-center space-x-2 text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors group/btn">
                        <span>Ver mais</span>
                        <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Hover Glow Effect (Additional) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
            </div>
        </div>
    );
}
