import expense from "../models/expense.model.js";
export const expenseIndex = async (req, res) => {
  try {
    const getexpense = await expense.find();
    res.json(getexpense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const expenseCreate = async (req, res) => {
  const newexpense = new expense({
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
  });
  try {
    const expense = await newexpense.save();
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const expenseDetails = async (req, res) => {
  try {
    const updateexpense = await expense.findById(req.params.id);
    if (updateexpense === null) {
      return res.status(404).json({ message: "No expense found" });
    } else {
      res.json(updateexpense);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const expenseUpdate = async (req, res) => {
  try {
    const updatedexpense = await expense.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date,
      },
      {
        new: true,
      },
    );
    res.status(200).json(updatedexpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const expenseDelete = async (req, res) => {
  const expenseId = req.params.id;

  try {
    await expense.deleteOne({ _id: expenseId });
    res.json({ message: "expense deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
