import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const response = await api.get('/appointments/today');
      setAppointments(response.data);
    };
    loadAppointments().catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="card">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Today's bookings</p>
          <p className="mt-4 text-4xl font-semibold">{appointments.length}</p>
        </div>
        <div className="card">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Latest status</p>
          <p className="mt-4 text-slate-300">Keep the day flowing with clear appointment status updates.</p>
        </div>
        <div className="card">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Mobile ready</p>
          <p className="mt-4 text-slate-300">This dashboard is designed to work well on phones and tablets.</p>
        </div>
      </section>

      <section className="card">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Schedule</p>
            <h2 className="mt-2 text-2xl font-semibold">Today's schedule</h2>
          </div>
        </div>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-slate-400">No bookings for today yet.</p>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment._id} className="rounded-3xl border border-white/10 p-5 sm:flex sm:justify-between sm:gap-4">
                <div>
                  <p className="font-semibold">{appointment.customer_name} — ₹{appointment.service_id?.price}</p>
                  <p className="text-sm text-slate-400">{appointment.service_id?.name} with {appointment.stylist_id?.name}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:items-center">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">
                    {new Date(appointment.appointment_date).toLocaleDateString('en-IN')}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">
                    {appointment.appointment_time}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.28em] ${
                    appointment.status === 'confirmed' ? 'bg-emerald-900 text-emerald-200' : appointment.status === 'cancelled' ? 'bg-rose-900 text-rose-200' : 'bg-white/10 text-slate-200'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
