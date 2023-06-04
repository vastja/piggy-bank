import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";

export interface Expense {
    id: number,
    tag : string,
    amount : number
}

export abstract class ExpenseService {

    public abstract dataChanged : Observable<void>;

    abstract getExpenses() : Observable<Expense[]>;
    abstract addExpense(expense : Expense) : Observable<HttpResponse<Expense>>;
}

@Injectable()
export class RemoteExpenseService extends ExpenseService {

    private _httpClient : HttpClient;

    private _dataChanged = new Subject<void>();
    
    public dataChanged : Observable<void>; 

    constructor(httpClient: HttpClient) {
        super();
        this._httpClient = httpClient;
        this.dataChanged = this._dataChanged.asObservable();
    }

    public getExpenses() : Observable<Expense[]> {
        return this._httpClient.get<Expense[]>('http://localhost:65368/expenses');
    }

    public override addExpense(expense: Expense): Observable<HttpResponse<Expense>> {
        const request = this._httpClient.post<HttpResponse<Expense>>('http://localhost:65368/expenses', expense);
        request.subscribe({ complete: () => this._dataChanged.next()});
        return request;
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

    private _dataChanged = new Subject<void>();
    
    public dataChanged : Observable<void>; 

    constructor() {
        super();
        this.dataChanged = this._dataChanged.asObservable();
    }

    public getExpenses() : Observable<Expense[]> {
        return of(this._expenses);
    }

    public override addExpense(expense: Expense): Observable<HttpResponse<Expense>> {
        this._expenses.push(expense);
        this._dataChanged.next();
        return of(new HttpResponse<Expense>({body: expense}))
    }
}