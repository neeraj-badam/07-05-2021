const { static } = require("express")
var express = require("express")
var path = require("path")

var app = new express()

app.use(express.urlencoded())

app.use("/static", express.static('./static/'));

app.use(express.static("public"))

app.get("/",(request,response)=>{
    response.sendFile(path.join(__dirname,"./index.html"));
})

app.post("/signup",(request,response)=>
{
    response.write("Username : "+request.body.username)
    response.write("\nRollNo : "+request.body.rolno)
    response.write("\nEmail : "+request.body.email)
    response.write("\nMobile : "+request.body.mobile)
    response.end();
})

app.get("/getUsers",(request,response)=>{
    let arr = new Array();
    dbRef.on("child_added",function(snap){
    arr.push({username:snap.val().username,rollno:snap.val().rolno,email1:snap.val().email,mobile:snap.val().mobile})
    })
    response.send(arr)

})

function isPresent(username)
{
    let a = new Array();
    dbRef.child(username).on("child_added",function(snap){
    // console.log(snap.val())
    var ele = snap.val()
    a.push(ele)
    })
    return a;
}

app.delete("/deleteStudent/:id",(request,response)=>{

    let uname = request.params.id;
    console.log(uname)
    let a = isPresent(uname);
    console.log("Array is : ")
    console.log(a)
    if(a.length == 0){
        console.log("entered")
        response.send({not:"User not present to delete"})
    }
    else
    {
        let dbref = dbRef.child(uname);
        console.log(dbref)
        dbref.remove();
        response.send({deleted:"User deleted"})
    }
    
})



app.put("/updateStudent/:id",(request,response)=>{
    
    console.log(request.body)
    
    let a = isPresent(request.params.id);
    console.log("Array is : ")
    console.log(a)
    if(a.length == 0){
        console.log("entered")
        response.send({not:"User not present to update"})
    }
    else
    {
    console.log(request.params)
    let username = request.params.id
    let email = request.body.email
    let mobile = request.body.mobile
    let rolno = request.body.rolno
    dbRef.child(username).update({
    username : username,
    email : email,
    mobile : mobile,
    rolno : rolno
    })
    response.send({updated:"User updated"})
    }
})

var server = app.listen(8000,function(){
    console.log("Server is started on port 8000.")
})




var firebase = require("firebase")

const firebaseConfig = {
    apiKey: "AIzaSyDuTtJD1OBDnGOQqKf-3bVSRl7NzfpjYD8",
    authDomain: "first-project-6d4ec.firebaseapp.com",
    databaseURL: "https://first-project-6d4ec-default-rtdb.firebaseio.com",
    projectId: "first-project-6d4ec",
    storageBucket: "first-project-6d4ec.appspot.com",
    messagingSenderId: "251786846783",
    appId: "1:251786846783:web:279d5ba8076f43e3d6ce8a",
    measurementId: "G-B6T2GE3NH5"
    };
    
    firebase.initializeApp(firebaseConfig)
    
    
    var dbRef = firebase.database().ref().child("students")
    dbRef.on("value",function(snap){
    // console.log(snap.val())
    console.log(snap.val())
    })
    


