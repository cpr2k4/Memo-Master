export const isAuthenticated = (req, res, next) => {
    // if (req.session.user) {
    //     return next();
    // }
    // res.status(401).json({ status: 'error', message: 'Unauthorized' });
    return next();
};