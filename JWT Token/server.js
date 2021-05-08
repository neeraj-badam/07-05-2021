var express = require("express")

var app = new express()
var jwt = require("jsonwebtoken")

var secret = "nope"
var students = [{id:1,name:"Neeraj"},{id:2,name:"Saketh"}]

app.get("/",(req,res)=>{
    res.send("This is Home page")
})

app.get("/students/:id",verifyToken,(req,res)=>{
    id = req.params.id
    let obj = ""
    for(let s of students)
    {
        if (s.id == id){
            obj = s
            break
        }
    }
    if(obj === "")
        res.send("Student not found")
    else
        res.send(obj)
})

app.get("/students",verifyToken,(req,res)=>{
    res.send(students)
})

app.post("/login",(req,res)=>{
    const user = 
    {
        username : "Neeraj",
        password : "bneeraj27"
    }
    jwt.sign({user : user} , secret ,(err,token)=>{
        res.send({token : token});
    })
})

function verifyToken(req,res,next) {
    // var bool = false
    // if(bool)
    //     next()
    // else
    //     res.sendStatus(403)
    let token = req.headers['authorization'] // Express headers are auto connected
    try{
    token = token.split(" ")[1]
    if(token)
    {
        jwt.verify(token,secret,(err,decoded)=>{
            if(err)
                return res.json({success : false,
                    message : "Unauthorized Access"
                })
            else
                {
                    req.decoded = decoded;
                    next()
                }
        })
    }
    }
    catch(err)
    {
        res.send("Please provide a bearer token")
    }

}

app.listen(8000,()=>{
    console.log("server started successfully")
})