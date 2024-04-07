var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error', () => console.log("Error connecting to Database"))
db.once('open', () => console.log("connected to the Database"))


app.post("/sign_up", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    var dob = req.body.dob
    var phno = req.body.phno;
    var gender = req.body.gender;

    var data = {
        "name": name,
        "email": email,
        "password": password,
        "dob": dob,
        "phone": phno,
        "gender": gender
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record inserted Successfully")
    })
    return res.redirect('signup_success.html')

})

app.get("/", (req, res) => {
    res.set({
        "allow-access-allow-origin": "*"
    })
    return res.redirect('index.html')
}).listen(3000);


console.log("listining on port 3000")