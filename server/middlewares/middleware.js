export const isAuthenticated = (req, res, next) => {
    // if (req.session && req.session.user) {
    //     // User is authenticated, proceed to the next middleware/route
    //     return next();
    // }
    // // User is not authenticated, return an error
    // res.status(401).json({ status: 'error', message: 'Unauthorized' });
    return next();
};