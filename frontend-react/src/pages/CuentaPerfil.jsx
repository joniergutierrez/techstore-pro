import { useAuth } from "../context/AuthContext.jsx";

function CuentaPerfil() {
  const { usuario } = useAuth();
  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Cuenta</p>
        <h1 className="font-display font-bold text-5xl tracking-tighter mt-4">Mi perfil<span className="text-accent">.</span></h1>
      </section>
      <div className="border border-gray-300 rounded-card p-6 bg-paper">
        <p className="text-gray-700">Aquí podrás editar tu información personal en futuras sesiones.</p>
        <p className="font-semibold mt-4">Nombre: {usuario?.nombre}</p>
      </div>
    </div>
  );
}
export default CuentaPerfil;