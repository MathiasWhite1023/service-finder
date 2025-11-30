import { X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function RegisterServiceModal({ onClose }) {
    const [loading, setLoading] = useState(false);
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

            alert('Serviço cadastrado com sucesso!');
            onClose();
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="card w-full max-w-lg max-h-[90vh] overflow-auto">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <h2 className="text-xl font-bold text-gray-900">Cadastrar Serviço</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Título do Serviço
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="input"
                            placeholder="Ex: Manutenção de Ar Condicionado"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Categoria
                            </label>
                            <select
                                name="category"
                                className="input"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Preço
                            </label>
                            <input
                                type="text"
                                name="price"
                                required
                                className="input"
                                placeholder="R$ 150"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Descrição
                        </label>
                        <textarea
                            name="description"
                            required
                            rows="4"
                            className="input resize-none"
                            placeholder="Descreva o serviço..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            URL da Imagem (Opcional)
                        </label>
                        <input
                            type="url"
                            name="image_url"
                            className="input"
                            placeholder="https://..."
                            value={formData.image_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary"
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar Serviço'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
