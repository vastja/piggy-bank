import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { parseCSVLine, CSVParseError } from "./simple-csv-parser";
import { Database } from "./database";
import type { Expense } from "./database";
import assert from "assert";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Error: Folder path is required");
  console.error("Usage: bun run index.ts <folder-path>");
  process.exit(1);
}

const folderPath = args[0];
assert(folderPath, "Folder path must be provided");

if (!existsSync(folderPath)) {
  console.error(`Error: Folder '${folderPath}' does not exist`);
  process.exit(1);
}

const allRecords = parseExpenses(folderPath);

const db = new Database();
db.insertExpenses(allRecords);
db.close();

function parseExpenses(folderPath: string): Expense[] {
  const expenses: Expense[] = [];
  const filePattern = /^(0[1-9]|1[0-2])_\d{4}\.csv$/;
  const files = readdirSync(folderPath);
  const csvFiles = files.filter(file => filePattern.test(file));


  csvFiles.forEach(file => {
    console.log(`Parsing '${file}' expenses file`);
    const filePath = join(folderPath, file);
    const content = readFileSync(filePath, "utf-8");
    const lines = content.trim().split(/\r?\n/);

    // Skip title row and header row
    const dataLines = lines.slice(2);

    dataLines.forEach((line, lineIndex) => {
      if (!line.trim()) return;

      try {
        const columns = parseCSVLine(line);

        const timestamp = columns[0]?.trim();
        const category = columns[1]?.trim();
        const amount = columns[3]?.trim().replace(",", ".");

        if (timestamp && category && amount) {
          expenses.push({
            timestamp,
            amount,
            category
          });
        }
      } catch (error) {
        if (error instanceof CSVParseError) {
          console.error(`Error parsing ${file} line ${lineIndex + 3}: ${error.message}`);
        } else {
          throw error;
        }
      }
    });
  });

  return expenses;
}