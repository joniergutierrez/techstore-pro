// middleware: verifica que el usuario auntenticado tenga rol admin
function verificarAdmin(req, res, net) {
    if (!req.usuario) {
        return res.status(401).json({ error: 'sin autenticacion'});
    }
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'acceso denegafdo - se requiere rol admin' });
    }
    nex();
}

module.exports = verificarAdmin;