import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getAdmin, getEmployee, getUser, clearSession } from '../auth';
import { useToast } from './toast-context';
import { Logo } from './ui';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const user = getUser();
  const employee = getEmployee();
  const admin = getAdmin();
  const signedIn = user || employee || admin;

  const logout = () => {
    clearSession();
    setMenuOpen(false);
    toast.info('Signed out', 'You have been signed out securely.');
    navigate('/login');
  };

  const links = [{ to: '/', label: 'Home' }];

  if (user) {
    links.push(
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/deposit', label: 'Deposit' },
      { to: '/transfer', label: 'Transfer' },
    );
  }
  if (employee) links.push({ to: '/delete-account', label: 'Manage Accounts' });
  if (admin) links.push({ to: '/add-employee', label: 'Add Employee' });

  const roleLabel = user ? 'Customer' : employee ? 'Employee' : admin ? 'Admin' : null;
  const roleName = user?.email || employee?.email || admin?.username || '';

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <Logo className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-slate-900">BankX</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {signedIn ? (
            <>
              <div className="flex items-center gap-2.5 border-r border-slate-200 pr-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 uppercase">
                  {roleName.charAt(0) || '?'}
                </span>
                <div className="leading-tight">
                  <p className="max-w-[11rem] truncate text-xs font-semibold text-slate-900">{roleName}</p>
                  <p className="text-[11px] text-slate-500">{roleLabel}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Sign in
              </NavLink>
              <Link
                to="/register"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition hover:bg-brand-700"
              >
                Open account
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}

            <div className="mt-2 border-t border-slate-200 pt-2">
              {signedIn ? (
                <>
                  <p className="px-3 py-1 text-xs text-slate-500">
                    Signed in as <span className="font-semibold text-slate-700">{roleName}</span> ({roleLabel})
                  </p>
                  <button
                    onClick={logout}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
                    Sign in
                  </NavLink>
                  <NavLink to="/register" className={linkClass} onClick={() => setMenuOpen(false)}>
                    Open account
                  </NavLink>
                  <NavLink to="/employee-login" className={linkClass} onClick={() => setMenuOpen(false)}>
                    Employee login
                  </NavLink>
                  <NavLink to="/admin-login" className={linkClass} onClick={() => setMenuOpen(false)}>
                    Admin login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
