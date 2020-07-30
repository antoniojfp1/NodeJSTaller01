const validatePassword = (pass) => {
    const regexp = RegExp('^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\\W).*$');
    return regexp.test(pass);
}

module.exports = validatePassword;