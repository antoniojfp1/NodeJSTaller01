const cryptojs = require("crypto");
const config = require('./../../config');

const encrypt = (data) => {
    return cryptojs.AES.encrypt(data, config.secretKey).toString();
};
const decrypt = (data) => {
    const bytes  = cryptojs.AES.decrypt(data, config.secretKey);
    return bytes.toString(cryptojs.enc.Utf8);
};
module.exports = {encrypt, decrypt};