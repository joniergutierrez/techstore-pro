import { Link, useLocation } from 'react-router-dom'
import { useCarrito } from './context/CarritoContext.jsx'
import { useAuth } from './context/AuthContext.jsx'

function Navbar() {
  const ubicacion = useLocation()
  const { carrito, vaciarCarrito } = useCarrito()
  const { usuario, login, logout } = useAuth()

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b border-slate-200 rounded-xl shadow-sm sticky top-0 z-50">
      <Link to="/" className="text-xl font-extrabold text-verde hover:opacity-80 transition">
        TechStore Pro
      </Link>
      
      <ul className="hidden md:flex gap-6 text-sm font-semibold text-texto-dim">
        <li>
          <Link to="/" className={`transition ${ubicacion.pathname === '/' ? 'text-verde font-extrabold' : 'hover:text-verde'}`}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/productos" className={`transition ${ubicacion.pathname === '/productos' ? 'text-verde font-extrabold' : 'hover:text-verde'}`}>
            Productos
          </Link>
        </li>
      </ul>
      
      <div className="flex items-center gap-4">
        {/* PRÁCTICA: Badge del carrito + Botón para vaciar */}
        <div className="relative flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          {carrito.length > 0 && (
            <>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-sm">
                {carrito.length}
              </span>
              <button 
                onClick={vaciarCarrito} 
                className="text-xs text-red-500 hover:text-red-700 font-bold ml-4 transition"
                title="Vaciar carrito"
              >
                🗑️
              </button>
            </>
          )}
        </div>
        
        {/* GUÍA: Botón de Login/Logout */}
        <button 
          onClick={() => usuario ? logout() : login('Admin')} 
          className="bg-verde text-white py-2 px-5 rounded-lg font-bold text-sm hover:opacity-90 transition"
        >
          {usuario ? `Salir (${usuario.nombre})` : 'Ingresar'}
        </button>
      </div>
    </nav>
  )
}
export default Navbar
