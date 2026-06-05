import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { ExpenseSummary } from './expense-summary/expense-summary';
import { ExpenseChart } from "./expense-chart/expense-chart";
import { Expense } from './interface/expense';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ExpenseSummary, ExpenseChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  savedData:Expense | null = null;
  protected readonly title = signal('Insurance');
  sentToExpenseSummary(data:Expense){
    this.savedData = data;
    console.log(this.savedData)
  }
}
