exports.errorGlobal = (req, res, next) => {
    res.locals.error = req.session.error || null;
    req.session.error = null;
    next();
};
