import { useState } from 'react'
import { Hero } from './components/Hero'
import { SearchResults } from './components/SearchResults'
import { RegisterServiceModal } from './components/RegisterServiceModal'
import { searchServices, detectIntent, INTENT_REGISTER } from './lib/searchLogic'

function App() {
  const [searchResults, setSearchResults] = useState(null)
  const [currentQuery, setCurrentQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = (query) => {
    const intent = detectIntent(query);

    if (intent === INTENT_REGISTER) {
      setIsModalOpen(true);
      setSearchResults(null);
      return;
    }

    setIsSearching(true)
    setCurrentQuery(query)

    // Simulate AI processing delay for effect
    setTimeout(async () => {
      const results = await searchServices(query)
      setSearchResults(results)
      setIsSearching(false)

      // Smooth scroll to results
      const resultsElement = document.getElementById('results-section')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white selection:text-black">
      <RegisterServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Minimalist Header - Only Logo */}
      <header className="py-6 absolute top-0 w-full z-50">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSearchResults(null)}>
            <div className="h-6 w-6 bg-white rounded-full"></div>
            <h1 className="text-lg font-bold tracking-tighter">
              ServiceHub
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Hero onSearch={handleSearch} />

        {isSearching && (
          <div className="py-20 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-sm text-gray-500 animate-pulse">Processando...</p>
          </div>
        )}

        {searchResults && !isSearching && (
          <div id="results-section" className="bg-card min-h-[50vh] border-t border-border">
            <SearchResults results={searchResults} query={currentQuery} />
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-600">
        <p>&copy; 2024 ServiceHub. Minimalist & AI Powered.</p>
      </footer>
    </div>
  )
}

export default App
