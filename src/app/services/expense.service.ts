import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

export interface Expense {
    id: number,
    tag : string,
    amount : number
}

export abstract class ExpenseService {
    abstract getExpenses() : Observable<Expense[]>;
    abstract addExpense(expense : Expense) : Observable<HttpResponse<Expense>>;
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
                (err) => {console.error(err); return new Observable<Expense[]>();}
            )
        );
    }

    public override addExpense(expense: Expense): Observable<HttpResponse<Expense>> {
        return this._httpClient.post<HttpResponse<Expense>>('http://localhost:65368/add-expense', expense);
    }
}

@Injectable()
export class TestExpenseService extends ExpenseService {

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

    public override addExpense(expense: Expense): Observable<HttpResponse<Expense>> {
        return of(new HttpResponse<Expense>({body: expense}))
    }
}