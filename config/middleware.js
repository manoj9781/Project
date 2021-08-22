module.exports.setFlash = (request, response, next) => {
  (response.locals.flash = {
    success: request.flash('success'),
    error: request.flash('error'),
  }),
    next();
};
