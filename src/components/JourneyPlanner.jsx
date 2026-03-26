import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, MapPin, Users, DollarSign, Clock, ExternalLink } from 'lucide-react';

export default function JourneyPlanner({ country, loading }) {
  const [tripData, setTripData] = useState({
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    budget: '',
    tripType: 'round-trip'
  });

  const [showFlightSearch, setShowFlightSearch] = useState(false);

  const handleInputChange = (field, value) => {
    setTripData(prev => ({ ...prev, [field]: value }));
  };

  const handleFlightSearch = () => {
    // In a real app, this would integrate with flight APIs like Skyscanner, Amadeus, etc.
    const searchParams = new URLSearchParams({
      origin: tripData.departure,
      destination: country?.name || '',
      departDate: tripData.departureDate,
      returnDate: tripData.returnDate,
      passengers: tripData.passengers,
      tripType: tripData.tripType
    });
    
    // Open external flight booking site (example with Skyscanner)
    const skyscannerUrl = `https://www.skyscanner.com/transport/flights/${tripData.departure}/${country?.name}/${tripData.departureDate}/${tripData.returnDate}/?adults=${tripData.passengers}&children=0&adultsv2=${tripData.passengers}&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false`;
    window.open(skyscannerUrl, '_blank');
  };

  const handleCreateTrip = () => {
    // Save trip to user's trip planner
    const newTrip = {
      id: Date.now(),
      country: country?.name,
      city: country?.capital,
      startDate: tripData.departureDate,
      endDate: tripData.returnDate,
      budget: tripData.budget,
      passengers: tripData.passengers,
      notes: `Trip to ${country?.name}`,
      createdAt: new Date().toISOString()
    };

    // Add to localStorage (in real app, this would be saved to backend)
    const existingTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
    existingTrips.push(newTrip);
    localStorage.setItem('userTrips', JSON.stringify(existingTrips));

    alert('Trip added to your planner! Check your Dashboard to view all trips.');
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-slate-700 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Plane size={24} className="text-primary" />
          Plan Your Journey
        </h2>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setShowFlightSearch(!showFlightSearch)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plane size={16} />
            Book Flights
          </motion.button>
          <motion.button
            onClick={handleCreateTrip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Calendar size={16} />
            Add to Planner
          </motion.button>
        </div>
      </div>

      {/* Quick Trip Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm font-medium text-slate-300">Destination</span>
          </div>
          <p className="text-white font-semibold">{country?.name}</p>
          <p className="text-sm text-slate-400">{country?.capital}</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-medium text-slate-300">Best Time</span>
          </div>
          <p className="text-white font-semibold">Year Round</p>
          <p className="text-sm text-slate-400">Check weather forecast</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-primary" />
            <span className="text-sm font-medium text-slate-300">Currency</span>
          </div>
          <p className="text-white font-semibold">{country?.currencies || 'USD'}</p>
          <p className="text-sm text-slate-400">Check exchange rates</p>
        </div>
      </div>

      {/* Flight Search Form */}
      {showFlightSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-slate-800 rounded-lg p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Search Flights to {country?.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">From</label>
              <input
                type="text"
                value={tripData.departure}
                onChange={(e) => handleInputChange('departure', e.target.value)}
                placeholder="Enter departure city"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">To</label>
              <input
                type="text"
                value={country?.name || ''}
                disabled
                className="w-full px-3 py-2 bg-slate-600 border border-slate-600 rounded-lg text-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Departure Date</label>
              <input
                type="date"
                value={tripData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Return Date</label>
              <input
                type="date"
                value={tripData.returnDate}
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Passengers</label>
              <select
                value={tripData.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Budget (Optional)</label>
              <input
                type="text"
                value={tripData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="e.g., $2000"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <motion.button
            onClick={handleFlightSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!tripData.departure || !tripData.departureDate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ExternalLink size={18} />
            Search Flights on Skyscanner
          </motion.button>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 cursor-pointer"
          onClick={() => window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(country?.name || '')}`, '_blank')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Find Hotels</h4>
              <p className="text-sm text-blue-100">Browse accommodations</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 cursor-pointer"
          onClick={() => window.open(`https://www.viator.com/searchResults/all?text=${encodeURIComponent(country?.name || '')}`, '_blank')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Book Tours</h4>
              <p className="text-sm text-green-100">Discover experiences</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}