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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Search Results {flights.length}
        </h2>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="price">Cheapest First</option>
          <option value="duration">Shortest Duration</option>
        </select>

        <select
          onChange={(e) => setSortDirection(e.target.value === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedFlights.map((flight) => (
          <div
            key={flight.id}
            className="group border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition">
                  {flight.airline} {flight.flightNo}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {flight.origin.city} → {flight.destination.city}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">
                  {flight.price.amount} {flight.price.currency}
                </p>
                <p className="text-xs text-gray-400">
                  {flight.stops} stop{'s'.concat(stops > 1 ? 's' : '')}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">
                Dep: {flight.departure.at.split('T')[0]}
              </p>
              <p className="text-xs text-gray-500">
                Arr: {flight.arrival.at.split('T')[0]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {sortedFlights.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No flights found. Try different search criteria.
        </p>
      )}
    </div>
  )
}

export default ResultsGrid