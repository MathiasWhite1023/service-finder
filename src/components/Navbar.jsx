import { Plus } from 'lucide-react';

export function Navbar({ onAddService }) {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-xl font-bold text-gray-900">
                    ServiceHub
                </h1>

                {/* Action */}
                <button
                    onClick={onAddService}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Adicionar Serviço
                </button>
            </div>
        </nav>
    );
}
