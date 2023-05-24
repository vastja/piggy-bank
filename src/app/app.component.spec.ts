import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ExpensesComponent } from './expense/expenses.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseService, TestExpenseService } from './services/expense.service';
import { AddExpenseComponent } from './expense/add-expense.componet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';

describe('App Component', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, ExpensesComponent, AddExpenseComponent, MenuComponent],
    providers: [{provide: ExpenseService, useClass: TestExpenseService}]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
