enum State {
  FIELD_START,
  IN_FIELD,
  IN_QUOTED_FIELD,
  QUOTE_IN_QUOTED_FIELD,
}

export class CSVParseError extends Error {
  constructor(message: string, position: number) {
    super(`${message} at position ${position}`);
    this.name = "CSVParseError";
  }
}

export function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = "";
  let state = State.FIELD_START;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    switch (state) {
      case State.FIELD_START:
        if (char === '"') {
          state = State.IN_QUOTED_FIELD;
        } else if (char === ",") {
          fields.push(currentField);
          currentField = "";
        } else {
          currentField += char;
          state = State.IN_FIELD;
        }
        break;

      case State.IN_FIELD:
        if (char === '"') {
          throw new CSVParseError("Unexpected quote in unquoted field", i);
        } else if (char === ",") {
          fields.push(currentField);
          currentField = "";
          state = State.FIELD_START;
        } else {
          currentField += char;
        }
        break;

      case State.IN_QUOTED_FIELD:
        if (char === '"') {
          state = State.QUOTE_IN_QUOTED_FIELD;
        } else {
          currentField += char;
        }
        break;

      case State.QUOTE_IN_QUOTED_FIELD:
        if (char === '"') {
          // Escaped quote
          currentField += '"';
          state = State.IN_QUOTED_FIELD;
        } else if (char === ",") {
          fields.push(currentField);
          currentField = "";
          state = State.FIELD_START;
        } else {
          // Invalid character after closing quote
          throw new CSVParseError("Invalid character after closing quote", i);
        }
        break;
    }
  }

  if (state === State.IN_QUOTED_FIELD) {
    throw new CSVParseError("Unclosed quoted field", line.length);
  }

  fields.push(currentField);

  return fields;
}
