# Code Smells
Code smells are indicators of potential issues in the code that may not necessarily be bugs but can lead to problems in the future. Fixing the code smells is crucial for maintaining a healthy codebase.

## Identifying & Fixing Code Smells
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


### 💡 What code smells did you find in your code?

To practice identifying code smells, I generated an intentionally messy `userManager.ts` file using ChatGPT. The code exhibited several classic code smells:

- **God Class**: The class `A` handled multiple unrelated responsibilities—data storage, user sanitisation, sending emails, and logging.
- **Long Method**: The `doEverything()` method combined several tasks, making the logic difficult to follow and maintain.
- **Duplicate Logic**: Trimming user names and saving to a local object occurred in multiple places.
- **Misleading Method Names**: Functions like `blah()` and `doStuffWithUser()` lacked clarity on what they actually did.
- **Overuse of `any`**: The use of any types made the code error-prone and less readable.
- **Low Cohesion**: There was no clear separation of concerns, and internal logic was all over the place.



### 🛠️ How did refactoring improve the readability and maintainability of the code?

I created a cleaned-up version called `CleanUserManager.ts`, which addressed the above smells through the following improvements:

- Defined a `User` interface to enforce consistent, type-safe structure for user data.
- Replaced the god method with smaller, single-purpose methods like:
  - `sanitizeUser()`
  - `saveUser()`
  - `sendEmailToUser()`
  - `logUserAddition()`
- Removed duplicated logic by consolidating user processing steps.
- Introduced clearer naming conventions for both methods and variables.
- Improved overall code readability by applying the Single Responsibility Principle and modular design.
- Easier debugging and extensibility due to clearer method purposes and less repeated code.

Refactoring helped reduce confusion, prevent bugs, and made the codebase more maintainable for future development.

_This activity helped me better understand how even small improvements in structure and naming can greatly improve code quality._


### How can avoiding code smells make future debugging easier?
Avoiding code smells ensures that the codebase remains clean, consistent, and easier to reason about. This helps during debugging because:
- There’s less confusion from outdated or irrelevant code.
- Well-named functions and variables make it clearer where a bug might be coming from.
- Smaller, focused functions isolate logic better, making it easier to pinpoint where something is going wrong.

Overall, keeping code free from smells leads to fewer misunderstandings and faster debugging.

---

### 📚 Additional Learning

While working through this issue on identifying and refactoring code smells, I also gained a clearer understanding of two important software design principles, thanks to ChatGPT:

#### 🔹 Single Responsibility Principle (SRP)
This principle emphasises that a class or function should have only **one responsibility** or **one reason to change**. In the original "smelly" code `UserManager.ts`, a single method (`doEverything`) was handling multiple unrelated tasks — sanitising data, saving to a database, logging, and sending emails. Refactoring this into smaller, focused methods helped me apply the SRP effectively.

#### 🔹 Modular Design
Modular design involves **organising code into small, reusable, and independent modules**. After the refactor, each method had a clear purpose (e.g., `sanitizeUser`, `saveUser`, `logUserAddition`), making the code more readable, testable, and maintainable. This also highlighted how modularity can improve team collaboration and reduce the risk of bugs.

These concepts go beyond just "fixing" code — they help build cleaner, scalable, and more professional software.
