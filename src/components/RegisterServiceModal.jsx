import { X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function RegisterServiceModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        tags: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Validate inputs
            if (!formData.title || !formData.category || !formData.description) {
                throw new Error('Preencha os campos obrigatórios.');
            }

            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

            // Ensure price is a string but maybe add currency symbol if missing
            let formattedPrice = formData.price;
            if (!formattedPrice.startsWith('R$')) {
                formattedPrice = `R$ ${formattedPrice}`;
            }

            console.log('Attempting to register service:', { ...formData, tags: tagsArray });

            const { data, error } = await supabase
                .from('services')
                .insert([
                    {
                        title: formData.title,
                        category: formData.category,
                        description: formData.description,
                        price: formattedPrice,
                        tags: tagsArray,
                        rating: 5.0,
                        reviews: 0,
                        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400'
                    }
                ])
                .select();

            if (error) {
                console.error('Supabase Insert Error:', error);
                throw error;
            }

            console.log('Service registered successfully:', data);
            alert('Serviço cadastrado com sucesso!');
            setFormData({ title: '', category: '', description: '', price: '', tags: '' });
            onClose();
        } catch (error) {
            console.error('Error registering service:', error);
            alert(`Erro ao cadastrar: ${error.message || 'Verifique o console para mais detalhes.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl"
            onClick={onClose}
        >
            <div
                className="modal-glass rounded-3xl w-full max-w-lg overflow-hidden animate-fade-in-up shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-7 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Cadastrar Serviço</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white hover:bg-white/10 transition-all p-2 rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-7 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
                            Nome do Profissional/Empresa
                        </label>
                        <input
                            type="text"
                            className="input-field-glass w-full"
                            placeholder="Ex: Silva Encanamentos"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
                            Categoria
                        </label>
                        <select
                            className="input-field-glass w-full appearance-none cursor-pointer"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="" className="bg-gray-900">Selecione...</option>
                            <option value="Manutenção" className="bg-gray-900">Manutenção</option>
                            <option value="Design" className="bg-gray-900">Design</option>
                            <option value="Tecnologia" className="bg-gray-900">Tecnologia</option>
                            <option value="Jardinagem" className="bg-gray-900">Jardinagem</option>
                            <option value="Ensino" className="bg-gray-900">Ensino</option>
                            <option value="Limpeza" className="bg-gray-900">Limpeza</option>
                            <option value="Outros" className="bg-gray-900">Outros</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
                            Preço Estimado
                        </label>
                        <input
                            type="text"
                            className="input-field-glass w-full"
                            placeholder="Ex: A partir de R$ 100"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
                            Tags
                        </label>
                        <input
                            type="text"
                            className="input-field-glass w-full"
                            placeholder="Ex: encanador, pia, urgente"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
                            Descrição
                        </label>
                        <textarea
                            className="input-field-glass w-full min-h-[100px] resize-none"
                            placeholder="Descreva seus serviços..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="btn-premium w-full mt-6 py-4 text-base font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar Serviço'}
                    </button>
                </div>
            </div>
        </div>
    );
}
