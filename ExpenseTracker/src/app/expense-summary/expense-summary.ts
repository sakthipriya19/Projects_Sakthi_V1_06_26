import { Component, Input, SimpleChanges } from '@angular/core';
import { ExpenseService } from '../service/expense-service';
import { Expense } from '../interface/expense';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './expense-summary.html',
  styleUrls: ['./expense-summary.css'],
})
export class ExpenseSummary {
  @Input() getNewData: Expense | null = null;
  totalExpense: number = 0;
  userData: Expense[] = [];
  fromDate: string = '';
  toDate: string = '';
  filteredExpenses: Expense[] = [];
  originalData: Expense[] = [];
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
      } else {
        this.userData.push(newData);
      }
      this.totalChange();
    }
  }
  loadExpenses() {
    this.expenseList.getExpenseDeatils().subscribe((data: Expense[]) => {
      this.userData = data;
    });
    this.totalChange();
  }
  deleteItem(id: number) {
    if(id){
      alert("The Expense Details will be deleted")
      this.expenseList.deleteExpenseDetails(id).subscribe(() => {
      this.userData = this.userData.filter((expense) => expense.id !== id);
      this.totalChange();
    });
    }
  }
  onEdit(data: Expense) {
    this.expenseList.setEditExpense(data);
  }
  applyDateFilter() {
    this.originalData = this.userData;
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      if (from >= to) {
        alert('Please provide correct date');
        this.clearFilter();
        return;
      } else {
        this.filteredExpenses = this.userData.filter((exp) => {
          const expDate = new Date(exp.date);
          return expDate >= from && expDate <= to;
        });
      }
      this.userData = this.filteredExpenses;
    } else {
      this.userData = this.originalData;
    }
    this.totalChange();
  }

  clearFilter() {
    this.fromDate = '';
    this.toDate = '';
    this.userData = this.originalData;
    this.totalChange();
  }
  totalChange() {
    this.totalExpense = this.userData.reduce((sum, exp) => sum + Number(exp.amount), 0);
    this.expenseList.expenses.set(this.userData);
  }
  addToCSV(){
    this.expenseList.exportToCsv(this.userData, 'expense-report.csv')
  }
}
