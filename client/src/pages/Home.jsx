import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import api from '../utils/api';
import BookingForm from '../components/BookingForm';

export default function Home() {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [serviceRes, stylistRes] = await Promise.all([api.get('/services'), api.get('/stylists')]);
      setServices(serviceRes.data);
      setStylists(stylistRes.data);
    };
    loadData().catch(console.error);
  }, []);

  const handleBooking = async (form) => {
    await api.post('/appointments', form);
  };

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-sand sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-gold">
              Local barber, urban style
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Modern salon booking built for Indian barbers.
            </h1>
            <p className="max-w-xl text-slate-300 sm:text-lg">
              Let customers book services instantly. Admins can view today’s appointments, manage staff, and keep services updated from one clean dashboard.
            </p>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-[#11203f] px-5 py-4 text-sm shadow-glow">
              <span>Currency</span>
              <strong>₹ Indian Rupee</strong>
            </div>
          </div>

          <div className="card">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gold">Walk-in ready</p>
                <h2 className="mt-2 text-2xl font-semibold">Quick booking form</h2>
              </div>
            </div>
            <BookingForm services={services} stylists={stylists} onSubmit={handleBooking} />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="card">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Services</p>
            <ul className="mt-6 space-y-4">
              {services.slice(0, 3).map((service) => (
                <li key={service._id} className="rounded-3xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-slate-400">{service.category}</p>
                    </div>
                    <span className="text-lg font-semibold">₹{service.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Top stylists</p>
            <ul className="mt-6 space-y-4">
              {stylists.slice(0, 3).map((stylist) => (
                <li key={stylist._id} className="rounded-3xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{stylist.name}</h3>
                      <p className="text-sm text-slate-400">{stylist.specialization}</p>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                      {stylist.availability_status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card flex flex-col justify-between p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Why choose this system</p>
              <h2 className="mt-3 text-2xl font-semibold">Clean admin controls</h2>
              <p className="mt-4 text-slate-300">
                Simple schedule view, service edits, and staff updates — all responsive for phone use.
              </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-gold">
              <ArrowRight size={18} /> Built for local salons
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
