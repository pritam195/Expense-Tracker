const express = require('express');
const router = express.Router();

const expenseModel = require('../models/expenseModel');

router.post('/create', async (req, res) => {
    const { amount, type, description, paymentMode, date,username } = req.body;

    try {
        const createdExpense = await expenseModel.create({
            amount,
            type,
            description,
            paymentMode,
            date,
            username
        });
        console.log("Expense Created:", createdExpense);
        return res
          .status(201)
          .json({
            message: "Expense created successfully",
            expense: createdExpense,
          });

    } catch (error) {
        console.error("Expense error", error);
        return res.status(500).json({ error: "Error creating Expense" });
    }
})

router.get('/:username/fetch', async (req, res) => {
    const username = req.params.username;
    try {
        const expense = await expenseModel.find({username}).sort({ date: -1 });
        return res.status(200).json(expense);
    } catch (error) {
        console.error("Error fetching expenses: ", error);
        return res.status(500).json("Failed to fetch expense");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await expenseModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete expense" });
    }
})

module.exports = router;