const express = require("express");
const {
  createExpense,
  getExpenses,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", createExpense);
router.get("/:groupId", getExpenses);

module.exports = router;
