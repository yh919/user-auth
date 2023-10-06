import express from 'express'
import bcrypt from 'bcrypt'

const app = express()
const port = 3000

// In-memory
const users = [];

app.use(express.json());

app.post('/reg',async (req, res) => {
    try {
        const {email , password} = req.body
        // Find user
        const findUser = users.find((data) => email == data.email)
        if (findUser) {
            res.status(400).send("User already exist")
        }
        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10)

        //
        users.push({ email, password: hashPassword });
        res.status(201).send("Registered Successfully!")
    } catch (e) {
        res.status(500).send({message: e.message})
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const findUser = users.find((data) => email == data.email)
        if (!findUser) {
            res.status(400).send("Wrong Email or Password!");
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (passwordMatch) {
            res.status(200).send("Logged in successfuly!");
        } else {
            res.status(400).send("Wrong Email or Password!");
        }
    } catch (e) {
                res.status(500).send({message: e.message})
    }
})

app.listen(port, () => {
    console.log(`Server Started on 3000`)
})