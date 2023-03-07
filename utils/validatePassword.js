const bcrypt = require("bcrypt")

const verifyPassword = async (password, hash) => {
    if (password && hash) {
        const compareResult = await bcrypt.compare(password, hash);
        return compareResult
    }
}

module.exports = verifyPassword