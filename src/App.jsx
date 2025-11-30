import { useState } from 'react';
import { Hero } from './components/Hero';
import { SearchResults } from './components/SearchResults';
import { RegisterServiceModal } from './components/RegisterServiceModal';
import { Navbar } from './components/Navbar';
import { performSearch } from './lib/searchLogic';

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    if (query.toLowerCase() === 'cadastrar') {
      setIsModalOpen(true);
      return;
    }

    setSearchQuery(query);
    const searchResults = performSearch(query);
    setResults(searchResults);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className={`transition-all duration-700 ease-in-out ${hasSearched ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <Hero onSearch={handleSearch} />
        </div>

        {hasSearched && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white/90">
                Resultados para "{searchQuery}"
              </h2>
              <button
                onClick={() => setHasSearched(false)}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                ← Voltar para busca
              </button>
            </div>
            <SearchResults results={results} />
          </div>
        )}
      </main>

      <RegisterServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
