import { generateToken } from "../utils/token.js";
export const registerRecruiter = async (req, res, next) => {
try {

res.status(201).json({
success: true,
message: "Recruiter registered successfully"
});

} catch (error) {
next(error);
}
};

export const loginUser = async (req, res) => {

const user = { id: 1, email: "saintdavid4400@g
    mail.com" };

const token = generateToken(user);

res.json({
message: "Login successful",
token: token
});

};