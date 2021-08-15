

module.exports.profile = function (request, response) {
    return response.render('profile', {
        title: "User Profile",
    });
};

// Render Sign Up Form page

module.exports.signUp = (request, response) => {
    return response.render('user_sign_up', {
        title: "User Sign Up",
    })

};

// Render Sign In form Page

module.exports.signIn = (request, response) => {
    return response.render('user_sign_in', {
        title: "User Sign In",
    });
};