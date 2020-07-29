const validatePassword = (pass) => {
    const regexp = RegExp('^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$','g');
    return regexp.test(pass);
}

module.exports = validatePassword;