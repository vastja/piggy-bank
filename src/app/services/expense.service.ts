import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

export interface Expense {
    id: number,
    tag : string,
    amount : number
}

export abstract class ExpenseService {
    abstract getExpenses() : Observable<Expense[]>;
}

@Injectable()
export class RemoteExpenseService extends ExpenseService {

    private _httpClient : HttpClient;

    constructor(httpClient: HttpClient) {
        super();
        this._httpClient = httpClient;
    }

    public getExpenses() : Observable<Expense[]> {
        return this._httpClient.get<Expense[]>('http://localhost:65368/expenses').pipe(
            catchError(
                (err, caught) => {console.log(err); return new Observable<Expense[]>();}
            )
        );
    }
}

@Injectable()
export class TestExpenseService implements ExpenseService {

    private readonly _expenses : Expense[] = [
        {
            id: 0,
            tag: 'td-food',
            amount: 125
        },
        {
            id: 1,
            tag: 'td-travel',
            amount: 100
        }
    ]

    public getExpenses() : Observable<Expense[]> {
        return of(this._expenses);
    }
}