import { Database as BunDatabase } from "bun:sqlite";
import { existsSync } from "fs";

export interface Expense {
  timestamp: string;
  amount: string;
  category: string;
}

export class Database {
  private db: BunDatabase;

  constructor(dbPath: string = "./piggy-bank.db") {
    const isNew = !existsSync(dbPath);
    this.db = new BunDatabase(dbPath);

    if (isNew) {
      this.initializeDatabase();
    }
  }

  private initializeDatabase(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        amount TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `);
    console.log("Database initialized with expenses table");
  }

  insertExpense(expense: Expense): void {
    const stmt = this.db.prepare(
      "INSERT INTO expenses (timestamp, amount, category) VALUES (?, ?, ?)"
    );
    stmt.run(expense.timestamp, expense.amount, expense.category);
  }

  insertExpenses(expenses: Expense[]): void {
    const stmt = this.db.prepare(
      "INSERT INTO expenses (timestamp, amount, category) VALUES (?, ?, ?)"
    );

    for (const expense of expenses) {
      stmt.run(expense.timestamp, expense.amount, expense.category);
    }

    console.log(`Inserted ${expenses.length} expense(s) into database`);
  }

  close(): void {
    this.db.close();
  }
}
