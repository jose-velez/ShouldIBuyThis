const express = require('express');
const router = express.Router();
const paycheck = require('../models/paycheck');
const auth  = require('../middleware/auth');

// Create paycheck for the user.
router.post('/paycheck', auth, async (req, res) => {
    const paycheck = new Paycheck({
        ...req.body,
        user: req.user._id
    })
    try{
        await paycheck.save();
        res.status(201).send(paycheck);
    }catch (e){
        res.status(400).send('Woops! Check your details: ' + e);
    }
});

// Get the paycheck for the user
router.get('/paycheck', auth, async(req, res) => {

})