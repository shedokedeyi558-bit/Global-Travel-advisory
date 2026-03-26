import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit2, Trash2, Calendar, MapPin, DollarSign, FileText } from 'lucide-react';
import { addTrip, updateTrip, deleteTrip, getUserTrips } from '../utils/storage';

export default function TripPlanner() {
  const [trips, setTrips] = useState(getUserTrips());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tripName: '',
    country: '',
    city: '',
    startDate: '',
    endDate: '',
    budget: '',
    notes: '',
  });

  const handleOpenModal = (trip = null) => {
    if (trip) {
      setEditingId(trip.id);
      setFormData({
        tripName: trip.tripName,
        country: trip.country,
        city: trip.city,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
        notes: trip.notes,
      });
    } else {
      setEditingId(null);
      setFormData({
        tripName: '',
        country: '',
        city: '',
        startDate: '',
        endDate: '',
        budget: '',
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      updateTrip(editingId, formData);
    } else {
      addTrip(formData);
    }
    
    setTrips(getUserTrips());
    handleCloseModal();
  };

  const handleDelete = (tripId) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId);
      setTrips(getUserTrips());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Trips</h2>
        <motion.button
          onClick={() => handleOpenModal()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-yellow-500/90 transition-all"
        >
          <Plus size={18} />
          Create Trip
        </motion.button>
      </div>

      {/* Trips Grid */}
      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-xl bg-zinc-900 border border-yellow-500/20 text-center"
        >
          <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-300">No trips yet. Create your first trip!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl bg-zinc-900 border border-yellow-500/20 border border-yellow-500/20 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{trip.tripName}</h3>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleOpenModal(trip)}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} className="text-blue-500" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(trip.id)}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin size={16} className="text-yellow-400" />
                  <span>{trip.city}, {trip.country}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar size={16} className="text-yellow-400" />
                  <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                </div>
                {trip.budget && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign size={16} className="text-yellow-400" />
                    <span>${trip.budget}</span>
                  </div>
                )}
                {trip.notes && (
                  <div className="flex items-start gap-2 text-slate-300">
                    <FileText size={16} className="text-yellow-400 mt-0.5" />
                    <span className="line-clamp-2">{trip.notes}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/40"
              style={{ backdropFilter: 'blur(10px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                className="w-full max-w-md bg-zinc-900 border border-yellow-500/20 rounded-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-lg"
                >
                  <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingId ? 'Edit Trip' : 'Create New Trip'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Trip Name</label>
                    <input
                      type="text"
                      value={formData.tripName}
                      onChange={(e) => setFormData({ ...formData, tripName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="e.g., Summer Vacation"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="e.g., Japan"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="e.g., Tokyo"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Budget (Optional)</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="e.g., 5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Notes (Optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-yellow-500/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Add any notes about your trip..."
                      rows="3"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-yellow-500 text-black font-bold py-2.5 rounded-lg hover:bg-yellow-500/90 transition-all"
                  >
                    {editingId ? 'Update Trip' : 'Create Trip'}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
