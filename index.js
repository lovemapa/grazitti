
import express from "express"
import bodyParser from 'body-parser'
const app = express()

app.use(bodyParser.json())



app.post('/makeTransaction', (req, res) => {

    //REQ BODY

    /*
        {
            "isDenominated": true,     true is we want denominated Value
            "amount": 1430,             amount
            "denominatedValue": 500     choice of cash
        }
    
        */

    let { isDenominated, amount, denominatedValue } = req.body
    if (!amount)
        return res.status(400).send({ error: "Please provide amount" })
    if (isDenominated) {
        if (!denominatedValue) {
            return res.status(400).send({ error: "Please provide choice of cash" })

        }
    }

    let NoOfNotes = 0
    let Obj = {
        10: 0,
        20: 0,
        50: 0,
        100: 0,
        200: 0,
        500: 0

    }
    console.log(req.body.amount);


    if (isDenominated) {
        NoOfNotes = NoOfNotes + Math.floor(amount / Number(denominatedValue));
        Obj[denominatedValue] = Math.floor(amount / Number(denominatedValue));
        amount = amount % Number(denominatedValue);

    }
    while (amount > 0) {

        if (amount >= 500) {

            NoOfNotes = NoOfNotes + Math.floor(amount / 500);
            Obj['500'] = Math.floor(amount / 500);
            amount = amount % 500;

        }
        else if (amount >= 200 && amount <= 499) {
            NoOfNotes = NoOfNotes + Math.floor(amount / 200);

            Obj['200'] = Math.floor(amount / 200);
            amount = amount % 200;
        }


        else if (amount >= 100 && amount <= 199) {
            NoOfNotes = NoOfNotes + Math.floor(amount / 100);
            Obj['100'] = Math.floor(amount / 100);
            amount = amount % 100;
        }

        else if (amount >= 50 && amount <= 99) {
            NoOfNotes = NoOfNotes + Math.floor(amount / 50);
            Obj['50'] = Math.floor(amount / 50);
            amount = amount % 50;
        }

        else if (amount >= 20 && amount <= 49) {
            NoOfNotes = NoOfNotes + Math.floor(amount / 20);
            Obj['20'] = Math.floor(amount / 20);
            amount = amount % 20;



        } else if (amount >= 10 && amount <= 19) {
            NoOfNotes = NoOfNotes + Math.floor(amount / 10);
            Obj['10'] = Math.floor(amount / 10);
            amount = amount % 10;
        }
    }


    for (let i in Obj) {
        if (Obj[i] === 0) {
            delete Obj[i]
        }
    }

    res.send(Obj)


})


let port = 8081
app.listen(port,
    () =>
        console.log(` app listening at http://localhost:${port}`))