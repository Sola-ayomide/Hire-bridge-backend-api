const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

const users = [
{ id: 1, email: "saintdavid4400@gmail.com", password: "12345" }
]

router.post("/login", (req, res) => {

const { email, password } = req.body

const user = users.find(
u => u.email === email && u.password === password
)

if (!user) {
return res.status(401).json({ message: "Invalid credentials" })
}

const token = jwt.sign(
{ id: user.id, email: user.email },
process.env.JWT_SECRET,
{ expiresIn: "1h" }
)

res.json({ token })
})

module.exports = router