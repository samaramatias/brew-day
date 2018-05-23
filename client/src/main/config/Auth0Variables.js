'use strict';

var AUTH0_CLIENT_ID = 'w3hplz2BJojOeIv7orTMOFexv9AFhxi9';
var AUTH0_DOMAIN = 'brewday.eu.auth0.com';

var LOCK_CONFIG = {
    auth: {
        redirect: false
    },
    theme: {
        logo: '/img/icons/logo.png',
        primaryColor: "#3F51B5"
    },
    languageDictionary: {
        title: "Veggie-se",
        emailInputPlaceholder: "Your email",
        passwordInputPlaceholder: "Your password",
        welcome: "Welcome, %s!"
    },
    autoclose: true,
    allowShowPassword: true,
    additionalSignUpFields: [{
        name: 'full_name',
        placeholder: 'Your full name',
        icon: '/img/icons/account.png',

        validator: function (name) {
            return {
                valid: name.length > 0,
                hint: "Can't be blank"
            };
        }
    }]
};
