# Clean Code Testing
### How do unit tests help keep code clean?

Writing unit tests for `formatUser` function `from test/userUtils.ts` helped clarify the function’s intended behaviour and made the code easier to reason about. Based on my own experience writing and running these tests, here’s how they improved the code:

---

✅ **1. Clarified function behaviour**  
By explicitly testing:
- `formatUser(testUser)` ➝ `Jane Doe <jane.doe@example.com>`  
- `formatUser(testUser, true)` ➝ `Jane Doe <ja***@example.com>`  

…it became clear what the function is expected to do. This removes ambiguity for future developers (or my future self) and avoids needing to read the implementation to understand its purpose.

---

✅ **2. Encouraged simpler, modular code**  
To pass the tests, the function had to:
- stay focused on a single task (formatting + optional masking),
- avoid unrelated logic or side effects,
- stay short and easy to read.  

This aligns well with clean code principles like **single responsibility** and **readability**.

---

✅ **3. Made the function safer and more predictable**  
Even though I didn’t write all edge case tests yet, writing the initial tests made me think about inputs like:
- short or malformed emails,
- missing names or null values.

This mindset reduces bugs and improves long-term maintainability.

---

✅ **4. Gave confidence to refactor**  
With tests in place, I now have a safety net. If I or someone else changes the function later, the tests will catch regressions. This gives me confidence to refactor while keeping the code clean and functional.

---

If I had more time, I’d also consider adding tests for edge cases like:
- empty `firstName` or `lastName`
- malformed or missing email
- `undefined` or `null` user input

These would help push the function toward being even cleaner and more defensive.

### What issues did you find while testing?

- The function didn’t handle edge cases like missing names, short or malformed emails, or `undefined` input.
- It assumed valid input without checks, which could cause errors in real-world use (e.g., API data).
- Writing tests revealed the need for validation and defensive coding.
- The process showed how even basic testing improves reliability and highlights weak spots.

When implementing the Jest tests, I got an error saying describe was not defined — I realised I needed to configure Jest properly in my TypeScript project. Once resolved, I noticed that testing forced me to better structure the code. It made me more aware of naming clarity and handling optional parameters like maskEmail. Overall, the process helped me think more critically about clean design and function responsibility.

I ran the tests using the command:
```bash
npx jest
```
and they passed successfully, as shown in the screenshot below:
![Test for running jest](<Screenshot 2025-06-19 at 3.08.50 pm.png>)