import { Component } from '@angular/core';
import { ExpenseService, Expense } from './services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {

  private expensesService : ExpenseService;

  public expenses : Expense[] = [];

  constructor(expensesService: ExpenseService) {
    this.expensesService = expensesService;

    this.getExpenses();
  }

  public getExpenses() {
    return this.expensesService.getExpenses()
    .subscribe(expenses => {
      this.expenses = expenses;
    });
  }

}