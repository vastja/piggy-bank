import { Component } from '@angular/core';
import { ExpenseService, Expense } from './services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {

  private expensesService : ExpenseService;

  constructor(expensesService: ExpenseService) {
    this.expensesService = expensesService;
  }

  public getExpenses() : Expense[] {
    return this.expensesService.getExpenses();
  }

}