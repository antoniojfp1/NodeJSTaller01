const validatePassword = (pass) => {
    const regexp = RegExp('^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$','g');
    console.log(pass);
    console.log(regexp.test(pass));
    return isValid = regexp.test(pass);
}

module.exports = validatePassword;