async function cargarPerfil() {

  const token = localStorage.getItem('token');

  if (!token) {

    document.getElementById('estado-cargando').style.display = 'none';
    document.getElementById('estado-sin-sesion').style.display = 'block';

    return;
  }

  try {

    // 1. Llama a GET /api/auth/perfil enviando el token en el header
    const respuesta = await fetch('http://localhost:3000/api/auth/perfil', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    // 2. Convierte la respuesta a JSON
    const usuario = await respuesta.json();

    if (!respuesta.ok) throw new Error(usuario.error);

    document.getElementById('estado-cargando').style.display = 'none';
    document.getElementById('perfil-datos').style.display = 'block';

    document.getElementById('perfil-avatar').textContent =
      usuario.nombre.charAt(0).toUpperCase();

    document.getElementById('perfil-nombre').textContent =
      usuario.nombre;

    document.getElementById('perfil-rol').textContent =
      usuario.rol === 'admin'
        ? '⭐ Administrador'
        : '🛍️ Cliente';

    // 3. Email
    document.getElementById('perfil-email').textContent =
      usuario.email;

    // 4. Departamento
    document.getElementById('perfil-departamento').textContent =
      usuario.departamento || 'No registrado';

    // 5. Municipio
    document.getElementById('perfil-municipio').textContent =
      usuario.municipio || 'No registrado';

  } catch (err) {

    console.error('Error al cargar perfil:', err);

    document.getElementById('estado-cargando').style.display = 'none';
    document.getElementById('estado-error').style.display = 'block';
  }
}

cargarPerfil();