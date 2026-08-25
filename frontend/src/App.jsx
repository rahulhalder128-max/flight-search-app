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
      const response = await fetch('/api/v1/flights/search', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          origin: formData.origin,
          destination: formData.destination,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          passengers: formData.passengers,
          cabinClass: formData.cabinClass,
        },
      })

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wider">
          CheapFlight Finder
        </h1>
        <p className="text-gray-600 text-lg">
          Find the cheapest flights worldwide
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        {isLoading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for flights...</p>
          </div>
        )}

        {error && (
          <div className="p-8 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        <SearchForm onSearch={handleSearch} />

        {searchResults && searchResults.length > 0 && (
          <ResultsGrid flights={searchResults} />
        )}

        {!searchResults && !isLoading && (
          <div className="p-8 text-center text-gray-500">
            <p>Enter search criteria above to find flights</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App