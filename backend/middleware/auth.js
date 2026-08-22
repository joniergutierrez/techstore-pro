// lIBRERIA OFICIAL PARA CREAR Y VERIFICAR TOKENS  JWT

const jwt = require('jsonwebtoken')

// MIDDLEWARE QUE VERIFICA EL TOKEN JWT EN EL HEADER AUTHORIZATION

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  //extraer el token después de "Bearer"

    if (!token) return res.status(401).json({ error: 'Acceso denegado - token requerido '});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // datos del usuario disponibles en la ruta
        next();                // continuar en la ruta protegida
    } catch (err) {
        res.status(403).json({ error: 'Token inaválido o expirado' });
    }
}

module.exports = verificarToken;