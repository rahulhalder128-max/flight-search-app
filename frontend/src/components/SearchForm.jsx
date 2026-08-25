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
  const [isLoading, setIsLoading] = useState(false)

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
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    onSearch(formData)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          <span className="text-primary-600">CheapFlight</span> Finder
        </h2>
        <p className="text-neutral-600 text-base">
          Find the cheapest flights worldwide
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-2xl p-8 shadow-xl max-w-md">
        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-neutral-700 mb-1">
                From
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                placeholder="e.g., NYC, LON, DXB"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                required
                aria-describedby="origin-error"
              />
              {errors.origin && (
                <p className="mt-1 text-sm text-red-600">{errors.origin}</p>
              )}
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-neutral-700 mb-1">
                To
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="e.g., NYC, LON, DXB"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                required
                aria-describedby="destination-error"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="departureDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            {formData.returnDate && (
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-neutral-700 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-neutral-700 mb-1">
                Passengers
              </label>
              <select
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
              </select>
            </div>

            <div>
              <label htmlFor="cabinClass" className="block text-sm font-medium text-neutral-700 mb-1">
                Cabin Class
              </label>
              <select
                id="cabinClass"
                name="cabinClass"
                value={formData.cabinClass}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="economy">Economy</option>
                <option value="premiumEconomy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-relative flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            Searching...
          ) : (
            'Find Cheapest Flights'
          )}
        </button>
      </form>
    </div>
  )
}

export default SearchForm