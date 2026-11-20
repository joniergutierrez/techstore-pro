import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function useApi(ruta) {
  const { usuario, logout } = useAuth();
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!usuario) {
      setCargando(false);
      return;
    }

    async function cargar() {
      try {
        const respuesta = await fetch("http://localhost:3000" + ruta, {
          headers: { Authorization: "Bearer " + usuario.token },
        });

        if (respuesta.status === 401 || respuesta.status === 403) {
          logout();
          navegar("/login", {
            state: {
              aviso: "Tu sesión terminó. Ingresa de nuevo para continuar",
              desde: ubicacion.pathname,
            },
          });
          return;
        }
        if (!respuesta.ok) throw new Error("respuesta no válida");

        setDatos(await respuesta.json());
      } catch {
        setError("No se pudieron cargar los datos. Revisa que el backend esté encendido.");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, [ruta, usuario, logout, navegar]);

  return { datos, cargando, error };
}

export default useApi;