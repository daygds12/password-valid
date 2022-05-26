const express = require('express');
const cors =  require('cors');
const app = express();


const port = 5000;

app.use(express.json());
app.use(cors())
app.post('/login', (req, res)=>{
    const{email, senha} = req.body
    console.log('email' + email)
})

app.listen(port,()=>{
    console.log('rodando...')
})