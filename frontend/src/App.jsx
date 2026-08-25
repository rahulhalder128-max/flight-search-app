import { useState } from 'react'
import SearchForm from './components/SearchForm.jsx'
import ResultsGrid from './components/ResultsGrid.jsx'

function App() {
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/v1/flights/search?${
        new URLSearchParams({
          origin: formData.origin,
          destination: formData.destination,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          passengers: formData.passengers,
          cabinClass: formData.cabinClass,
        }).toString()}
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setSearchResults(data.data)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 p-4">
      <div class="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <h1 className="text-5xl font-bold text-neutral-900 tracking-wider">
            <span className="text-primary-600">CheapFlight</span> Finder
          </h1>
          <p className="text-neutral-600 text-lg">
            Find the cheapest flights worldwide
          </p>
        </header>

        {/* Search Form */}
        <main className="bg-neutral-50 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto mb-10">
          <SearchForm onSearch={handleSearch} />
        </main>

        {/* Results Section */}
        {isLoading && (
          <div className="p-8 text-center animate-spin rounded-2xl border-t border-primary-500 border-b border-primary-500 border-l border-primary-500 border-r border-primary-500">
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-xl mb-8">
            <p className="text-lg">{error}</p>
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <ResultsGrid flights={searchResults} />
        )}

        {!searchResults && !isLoading && error === null && (
          <div className="p-12 text-center text-neutral-500">
            <svg
              className="mx-auto mb-4 h-12 w-12 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <p>Enter search criteria above to find flights</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App