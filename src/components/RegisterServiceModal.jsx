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
            // Convert tags string to array
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

            const { error } = await supabase
                .from('services')
                .insert([
                    {
                        title: formData.title,
                        category: formData.category,
                        description: formData.description,
                        price: formData.price,
                        tags: tagsArray,
                        // Default values for MVP
                        rating: 5.0,
                        reviews: 0,
                        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400'
                    }
                ]);

            if (error) throw error;

            alert('Serviço cadastrado com sucesso!');
            onClose();
            // Optional: Trigger a refresh of the search results if needed
        } catch (error) {
            console.error('Error registering service:', error);
            alert('Erro ao cadastrar. Verifique se configurou o Supabase corretamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Cadastrar Serviço</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nome do Profissional/Empresa</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ex: Silva Encanamentos"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Categoria</label>
                        <select
                            className="input-field"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Selecione...</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Design">Design</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Jardinagem">Jardinagem</option>
                            <option value="Ensino">Ensino</option>
                            <option value="Limpeza">Limpeza</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Preço Estimado</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ex: A partir de R$ 100"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tags (separadas por vírgula)</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ex: encanador, pia, urgente"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            className="input-field min-h-[100px]"
                            placeholder="Descreva seus serviços..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        className="btn btn-primary w-full mt-4"
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
