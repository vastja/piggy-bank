import { Component } from '@angular/core';
import { Category, CategoryService } from '../services/category.service';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  
  private _expensesService : ExpenseService;

  private _categoryService : CategoryService;

  public categories : Category[] = [];

  constructor(categoryService : CategoryService, expensesService : ExpenseService) {
    this._categoryService = categoryService;
    this._expensesService = expensesService;
    this._expensesService.dataChanged.subscribe(() => this.getCategories());
    this.getCategories();
  }

  public getCategories() : void {
    this._categoryService.getCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }
}
