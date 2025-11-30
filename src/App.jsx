import { useState } from 'react'
import { Hero } from './components/Hero'
import { SearchResults } from './components/SearchResults'
import { RegisterServiceModal } from './components/RegisterServiceModal'
import { searchServices } from './lib/searchLogic'

function App() {
  const [searchResults, setSearchResults] = useState(null)
  const [currentQuery, setCurrentQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = (query) => {
    setIsSearching(true)
    setCurrentQuery(query)

    // Simulate AI processing delay for effect
    setTimeout(() => {
      const results = searchServices(query)
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
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <RegisterServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <header className="py-6 border-b border-white/20 glass-panel sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSearchResults(null)}>
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ServiceHub
            </h1>
          </div>
          <nav>
            <button className="btn text-sm font-medium text-gray-600 hover:text-gray-900">Login</button>
            <button
              className="btn btn-primary ml-4 text-sm shadow-lg shadow-blue-500/20"
              onClick={() => setIsModalOpen(true)}
            >
              Cadastrar Serviço
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero onSearch={handleSearch} />

        {isSearching && (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-500 animate-pulse">Nossa IA está buscando os melhores profissionais...</p>
          </div>
        )}

        {searchResults && !isSearching && (
          <div id="results-section">
            <SearchResults results={searchResults} query={currentQuery} />
          </div>
        )}
      </main>

      <footer className="py-12 bg-white border-t border-gray-100 mt-auto">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ServiceHub</h3>
              <p className="text-gray-500 text-sm">Conectando você aos melhores profissionais da sua região com o poder da IA.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Como funciona</li>
                <li>Preços</li>
                <li>Segurança</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Sobre nós</li>
                <li>Carreiras</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Termos de uso</li>
                <li>Privacidade</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-100">
            &copy; 2024 ServiceHub. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
