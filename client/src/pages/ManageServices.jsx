import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', duration: '', category: 'Hair' });

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/services');
      setServices(response.data);
    };
    load().catch(console.error);
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    const response = await api.post('/services', {
      name: form.name,
      price: Number(form.price),
      duration: Number(form.duration),
      category: form.category,
    });
    setServices((current) => [response.data, ...current]);
    setForm({ name: '', price: '', duration: '', category: 'Hair' });
  };

  const handleDelete = async (id) => {
    await api.delete(`/services/${id}`);
    setServices((current) => current.filter((service) => service._id !== id));
  };

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-2xl font-semibold">Add a service</h2>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleAdd}>
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Service name"
            required
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
          <input
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="Price"
            type="number"
            required
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
          <input
            value={form.duration}
            onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
            placeholder="Duration (minutes)"
            type="number"
            required
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          >
            <option value="Hair">Hair</option>
            <option value="Beard">Beard</option>
            <option value="Facial">Facial</option>
          </select>
          <button type="submit" className="rounded-2xl bg-gold px-6 py-3 font-semibold text-charcoal transition hover:bg-[#c7972d] sm:col-span-2">
            Save service
          </button>
        </form>
      </section>

      <section className="card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Service list</h2>
          <span className="text-sm uppercase tracking-[0.24em] text-slate-400">{services.length} services</span>
        </div>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service._id} className="flex flex-col gap-3 rounded-3xl border border-white/10 p-4 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-slate-400">{service.category} • {service.duration} mins</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">
                  ₹{service.price}
                </span>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="rounded-2xl border border-rose-500/40 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="text-slate-400">No services added yet.</p>}
        </div>
      </section>
    </div>
  );
}
