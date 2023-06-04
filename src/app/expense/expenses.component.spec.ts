import { TestBed } from "@angular/core/testing";
import { ExpenseService, TestExpenseService } from "../services/expense.service";
import { ExpensesComponent } from "./expenses.component";

describe('Expenses component', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [ExpensesComponent],
        providers: [{provide: ExpenseService, useClass: TestExpenseService}]
    }));

    it('Should create component', () => {
        const fixture = TestBed.createComponent(ExpensesComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Should contain table', () => {
        const fixture = TestBed.createComponent(ExpensesComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.getElementsByTagName('table')).toBeDefined();
        expect(compiled.getElementsByTagName('tr').length).toBe(3);
        expect(compiled.getElementsByTagName('button').length).toBe(2);
    });
});