# Smart Lexical Analyzer with Intelligent Error Reporting

A beginner-friendly Python Tkinter project that performs lexical analysis in two modes:

- **Manual Mode**: character-by-character scanning
- **AI Mode**: regex-assisted scanning + intelligent keyword suggestions using Levenshtein Distance

## Folder Structure

```text
Smart-Lexical-Analyzer-with-Intelligent-Error-Report/
├── main.py
├── gui.py
├── lexer.py
├── ai_module.py
├── utils.py
└── README.md
```

## Features

- GUI with:
  - Large source code input area
  - `Analyze Code` button
  - Mode switch:
    - Manual Mode (character-by-character scanning)
    - AI Mode (regex + intelligent suggestions)
  - Token Output Panel
  - Error Report Panel
  - Symbol Table Panel
  - `Export Report` button (`.txt`)

- Lexer recognizes:
  - Keywords: `int`, `float`, `if`, `else`, `while`, `return`, `print`
  - Identifiers
  - Numbers (int/float)
  - Operators: `+`, `-`, `*`, `/`, `=`, `==`, `<`, `>`
  - Delimiters: `;`, `,`, `(`, `)`, `{`, `}`
  - Single-line comments (`// ...`)

- Intelligent error reporting:
  - Invalid identifiers (starting with number)
  - Unknown tokens
  - Misspelled keywords (with nearest suggestion)

- Error messages are actionable and include correction hints, for example:
  - `Line 2, Column 1: Invalid token "flot" ... Suggestion: "float"`
  - `Line 3, Column 5: Invalid token "9abc" ... Suggestion: rename to start with a letter or _`


## Run in VS Code

1. Open this project folder in VS Code.
2. Ensure Python 3 is installed.
3. Open terminal in VS Code.
4. Run:

```bash
python main.py
```

## Sample Test Input

```c
int mainVar = 10;
flot value = 20.5;
if (mainVar > 5) {
    print(mainVar);
}
9abc = 2;
@invalid
// This is a comment
```

Expected behavior:
- `flot` should trigger a suggestion like `float`.
- `9abc` should be reported as invalid identifier.
- `@` should be reported as unknown token.
- Identifiers should appear in the symbol table with line numbers.

## Notes for Beginners

- `lexer.py` contains the tokenization logic.
- `ai_module.py` contains Levenshtein distance and keyword suggestion logic.
- `gui.py` handles all Tkinter widgets and report export.
- `utils.py` has helper functions used across modules.
