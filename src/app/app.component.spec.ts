import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ExpensesComponent } from './expense/expenses.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseService, InMemoryExpenseService } from './services/expense.service';
import { AddExpenseComponent } from './expense/add-expense.componet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { CategoryService, InMemoryCategoryService } from './services/category.service';
import { CategoryComponent } from './category/category.component';
import { SummaryComponent } from './summary/summary.component';

describe('App Component', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    declarations: [
      AppComponent,
      ExpensesComponent,
      AddExpenseComponent,
      MenuComponent,
      CategoryComponent,
      SummaryComponent
    ],
    providers: [
      {provide: ExpenseService, useClass: InMemoryExpenseService},
      {provide: CategoryService, useClass: InMemoryCategoryService}
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
