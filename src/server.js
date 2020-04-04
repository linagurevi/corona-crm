const express = require('express'); //Import express
const bodyParser = require('body-parser'); //Import bodyparser
const app = express(); //Create Express app on the app variable
const port = 3000; // Asign port

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let customers = [];

// Get all customers
app.get("/customer", (req, res) => {
    res.json(customers);
});

//Get a customer by id
app.get("/customer/:id", (req, res) => {
    const requestedCustomer = customers.find(customer => {
        return customer.id === parseInt(req.params);
    });

    if(!requestedCustomer) {
        res.sendStatus(404);
        return;
    }
    
    res.json(requestedCustomer);
});

// create new customer
app.put("/customer", (req, res) => {
    customers.push({ 
        id: customers.length + 1,
        fullName: req.body.fullName,
        email: req.body.email,
        birthdate: req.body.birthDate,
        notes: req.body.notes
     });
     res.status(201).json(customers);
});

//Delete a customer
app.delete("/customer/:id", (req, res) => {
    const requestedCustomer = customers.find(customer => {
        return customer.id === parseInt(req.params);
    });

    if(!requestedCustomer) {
        res.sendStatus(404);
        return;
    }

    const index = customers.indexOf(requestedCustomer);
    customers.splice(index, 1);
    res.json(requestedCustomer);
});

//Edit a customer
app.post("/customer/:id", (req, res) => {
    const requestedCustomer = customers.find(customer => {
        return customer.id === parseInt(req.params);
    });

    if(!requestedCustomer) {
        res.sendStatus(404);
        return;
    }

    const index = customers.indexOf(requestedCustomer);
    customers[index] = {
        fullName: req.body.fullName,
        email: req.body.email,
        birthdate: req.body.birthDate,
        notes: req.body.notes
    };

    res.json(customer[index]);
});

app.listen(port, () => {
	console.log('App is listening on port ' + port);
});


