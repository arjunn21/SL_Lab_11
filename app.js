const express = require("express");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    student_name: String,
    registration_number: String,
    marks: Number,
});
mongoose
    .connect(
        "mongodb+srv://Satya:EthanMongo@cluster0.qbo7l.mongodb.net/SL_Lab?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected");
    });
const Doc = mongoose.model("StudentDatabase", schema);
const app = express();
app.use(express.json());
let documents = new Array();
app.post("/", (req, res) => {
    documents = req.body.documents;
    res.send("Documents received!");
    for (let document of documents) {
        console.log(document);
        let newDocument = new Doc({
            student_name: document.name,
            registration_number: document.reg,
            marks: document.marks,
        });
        newDocument.save().then(() => {
            console.log("Document inserted into MongoDB");
        });
    }
});
app.listen(3000);
