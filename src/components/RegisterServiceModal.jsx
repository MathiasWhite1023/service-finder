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
                        rating: 5.0,
                        reviews: 0,
                        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400'
                    }
                ]);

            if (error) throw error;

            alert('Serviço cadastrado com sucesso!');
            onClose();
        } catch (error) {
            console.error('Error registering service:', error);
            alert('Erro ao cadastrar. Verifique se configurou o Supabase corretamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-liquid rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white tracking-tight">Cadastrar Serviço</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nome do Profissional/Empresa</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            placeholder="Ex: Silva Encanamentos"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Categoria</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="" className="bg-black text-gray-400">Selecione...</option>
                            <option value="Manutenção" className="bg-black">Manutenção</option>
                            <option value="Design" className="bg-black">Design</option>
                            <option value="Tecnologia" className="bg-black">Tecnologia</option>
                            <option value="Jardinagem" className="bg-black">Jardinagem</option>
                            <option value="Ensino" className="bg-black">Ensino</option>
                            <option value="Limpeza" className="bg-black">Limpeza</option>
                            <option value="Outros" className="bg-black">Outros</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preço Estimado</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            placeholder="Ex: A partir de R$ 100"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            placeholder="Ex: encanador, pia, urgente"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Descrição</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[80px]"
                            placeholder="Descreva seus serviços..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        className="btn btn-primary w-full mt-2 py-3.5 text-base font-bold tracking-wide shadow-lg shadow-white/10"
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
