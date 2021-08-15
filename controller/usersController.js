

module.exports.profile = function (request, response) {
    return response.render('profile', {
        title: "User Profile",
    });
};

// Render Sign Up page

module.exports.signUp = (request, response) => {
    return response.render('user_sign_up', {
        title: "User Sign Up",
    })

};
