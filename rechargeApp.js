const express = require("express")
const mongoose = require('mongoose')
const app = express()

app.use(express.urlencoded({
    extended: true
}))


//Use Database start
const {
    Schema,
    model
} = require('mongoose')

const dataSchema = new Schema({
    date: {
        type: String, required: true, trim: true
    },
    phone: {
        type: String, required: true, trim: true
    },
    amount: {
        type: Number, required: true, trim: true
    }
})
const chashinSchema = new Schema({
    date: {
        type: String, required: true, trim: true
    },
    phone: {
        type: String, required: true, trim: true
    },
    amount: {
        type: Number, required: true, trim: true
    },
})
const Data = model('Data', dataSchema)
const Cashin= model('Cashin',chashinSchema)

const url = 'mongodb+srv://MyDataBase1:mydatabase1@cluster0.yiali.mongodb.net/rechargeData21?retryWrites=true&w=majority'
mongoose.connect(url, {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true
})
//Use Database end


app.set('view engine', 'ejs')

app.get('/', (req, res)=> {
    Data.find().then(allData=> {
        //download(allData)
        let totalAmount = 0;
        for (let dat of allData) {
            totalAmount = totalAmount+dat.amount
        }
        res.render('rechargeApp/rechargeApp.ejs', {
            allData, totalAmount
        })

    })
})

app.post('/', (req, res)=> {
    let newData = new Data({
        date: req.body.dateInput,
        phone: req.body.phoneInput,
        amount: parseInt(req.body.amountInput)
    })
    newData.save().then(data=> {
        // res.send(`<h1>Done.<a href="/">Go Back</a></h1>`)

        /*let data={
            date:'2020-01-13',
            phone:'01745496839',
            amount: 10
        }*/
        res.render('rechargeApp/feedback.ejs', {
            data
        })
        console.log(data)
    }).catch((err)=> {
        console.log(`Here Error ${err}`)
    })
})

app.post('/cashin',(req,res)=>{
    let newCahin= new Cashin({
        date:req.body.cashInDate,
        phone:req.body.accountNumber,
        amount:req.body.cashInAmount
    })
    
    newCahin.save().then(data=>{
        res.render('rechargeApp/feedback.ejs', {
            data
        })
        
    }).catch(err=>{
        console.log(err)
    })
    
})

app.listen(2222, 0.0.0.0, (err)=> {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is running port 2222')
    }
})

/*
function download(data) {
    // body...
    const fs = require('fs')
    data = JSON.stringify(data);
    fs.writeFile('dataBase.json',
        data,
        (err)=> {
            if (err) {
                console.log(`Here Error :${err}`)
            } else {
                console.log('Done')
            }
        })
}
*/
