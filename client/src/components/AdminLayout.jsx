import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, CalendarDays, Scissors, Users } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('salon_admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate, token]);

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('salon_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-navy px-4 py-8 text-sand sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-6 rounded-[32px] border border-white/10 bg-[#0c1220]/95 p-6 shadow-glow sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Admin Console</p>
            <h1 className="mt-3 text-3xl font-semibold">Salon Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-sand transition hover:bg-white/15"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        <nav className="mb-8 grid gap-3 sm:grid-cols-3">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `card flex items-center gap-3 ${isActive ? 'border-gold text-gold' : 'border-white/10 text-sand'}`
            }
          >
            <CalendarDays size={20} />
            Today's schedule
          </NavLink>
          <NavLink
            to="services"
            className={({ isActive }) =>
              `card flex items-center gap-3 ${isActive ? 'border-gold text-gold' : 'border-white/10 text-sand'}`
            }
          >
            <Scissors size={20} />
            Manage services
          </NavLink>
          <NavLink
            to="staff"
            className={({ isActive }) =>
              `card flex items-center gap-3 ${isActive ? 'border-gold text-gold' : 'border-white/10 text-sand'}`
            }
          >
            <Users size={20} />
            Manage staff
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
