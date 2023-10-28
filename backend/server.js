const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");
const cookie = require('cookie-parser')
const session = require('express-session')
const sessionDB = require('connect-mongo')
const multer = require('multer')
const path = require("path")
const userAuth = require('./routes/authenticate');
const postRoutes = require('./routes/postRoute');
const commentRoutes = require('./routes/commentRoutes')



app.use(express.json())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(cookie())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    name: 'cookie',
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        expires:60 * 24
    },
    store: sessionDB.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "Sessions"
    })
}))

const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "Images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)

    }
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has been uploaded successfully")
})

app.use('/images', express.static(path.join(__dirname, "/images")))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use("/api/auth", userAuth)
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)
app.use('/api/comments', commentRoutes)

const port=process.env.PORT;

const server = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log("successfuly connected to server"))
}

server();