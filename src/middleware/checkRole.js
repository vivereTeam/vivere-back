module.exports = function(requiredRole) {
    return (req, res, next) => {
      if (req.userRole === requiredRole) {
        next();
      } else {
        return res.status(403).json({ error: 'Acesso proibido: Não Autorizado' });
      }
    };
  };