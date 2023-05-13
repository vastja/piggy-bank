import { Injectable } from "@angular/core";

export interface Expense {
    tag : string,
    amount : number
}

@Injectable()
export class ExpenseService {

    private expenses : Expense[] = [
        {
            tag: 'Food',
            amount: 120
        },
        {
            tag: 'Travel',
            amount: 60
        }

    ]

    public getExpenses() {
        return this.expenses;
    }

}