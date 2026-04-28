import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('salon_admin_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <main className="min-h-screen bg-navy px-4 py-8 text-sand sm:px-6 lg:px-10">
      <div className="mx-auto max-w-md rounded-[32px] border border-white/10 bg-[#0c1220]/95 p-8 shadow-glow">
        <span className="text-xs uppercase tracking-[0.28em] text-gold">Admin access</span>
        <h1 className="mt-4 text-3xl font-semibold">Sign in to the salon admin panel</h1>
        <p className="mt-3 text-slate-400">Use the secure username and password from your .env file.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="mb-2 inline-block text-slate-300">Username</span>
            <input
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
              placeholder="admin"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-2 inline-block text-slate-300">Password</span>
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sand"
              placeholder="••••••••"
            />
          </label>

          {error && <div className="rounded-2xl bg-rose-900/50 px-4 py-3 text-sm text-rose-200">{error}</div>}

          <button className="inline-flex w-full items-center justify-center rounded-2xl bg-gold px-6 py-3 font-semibold text-charcoal transition hover:bg-[#c7972d]">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
