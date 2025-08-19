const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Food", "Travel", "Shopping", "Rents", "Utilities", "Other"], // example types
    },
    description: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
      enum: ["Cash", "Debit Card", "UPI", "Net Banking","Credit Card"], // extend as needed
    },
    date: {
      type: Date,
      required: true,
    },
    username : String
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("expenseModel", expenseSchema);


