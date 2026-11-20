import useApi from "../hooks/useApi.js";
import TarjetaDato from "../components/TarjetaDato.jsx";
import GraficoBarras from "../components/GraficoBarras.jsx";
import { PASOS } from "../components/TimelinePedido.jsx";

function numeroAPrecio(numero) {
  return "$" + Number(numero).toLocaleString("es-CO")
}

function CuentaResumen() {
  const { datos: pedidos, cargando, error } = useApi("/api/ordenes");

  if (cargando) return <p className="py-16 text-center text-gray-700">Cargando resumen…</p>;
  if (error) return <p className="py-16 text-center text-accent-dark">{error}</p>;

  const totalPedidos = pedidos ? pedidos.length : 0;
  const totalGastado = pedidos ? pedidos.reduce((suma, p) => suma + Number(p.total), 0) : 0;
  
  const datosGrafico = PASOS.map(paso => ({
    etiqueta: paso.texto,
    valor: pedidos ? pedidos.filter(p => p.estado === paso.estado).length : 0
  })).filter(d => d.valor > 0);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">Cuenta</p>
        <h1 className="font-display font-bold text-5xl tracking-tighter mt-4">Resumen<span className="text-accent">.</span></h1>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <TarjetaDato titulo="Total de pedidos" valor={totalPedidos} detalle="Compras realizadas" />
        <TarjetaDato titulo="Total gastado" valor={numeroAPrecio(totalGastado)} detalle="Suma de todas tus compras" />
      </div>

      {datosGrafico.length > 0 && <GraficoBarras titulo="Estado de tus pedidos" datos={datosGrafico} />}
      
      {totalPedidos === 0 && (
        <p className="text-center text-gray-700 py-10">Aún no has realizado ninguna compra.</p>
      )}
    </div>
  );
}
export default CuentaResumen;