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
    }, 800)
  }

  // If we have results, show them at the top. If not, center the search bar.
  const isCentered = !searchResults && !isSearching;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white selection:text-black overflow-hidden">
      <RegisterServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className={`flex-1 flex flex-col w-full transition-all duration-700 ${isCentered ? 'items-center justify-center min-h-[80vh]' : 'pt-12'}`}>
        <div className="w-full container relative z-10">
          <Hero onSearch={handleSearch} />

          {isSearching && (
            <div className="mt-12 text-center animate-fade-in">
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white/20 border-r-white align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          )}

          {searchResults && !isSearching && (
            <div className="mt-16 animate-fade-in pb-20">
              <SearchResults results={searchResults} query={currentQuery} />
            </div>
          )}
        </div>
      </main>

      {/* Subtle background noise/grain could go here if requested, keeping it clean for now */}
    </div>
  )
}

export default App
