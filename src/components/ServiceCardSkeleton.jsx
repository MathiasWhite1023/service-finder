export function ServiceCardSkeleton() {
    return (
        <div className="card-premium h-full border border-white/5 bg-white/5 overflow-hidden relative">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer z-10"></div>

            {/* Image Placeholder */}
            <div className="aspect-video w-full bg-white/5"></div>

            {/* Content Placeholder */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <div className="h-6 bg-white/10 rounded-md w-3/4"></div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded-md w-full"></div>
                    <div className="h-4 bg-white/5 rounded-md w-5/6"></div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                    <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="h-6 w-24 bg-white/10 rounded-md"></div>
                    <div className="h-6 w-20 bg-white/5 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
