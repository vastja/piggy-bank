import { Component } from '@angular/core';
import { ExpenseService, Expense } from '../services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {

  private expenseService : ExpenseService;

  public expenses : Expense[] = [];

  constructor(expensesService : ExpenseService) {
    this.expenseService = expensesService;

    this.getExpenses();
  }

  public getExpenses() {
    return this.expenseService.getExpenses()
    .subscribe(expenses => {
      this.expenses = expenses;
    });
  }

}