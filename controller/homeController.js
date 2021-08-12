module.exports.home = function (request, response) {
    // return response.end("Hello World");
    return response.render('home', {
        title: "Home",
    });
};