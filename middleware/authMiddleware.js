const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=> {
    const authHeader = req.headers.authorization;
     console.log("AUTH HEADER:", authHeader);

    if(!authHeader){
        console.log("NO AUTH HEADER");
        return res.status(401).json({
            message : "Acssess denied. No token provided"
        });
    }
 if (!authHeader.startsWith("Bearer ")) {
        console.log("INVALID HEADER PREFIX");
        return res.status(401).json({
            message: "Invalid token format"
        });
    }

    const token = authHeader.substring(7).trim();
    console.log("TOKEN:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED USER:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports= authMiddleware;