import { Component, Input, SimpleChanges } from '@angular/core';
import { ExpenseService } from '../service/expense-service';
import { Expense } from '../interface/expense';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-expense-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-summary.html',
  styleUrl: './expense-summary.css',
})
export class ExpenseSummary {
  @Input() getNewData: Expense | null = null;
  totalExpense: number = 0;
  userData: Expense[] = [];
  constructor(private expenseList: ExpenseService) {}
  ngOnInit() {
    this.loadExpenses();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['getNewData'] && this.getNewData) {
      const newData = this.getNewData;
      const index = this.userData.findIndex((exp) => exp.id === newData.id);
      if (index !== -1) {
        this.userData[index] = newData;
      }else{
        this.userData.push(newData);
      }
      this.totalExpense = this.userData.reduce((sum, exp) => sum + Number(exp.amount), 0);

    }
  }
  loadExpenses() {
    this.expenseList.getExpenseDeatils().subscribe((data: Expense[]) => {
      this.userData = data;
    });
    this.totalExpense = this.userData.reduce((sum, exp) => sum + Number(exp.amount), 0);
  }
  deleteItem(id: number) {
    this.expenseList.deleteExpenseDetails(id).subscribe(() => {
      this.userData = this.userData.filter((expense) => expense.id !== id);
       this.totalExpense = this.userData.reduce((sum, exp) => sum + Number(exp.amount), 0);
    });
  }
  onEdit(data: Expense) {
    this.expenseList.setEditExpense(data);
  }
}
