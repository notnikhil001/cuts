import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function ManageStaff() {
  const [stylists, setStylists] = useState([]);
  const [form, setForm] = useState({ name: '', specialization: '', photo_url: '', availability_status: 'Available' });

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/stylists');
      setStylists(response.data);
    };
    load().catch(console.error);
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    const response = await api.post('/stylists', form);
    setStylists((current) => [response.data, ...current]);
    setForm({ name: '', specialization: '', photo_url: '', availability_status: 'Available' });
  };

  const handleDelete = async (id) => {
    await api.delete(`/stylists/${id}`);
    setStylists((current) => current.filter((stylist) => stylist._id !== id));
  };

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-2xl font-semibold">Add a stylist</h2>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleAdd}>
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Stylist name"
            required
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
          <input
            value={form.specialization}
            onChange={(e) => setForm((prev) => ({ ...prev, specialization: e.target.value }))}
            placeholder="Specialization"
            required
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
          <input
            value={form.photo_url}
            onChange={(e) => setForm((prev) => ({ ...prev, photo_url: e.target.value }))}
            placeholder="Photo URL"
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
          <select
            value={form.availability_status}
            onChange={(e) => setForm((prev) => ({ ...prev, availability_status: e.target.value }))}
            className="rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Offline">Offline</option>
          </select>
          <button type="submit" className="rounded-2xl bg-gold px-6 py-3 font-semibold text-charcoal transition hover:bg-[#c7972d] sm:col-span-2">
            Save stylist
          </button>
        </form>
      </section>

      <section className="card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Staff list</h2>
          <span className="text-sm uppercase tracking-[0.24em] text-slate-400">{stylists.length} stylists</span>
        </div>
        <div className="space-y-4">
          {stylists.map((stylist) => (
            <div key={stylist._id} className="flex flex-col gap-3 rounded-3xl border border-white/10 p-4 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-semibold">{stylist.name}</p>
                <p className="text-sm text-slate-400">{stylist.specialization}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">
                  {stylist.availability_status}
                </span>
                <button
                  onClick={() => handleDelete(stylist._id)}
                  className="rounded-2xl border border-rose-500/40 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {stylists.length === 0 && <p className="text-slate-400">No staff profiles added yet.</p>}
        </div>
      </section>
    </div>
  );
}
