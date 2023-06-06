import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { inMemoryExpensesData } from "./expenses-data";

export interface Expense {
    id: number,
    tag : string,
    amount : number
}

export abstract class ExpenseService {

    public abstract dataChanged : Observable<void>;

    abstract getExpenses(ag : string | null) : Observable<Expense[]>;
    abstract addExpense(expense : Expense) : Observable<HttpResponse<Expense>>;
    abstract deleteExpense(id : number) : void;
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

    public getExpenses(tag : string | null) : Observable<Expense[]> {
        
        let filter = "";
        if (tag != null) {
            filter = `?tag=${tag}`;
        }

        return this._httpClient.get<Expense[]>(`http://localhost:65368/expenses${filter}`);
    }

    public override addExpense(expense: Expense): Observable<HttpResponse<Expense>> {
        const request = this._httpClient.post<HttpResponse<Expense>>('http://localhost:65368/expenses', expense);
        request.subscribe({ complete: () => this._dataChanged.next()});
        return request;
    }

    public override deleteExpense(id: number): void {
        this._httpClient.delete(`http://localhost:65368/expenses/${id}`)
        .subscribe({ complete: () => this._dataChanged.next()});
        
    }
}

@Injectable()
export class InMemoryExpenseService extends ExpenseService {

    private _dataChanged = new Subject<void>();
    
    public dataChanged : Observable<void>; 

    public data : Expense[];

    constructor() {
        super();
        this.dataChanged = this._dataChanged.asObservable();
        this.data = inMemoryExpensesData;
    }

    public getExpenses(tag : string | null) : Observable<Expense[]> {
        if (tag != null) {
            return of(this.data.filter(e => e.tag == tag));
        }
        return of(this.data);
    }

    public override addExpense(expense: Expense): Observable<HttpResponse<Expense>> {
        this.data.push(expense);
        this._dataChanged.next();
        return of(new HttpResponse<Expense>({body: expense}))
    }

    public override deleteExpense(id: number): void {
        this.data.filter((expense) => expense.id != id);
        this._dataChanged.next();
    }
}