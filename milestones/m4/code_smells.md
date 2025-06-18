# Identifying & Fixing Code Smells

### Code smells are indicators of potential issues in the code that may not necessarily be bugs but can lead to problems in the future. Fixing the code smells is crucial for maintaining a healthy codebase.

### Common Code Smells and Examples

1. **Magic Numbers & Strings**
   - _Description_: Hardcoded constants without explanation, making the code less readable.
   - _Examples_:
     - `const area = radius * radius * 3.14;` → should use a named constant like `const PI = 3.14;`
     - `if (currency === "USD")` → better to define `const CURRENCY_CODE = "USD";`

2. **Long Functions**
   - _Description_: Functions that do too many things and are hard to understand or maintain.
   - _Examples_:
     - A function that handles authentication, logs activity, and sends emails (can split into 3 functions).
     - A form handler that validates input, saves data, and generates a report (can also split into 3 functions).

3. **Duplicate Code**
   - _Description_: Same logic repeated in different places, making updates error-prone.
   - _Examples_:
     - Input validation copied across different modules instead of using a shared utility.
     - The same error-handling pattern repeated in multiple functions.

4. **Large Classes (God Objects)**
   - _Description_: Classes that take on too many responsibilities and become difficult to manage.
   - _Examples_:
     - A `UserManager` class that handles user data, file uploads, email notifications, and logging (can split into separate classes).
     - A `DashboardController` that handles rendering, routing, API calls, and analytics.

5. **Deeply Nested Conditionals**
   - _Description_: Code with many layers of `if`/`else` blocks, making it hard to read.
   - _Examples_:
     - Nested conditions inside loops and try/catch blocks.
     - Multiple `if/else if/else` levels instead of using early returns or switch statements.

6. **Commented-Out Code**
   - _Description_: Old code left commented out, cluttering the file and reducing clarity.
   - _Examples_:
     - `// const oldLogic = legacyFunction();`
     - `// console.log("debug info");`
     - Beast practice is to remove such code and use version control to retrieve it if needed.
     - Use Git version history to track changes instead of leaving commented-out code in the current version.

7. **Inconsistent Naming**
   - _Description_: Variables or functions named inconsistently, making logic harder to follow.
   - _Examples_:
     - `get_user()`, `fetchUserData()`, and `retrieveUser()` used for similar purposes.
     - `temp`, `data`, `info` used generically across unrelated contexts.
