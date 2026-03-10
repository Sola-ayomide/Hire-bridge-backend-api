import jwt from "jsonwebtoken";
import { jwtConfig } from "/config/jwt.js";

export const generateToken = (user) => {

    const token = jwt.sign(
{ id: user.id },
jwtConfig.secret,
{ expiresIn: jwtConfig.expiresIn }
);

return token;
};

