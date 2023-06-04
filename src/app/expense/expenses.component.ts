import { Component } from '@angular/core';
import { ExpenseService, Expense } from '../services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {

  private expensesService : ExpenseService;

  public expenses : Expense[] = [];

  constructor(expensesService : ExpenseService) {
    this.expensesService = expensesService;
    this.expensesService.dataChanged.subscribe(() => this.getExpenses());
    this.getExpenses();

  }

  public getExpenses() : void {
    this.expensesService.getExpenses()
    .subscribe(expenses => {
      this.expenses = expenses;
    });
  }

}