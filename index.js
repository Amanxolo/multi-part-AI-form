const express = require("express");
const bodyParser = require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/category.html");
});

const {Configuration, OpenAIApi} = require("openai")
require('dotenv').config()

const configuration= new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.post("/", function(req,res){

    var nm = req.body.name;
    var ag = req.body.age;
    var ht = req.body.height;

    let keyword = `My name is ${nm}. My age is ${ag} and my height is ${ht}. I live in Delhi. Print this statement.`


    async function runCompletion() {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: keyword,
            max_tokens:1000,
    
        });
        
        res.send(completion.data.choices[0].text);
        
    }
    
    runCompletion();

});



app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})

