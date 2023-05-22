import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent {

    addExpenseForm : FormGroup;

    private readonly _expenseService : ExpenseService;

    constructor(formBuilder: FormBuilder, expenseService: ExpenseService) {
        this.addExpenseForm = formBuilder.group({
            tag: '',
            amount: ''
        });
        this._expenseService = expenseService;
    }

    onSubmit(): void {
        this._expenseService.addExpense(this.addExpenseForm.value);
        this.addExpenseForm.reset();
    }
}