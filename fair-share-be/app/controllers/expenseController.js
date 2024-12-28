const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createExpense = async (req, res) => {
  const { description, amount, groupId, usersSplit } = req.body;
  const payerId = req.user.userId; // Assuming the user ID is in `req.user`

  try {
    const expense = await prisma.expense.create({
      data: {
        description,
        amount,
        payerId,
        groupId,
      },
    });

    // Split the expense among users
    for (let split of usersSplit) {
      await prisma.expenseSplit.create({
        data: {
          expenseId: expense.id,
          userId: split.userId,
          share: split.share,
        },
      });
    }

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Error creating expense" });
  }
};

exports.getExpenses = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const expenses = await prisma.expense.findMany({
      where: { groupId },
      include: {
        payer: true,
        expenseSplits: true,
      },
    });

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};
