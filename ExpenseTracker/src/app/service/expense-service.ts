import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Expense } from '../interface/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private editExpenseSource = new BehaviorSubject<Expense | null>(null);
  editExpense$ = this.editExpenseSource.asObservable();
  url = 'http://localhost:3000/expense';

  constructor(private http: HttpClient) {}

  setEditExpense(expense: Expense) {
    this.editExpenseSource.next(expense);
  }

  getExpenseDeatils(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.url);
  }
  postExpenseDetails(data: any) {
    return this.http.post<Expense[]>(this.url, data);
  }
  deleteExpenseDetails(id: number): Observable<void> {
    const url = `http://localhost:3000/expense/${id}`;
    return this.http.delete<void>(url);
  }
 editExpenseDetails(user: Expense): Observable<Expense> {
  return this.http.put<Expense>(`${this.url}/${user.id}`, user);
}

}
