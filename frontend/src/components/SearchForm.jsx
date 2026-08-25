import { useState } from 'react'

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'economy',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    const errors = {}
    if (!formData.origin) errors.origin = 'Origin required'
    if (!formData.destination) errors.destination = 'Destination required'
    if (!formData.departureDate) errors.departureDate = 'Departure date required'
    setErrors(errors)
    return !Object.keys(errors).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSearch(formData)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-8 max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Flight Search
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            placeholder="e.g., NYC, LON, DXB"
            value={formData.origin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            required
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g., NYC, LON, DXB"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            required
          />
        </div>

        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            required
          />
        </div>

        {formData.returnDate && (
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
        )}

        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <select
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          >
            <option value={1}>1 Adult</option>
            <option value={2}>2 Adults</option>
            <option value={3}>3 Adults</option>
            <option value={4}>4 Adults</option>
          </select>
        </div>

        <div>
          <label htmlFor="cabinClass" className="block text-sm font-medium text-gray-700 mb-1">
            Cabin Class
          </label>
          <select
            id="cabinClass"
            name="cabinClass"
            value={formData.cabinClass}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          >
            <option value="economy">Economy</option>
            <option value="premiumEconomy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Find Cheapest Flights'}
        </button>
      </form>
    </div>
  )
}

export default SearchForm