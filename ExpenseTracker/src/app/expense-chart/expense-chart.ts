import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ExpenseService } from '../service/expense-service';
import { Expense } from '../interface/expense';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './expense-chart.html',
  styleUrls: ['./expense-chart.css'],
})
export class ExpenseChart {
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Food', 'Entertainment', 'HouseHold', 'Travel', 'Shopping', 'ChildCare', 'Health'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#E74C3C',

          '#3498DB',

          '#F1C40F',

          '#9B59B6 ',

          '#1ABC9C ',

          '#D35400 ',

          '#7F8C8D ',
        ],
        borderColor: '#fff', // optional white border
        borderWidth: 2,
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Expense Breakdown by Category' },
    },
  };
  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpenseDeatils().subscribe((data: Expense[]) => {
      const categoryTotals: { [key: string]: number } = {};
      data.forEach((exp) => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
      });

      this.pieChartData.labels = Object.keys(categoryTotals);
      this.pieChartData.datasets[0].data = Object.values(categoryTotals);
    });
  }
}
