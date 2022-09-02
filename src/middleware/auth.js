const jwt = require('jsonwebtoken')

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key" || "X-Api-Key"]
        if (!token) {
            return res.status(401).send({ status: false, message: "please send the token" })
        }

        let decodedToken = jwt.verify(token, "wasif-IGT", function (error, token) {
            if (error) {
                return undefined
            } else {
                return token
            }
        })
        
        if (decodedToken == undefined) {
            return res.status(401).send({ status: false, message: "invalid token" })
        }
        
        req.userId =decodedToken.userId
        next()

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    authentication
}