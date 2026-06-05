import { Component, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../service/expense-service';
import { Expense } from '../interface/expense';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Output() expenseAdded = new EventEmitter<Expense>();
  today: string = new Date().toISOString().split('T')[0];
  btnNameChange: boolean = false;
  newExpense: Expense = {
    id: 0,
    title: '',
    amount: 0,
    category: '',
    date: new Date(),
  };
  constructor(private expenseList: ExpenseService) {}
  ngOnInint() {}
  ngAfterViewInit() {
    this.expenseList.editExpense$.subscribe((data: any) => {
      if (data) {
        this.newExpense = { ...data };
        this.btnNameChange = true;
      } else {
        this.newExpense = { id: 0, title: '', amount: 0, category: '', date: new Date() };
        this.btnNameChange = false;
      }
    });
  }
  ngOnChange() {
    this.expenseList.getExpenseDeatils().subscribe((data: Expense[]) => {
      console.log('displayed');
    });
  }
  addExpense() {
    if (!this.btnNameChange) {
      if (
        !this.newExpense.title ||
        this.newExpense.amount <= 0 ||
        !this.newExpense.category ||
        !this.newExpense.date
      ) {
        alert('Please fill all fields correctly before adding an expense.');
        return;
      }
      this.expenseList.postExpenseDetails(this.newExpense).subscribe((savedExpense: any) => {
        this.expenseAdded.emit(savedExpense);
        this.newExpense = { id: 0, title: '', amount: 0, category: '', date: new Date() };
      });
    } else {
      this.expenseList.editExpenseDetails(this.newExpense).subscribe((savedExpense: any) => {
        this.expenseAdded.emit(savedExpense);
        this.btnNameChange = false;
        this.clear()
      });
    }
  }
  clear() {
    this.newExpense = { id: 0, title: '', amount: 0, category: '', date: new Date() };
  }
}
