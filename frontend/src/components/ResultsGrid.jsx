import { useState } from 'react'

const ResultsGrid = ({ flights }) => {
  const [sortBy, setSortBy] = useState('price')
  const [sortDirection, setSortDirection] = useState('asc')

  // Sort flights
  const sortedFlights = [...flights].sort((a, b) => {
    let comparison = 0
    if (sortBy === 'price') {
      comparison = a.price.amount - b.price.amount
    }
    if (sortDirection === 'desc') comparison *= -1
    return comparison
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">
            Search Results <span className="text-primary-600">{flights.length}</span>
          </h2>
          <p className="text-neutral-500 text-sm">
            {flights.length} flights found for your search criteria
          </p>
        </div>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          <option value="price">Cheapest First</option>
          <option value="duration">Shortest Duration</option>
        </select>

        <select
          onChange={(e) => setSortDirection(e.target.value === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-1.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFlights.map((flight) => (
          <article
            key={flight.id}
            className="group border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => window.open(flight.link, '_blank')}
          >
            <header className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {flight.airline} {flight.flightNo}
                </h3>
                <p className="text-neutral-500 text-sm mt-1">
                  {flight.origin.city} → {flight.destination.city}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">
                  {flight.price.amount} {flight.price.currency}
                </p>
                <p className="text-xs text-neutral-400">
                  {flight.stops} stop{'s'.concat(flight.stops > 1 ? 's' : '')}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500">
              <div>
                <span className="font-medium">Dep:</span> {flight.departure.at ? flight.departure.at.split('T')[0] : 'N/A'}
              </div>
              <div>
                <span className="font-medium">Arr:</span> {flight.arrival.at ? flight.arrival.at.split('T')[0] : 'N/A'}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <a
                href={flight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-600 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors"
              >
                <svg
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M17 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l-1.4-1.4a2 2 0 0 1 0-2.8Z" />
                  <circle cx="9" cy="9" r="1" fill="currentColor" />
                  <path d="M15 9l-6 6L9 15l6-6Z" />
                </svg>
                View Details
              </a>
            </div>
          </article>
        ))}
      </div>

      {sortedFlights.length === 0 && (
        <div className="p-8 text-center text-neutral-500">
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
          <p>No flights found. Try different search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ResultsGrid