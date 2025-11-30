import { Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
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
            {/* Image Section */}
            <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E23] via-transparent to-transparent opacity-90"></div>

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md bg-black/40 border border-white/10 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {service.rating}
                    </div>
                </div>

                <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md bg-white/10 border border-white/20">
                        {service.category}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col relative -mt-12">
                {/* Glass Info Card */}
                <div className="glass-thin rounded-2xl p-4 mb-4 backdrop-blur-xl bg-[#1E1E23]/80 border border-white/5 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {service.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                        {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {service.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-white/60 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats / Footer */}
                <div className="mt-auto flex items-end justify-between px-1">
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Orçamento</p>
                        <div className="text-xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {service.price}
                        </div>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-purple-500 group-hover:border-purple-400">
                        <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
