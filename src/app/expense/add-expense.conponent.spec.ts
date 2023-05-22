import { TestBed } from "@angular/core/testing";
import { ExpenseService, TestExpenseService } from "../services/expense.service";
import { AddExpenseComponent } from "./add-expense.componet";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('Add expense component', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [AddExpenseComponent],
        providers: [{provide: ExpenseService, useClass: TestExpenseService}]
    }));
    
    it('Should create component', () => {
        const fixture = TestBed.createComponent(AddExpenseComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Should contain form', () => {
        const fixture = TestBed.createComponent(AddExpenseComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.getElementsByTagName('form')).toBeDefined();
        expect(compiled.getElementsByTagName('input')[0].id).toBe('tag');
        expect(compiled.getElementsByTagName('input')[1].id).toBe('amount');
    });
});