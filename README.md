# Flight Search Application: "CheapFlight Finder"

## Overview
A global flight search application that helps travelers find the cheapest flight rates worldwide. The application aggregates flight data from multiple sources and provides users with the best pricing options for any route.

## Features
- **Global Coverage**: Search flights from any origin to any destination worldwide
- **Price Comparison**: Compare prices across multiple airlines and booking platforms
- **Date Flexibility**: Find cheapest dates across a range of travel dates
- **Price Alerts**: Notify users when prices drop for their desired routes
- **Flexible Search**: Search by city, airport, or region
- **Budget Filters**: Filter by maximum price, flight duration, number of stops
- **Multi-currency Support**: Display prices in user's preferred currency
- **User Accounts**: Save searches, favorite routes, and track price history

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with PostGIS for geo-search
- **API Integrations**: 
  - Skypicker Aviation API (primary flight search)
  - Amadeus API (secondary/backup)
  - Google Flights (if available)
- **Deployment**: Docker + Vercel/Netlify (frontend), Railway/Render (backend)

## Project Structure
```
flight-search-app/
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── search.js
│   │   │   ├── prices.js
│   │   │   └── alerts.js
│   │   ├── services/
│   │   │   ├── flightService.js
│   │   │   ├── priceComparison.js
│   │   │   └── alertService.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── SearchHistory.js
│   │   │   └── PriceAlert.js
│   │   └── utils/
│   │       ├── auth.js
│   │       └── apiHelper.js
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ResultsGrid.jsx
│   │   │   ├── PriceFilter.jsx
│   │   │   └── DatePicker.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│ │   │   │   └── SearchResults.jsx
│   │   ├── hooks/
│   │   │   ├── useFlightSearch.js
│ │   │   └── usePriceAlerts.js
│   │   ├── context/
│ │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│ │   ├── main.jsx
│   │   └── index.html
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── Dockerfile
├── docker-compose.yml
└── README.md