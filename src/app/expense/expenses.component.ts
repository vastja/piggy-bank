import { Attribute, Component, Input } from '@angular/core';
import { ExpenseService, Expense } from '../services/expense.service';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {

  private _expensesService : ExpenseService;

  public expenses : Expense[] = [];

  private _tag  = "";

  @Input() public set tag(value : string)  {
    this._tag = value;
    this.getExpenses();
  }

  constructor(expensesService : ExpenseService) {
    this._expensesService = expensesService;
    this._expensesService.dataChanged.subscribe(() => this.getExpenses());
  }

  public getExpenses() : void {
    this._expensesService.getExpenses(this._tag)
    .subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  public deleteExpense(id: number) : void {
    this._expensesService.deleteExpense(id);
  }

}