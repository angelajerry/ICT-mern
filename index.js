// const express=require('express');
// const app=express();
// const cors = require('cors');

// let user =[]
// app.use(cors())
// app.use(express.json())
// app.get('/users',function(req,res){
//     res.json(user)
// })
// let box =[{'name':'Aneena','email':'aneena@gmail.com','username':'ang'},{'name':'Atruyne','email':'ane@gmail.com','username':'anem'},{'name':'Aljugyuyfan','email':'alan@gmail.com','username':'ala'}]
// app.get('/and',function(req,res){
//     res.json(box)
// })
// let cartoon =[{'Cartoon':'Chotabheem','Charcters':'chotabheem,chutki,kalia,dholu,bholu,jaggu,raju','Channel':'POGO'},{'Cartoon':'Doraemon','Charcters':'Nobita,Shizuka,Suniyo,Giyaan','Channel':'Disney'},{'Cartoon':'Tom and Jerry','Charcters':'Tom,Jerry','Channel':'CN'},{'Cartoon':'Dorayude prayaanam','Charcters':'Dora,Bujji','Channel':'Kochu TV'}]
// app.get('/cartoons',function(req,res){
//     res.json(cartoon)
// })
// let project =[{'Title':'shoes','Description':'leather,black','Price':'$200','Stock':'20'},{'Title':'Heels','Description':'pointed,flat','Price':'$150','Stock':'100'},{'Title':'Earing','Description':'hanging,metal','Price':'$25','Stock':'150'},{'Title':' tops','Description':'organza,white','Price':'$350','Stock':'100'},]
// app.get('/products',function(req,res){
//     res.json(project)
// })


// app.listen(5000,function(){
//     console.log('server is ready,listening on port 5000 ')
// })
// app.post('/register',function(req,res){
//     console.log(req.body);
//     for(let i=0;i<user.length;i++){
//         if(user[i].email==req.body.email){
//             if(user[i].password==req.body.password){
//                 return res.json(user[i]);
//             }
//         }
//     }
//     return res.json("email not found")
// })
// app.post('/log',function(req,res){
//     console.log(req.body);
//     for(let i=0;i<user.length;i++){
//         if(user[i].email==req.body.email){
//             if(user[i].password==req.body.password){
//                 return res.json(user[i]);
//             }
//         }
//     }
//     return res.json("email not found")
// })
const express=require('express');
const app=express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

let user =[]
let db = '';



async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 
 


app.use(cors())
app.use(express.json())
app.get('/users',async function(req,res){
    let output = await db.collection('user').find({"email":req.body.email}).toArray();
    console.log(output);
    if(output.length==0){
        res.json('email not found')
    } else{
        if(output[0].password==req.body.password){
            return res.json(output[0])
        }
    }
    res.json(output)
})

app.post('/register',async function(req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
    user.push(req.body);
});



// app.post('/register',async function(req,res){
//     console.log(req.body);
//     for(let i=0;i<user.length;i++){
//         if(user[i].email==req.body.email){
//             if(user[i].password==req.body.password){
//                 return res.json(user[i]);
//             }
//         }
//     }
//     return res.json("email not found")
// })


app.listen(5000,function(){
    console.log('server is ready,listening on port 5000 ');
    mongoConnect();
})

app.post('/register',async function(req,res){
    console.log(req.body);
    for(let i=0;i<user.length;i++){
        if(user[i].email==req.body.email){
            if(user[i].password==req.body.password){
                return res.json(user[i]);
            }
        }
    }
    return res.json("email not found")
})



