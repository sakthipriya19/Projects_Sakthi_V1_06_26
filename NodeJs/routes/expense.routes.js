import express from 'express';
import { expenseDelete, expenseIndex, expenseUpdate, expenseDetails, expenseCreate } from '../controllers/expense.controller.js';
 const router = express.Router();
 router.get('/',expenseIndex)
 router.get('/',expenseDetails)
 router.post('/', expenseCreate)
 router.put('/:id',expenseUpdate )
 router.delete('/:id',expenseDelete )
 export default router