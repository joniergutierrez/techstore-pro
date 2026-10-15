function ProductCard(props) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100">
      {/* Imagen con altura fija para uniformidad */}
      <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={props.imagen} 
          alt={props.nombre}
          className="w-full h-64 object-cover"
        />
      </div>
      
      {/* Contenido */}
      <div className="flex flex-col flex-grow gap-2">
        {props.icono && <span className="text-2xl">{props.icono}</span>}
        
        <h3 className="font-bold text-lg text-gray-800 leading-tight">
          {props.nombre}
        </h3>
        
        <p className="text-texto-dim text-sm flex-grow line-clamp-2">
          {props.descripcion}
        </p>
        
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
          <p className="text-verde font-extrabold text-lg">
            {props.precio}
          </p>
          <p className="text-texto-dim text-xs font-medium">
            Stock: {props.stock || 0} und
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
