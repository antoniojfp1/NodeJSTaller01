const date = () => {
    return new Date().toISOString().split("T")[0];
};
module.exports = date;