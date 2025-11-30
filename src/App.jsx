import { useState } from 'react';
import { Hero } from './components/Hero';
import { SearchResults } from './components/SearchResults';
import { RegisterServiceModal } from './components/RegisterServiceModal';
import { Navbar } from './components/Navbar';
import { searchServices } from './lib/searchLogic';

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    if (query.toLowerCase() === 'cadastrar') {
      setIsModalOpen(true);
      return;
    }

    setSearchQuery(query);
    const searchResults = await searchServices(query);
    setResults(searchResults);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddService={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {!hasSearched ? (
          <Hero onSearch={handleSearch} />
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Resultados para "{searchQuery}"
              </h2>
              <button
                onClick={() => setHasSearched(false)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Nova busca
              </button>
            </div>
            <SearchResults results={results} />
          </div>
        )}
      </main>

      {isModalOpen && (
        <RegisterServiceModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
