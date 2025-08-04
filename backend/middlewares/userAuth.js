import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {

    const {token} = req.headers;

    if (!token) {
        return res.status(401).json({ message: 'Token not found, Login again' });
    }

    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.userId;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({message: error.message,});
    }
}

export default userAuth;
