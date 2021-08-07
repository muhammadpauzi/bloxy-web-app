const { isValid } = require('mongoose').Types.ObjectId;

const isIDValid = (id) => {
    return isValid(id);
}

module.exports = isIDValid;