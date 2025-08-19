const express = require("express");
const router = express.Router();

const expenseModel = require("../models/expenseModel");

// ---------------- Existing APIs ----------------

// Pie chart for payment mode
router.get("/summary/paymentMode", async (req, res) => {
  try {
    const data = await expenseModel.aggregate([
      { $group: { _id: "$paymentMode", total: { $sum: "$amount" } } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pie chart for type
router.get("/summary/type", async (req, res) => {
  try {
    const data = await expenseModel.aggregate([
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Line chart for amount spent by date
router.get("/summary/daily", async (req, res) => {
  try {
    const data = await expenseModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Table: total spent
router.get("/summary/total", async (req, res) => {
  try {
    const data = await expenseModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    res.json(data[0] || { total: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/summary/monthlyTrend", async (req, res) => {
  try {
    const data = await expenseModel.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          total: 1,
          _id: 0,
        },
      },
      { $sort: { year: 1, month: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Budget vs Actual (takes budget from param)
router.get("/summary/budget/:budget", async (req, res) => {
  try {
    const budget = Number(req.params.budget);
    const spentAgg = await expenseModel.aggregate([
      { $group: { _id: null, spent: { $sum: "$amount" } } },
    ]);

    const spent = spentAgg.length ? spentAgg[0].spent : 0;
    const remaining = budget - spent;
    const percentage = ((spent / budget) * 100).toFixed(2);

    res.json({ budget, spent, remaining, percentage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
