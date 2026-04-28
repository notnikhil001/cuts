import { useState } from 'react';

export default function BookingForm({ services, stylists, onSubmit }) {
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    service_id: '',
    stylist_id: '',
    appointment_date: '',
    appointment_time: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(form);
      setStatus({ type: 'success', message: 'Booking sent. Admin dashboard will update.' });
      setForm({
        customer_name: '',
        customer_phone: '',
        service_id: '',
        stylist_id: '',
        appointment_date: '',
        appointment_time: '',
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Could not book appointment.' });
    }
  };

  return (
    <form className="card space-y-5" onSubmit={handleSubmit}>
      <div>
        <p className="text-gold font-semibold uppercase tracking-[0.24em]">Book your cut</p>
        <h2 className="mt-3 text-3xl font-semibold">Reserve a fresh look today</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span>Name</span>
          <input
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
            placeholder="Arjun"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span>Phone</span>
          <input
            name="customer_phone"
            value={form.customer_phone}
            onChange={handleChange}
            required
            pattern="\d{10}"
            className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
            placeholder="9876543210"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span>Service</span>
          <select
            name="service_id"
            value={form.service_id}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          >
            <option value="">Select service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name} - ₹{service.price}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2 text-sm">
          <span>Stylist</span>
          <select
            name="stylist_id"
            value={form.stylist_id}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          >
            <option value="">Choose stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist._id} value={stylist._id}>
                {stylist.name} ({stylist.specialization})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span>Date</span>
          <input
            type="date"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span>Time</span>
          <input
            type="time"
            name="appointment_time"
            value={form.appointment_time}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
          />
        </label>
      </div>

      {status && (
        <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === 'success' ? 'bg-emerald-900/50 text-emerald-200' : 'bg-rose-900/50 text-rose-200'}`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-gold px-6 py-3 font-semibold text-charcoal transition hover:bg-[#c7972d]"
      >
        Send Booking
      </button>
    </form>
  );
}
