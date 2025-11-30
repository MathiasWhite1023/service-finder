
import { X, Upload, Check } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function RegisterServiceModal({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Manutenção',
        image_url: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('services')
                .insert([
                    {
                        title: formData.title,
                        description: formData.description,
                        price: formData.price,
                        category: formData.category,
                        image: formData.image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a8d2305?auto=format&fit=crop&q=80&w=1000',
                        rating: 5.0,
                        tags: [formData.category.toLowerCase(), 'novo']
                    }
                ]);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                onClose();
                window.location.reload(); // Simple refresh to show new service
            }, 2000);

        } catch (error) {
            console.error('Error registering service:', error);
            alert('Erro ao cadastrar serviço. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="card-modern p-8 flex flex-col items-center text-center max-w-sm w-full">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Sucesso!</h2>
                    <p className="text-gray-400">Seu serviço foi cadastrado e já está visível para todos.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="card-modern w-full max-w-lg relative flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Novo Serviço</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Título do Serviço</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="input-modern"
                                placeholder="Ex: Manutenção de Ar Condicionado"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Category & Price */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Categoria</label>
                                <select
                                    name="category"
                                    className="input-modern appearance-none"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option>Manutenção</option>
                                    <option>Limpeza</option>
                                    <option>Aulas</option>
                                    <option>Tecnologia</option>
                                    <option>Design</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Preço Base</label>
                                <input
                                    type="text"
                                    name="price"
                                    required
                                    className="input-modern"
                                    placeholder="Ex: R$ 150"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Descrição</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                className="input-modern resize-none"
                                placeholder="Descreva detalhadamente o que você oferece..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">URL da Imagem (Opcional)</label>
                            <div className="relative">
                                <Upload className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <input
                                    type="url"
                                    name="image_url"
                                    className="input-modern pl-10"
                                    placeholder="https://..."
                                    value={formData.image_url}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary mt-4 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>Publicar Serviço</span>
                                    <Check className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
