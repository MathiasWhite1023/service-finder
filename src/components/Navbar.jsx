import { Search, Bell, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto glass-frosted rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <span className="font-bold text-white text-lg">S</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">ServiceHub</span>
                </div>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                    <a href="#" className="hover:text-white transition-colors">Início</a>
                    <a href="#" className="hover:text-white transition-colors">Explorar</a>
                    <a href="#" className="hover:text-white transition-colors">Categorias</a>
                    <a href="#" className="hover:text-white transition-colors">Sobre</a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black/20"></span>
                    </button>
                    <button className="hidden md:block px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-semibold text-sm backdrop-blur-md">
                        Conectar
                    </button>
                    <button className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
