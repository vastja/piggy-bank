import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ExpensesComponent } from './expense/expenses.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseService, TestExpenseService } from './services/expense.service';
import { AddExpenseComponent } from './expense/add-expense.componet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, ExpensesComponent, AddExpenseComponent],
    providers: [{provide: ExpenseService, useClass: TestExpenseService}]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Piggy Bank'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Piggy Bank');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByTagName('h1')[0].textContent).toContain('Piggy Bank');
  });
});
