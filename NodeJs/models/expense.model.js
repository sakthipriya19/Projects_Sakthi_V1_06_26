import { model, Schema } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date :{
    type: String,
    required: true,
  }

});
const expense = model("Expense", schema);

export default expense;
