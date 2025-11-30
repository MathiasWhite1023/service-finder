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

            if (error) throw error;

            alert('Serviço cadastrado com sucesso!');
            setFormData({ title: '', category: '', description: '', price: '', tags: '' });
            onClose();
        } catch (error) {
            console.error('Error registering service:', error);
            alert(`Erro ao cadastrar: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="modal-glass rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl transform transition-all scale-100 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-center relative z-10">
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Novo Serviço</h3>
                        <p className="text-sm text-gray-400">Preencha os dados para divulgar</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white hover:bg-white/10 transition-all p-2 rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-8 pt-4 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar relative z-10">

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Nome</label>
                        <input
                            type="text"
                            className="glass-engraved w-full p-4 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-black/20 transition-all"
                            placeholder="Ex: Silva Encanamentos"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Categoria</label>
                        <div className="relative">
                            <select
                                className="glass-engraved w-full p-4 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-white/20 focus:bg-black/20 transition-all"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="" className="bg-gray-900 text-gray-500">Selecione...</option>
                                <option value="Manutenção" className="bg-gray-900">Manutenção</option>
                                <option value="Design" className="bg-gray-900">Design</option>
                                <option value="Tecnologia" className="bg-gray-900">Tecnologia</option>
                                <option value="Jardinagem" className="bg-gray-900">Jardinagem</option>
                                <option value="Ensino" className="bg-gray-900">Ensino</option>
                                <option value="Limpeza" className="bg-gray-900">Limpeza</option>
                                <option value="Outros" className="bg-gray-900">Outros</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">▼</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Preço</label>
                            <input
                                type="text"
                                className="glass-engraved w-full p-4 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-black/20 transition-all"
                                placeholder="R$ 0,00"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Tags</label>
                            <input
                                type="text"
                                className="glass-engraved w-full p-4 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-black/20 transition-all"
                                placeholder="Separar por vírgula"
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Descrição</label>
                        <textarea
                            className="glass-engraved w-full p-4 rounded-xl text-white placeholder-white/20 min-h-[100px] resize-none focus:outline-none focus:border-white/20 focus:bg-black/20 transition-all"
                            placeholder="Detalhes do serviço..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg mt-4"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Processando...' : 'Confirmar Cadastro'}
                    </button>
                </div>
            </div>
        </div>
    );
}
