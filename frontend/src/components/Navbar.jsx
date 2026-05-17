import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-danger opacity-80" />
        <span className="w-3 h-3 rounded-full bg-warn opacity-80" />
        <span className="w-3 h-3 rounded-full bg-accent opacity-80" />
        <span className="ml-3 font-mono text-sm font-bold text-text tracking-widest uppercase">
          silent<span className="text-accent">_error</span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-dim">python 3.x</span>
        <button
          onClick={handleLogout}
          className="font-mono text-xs text-muted hover:text-danger transition-colors px-3 py-1 border border-border rounded hover:border-danger"
        >
          logout
        </button>
      </div>
    </header>
  );
}
