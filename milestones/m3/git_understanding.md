# Git Understanding - Pull Request

The PR that I created for [issue 60](https://github.com/users/hisnameisjoseph/projects/5/views/1?pane=issue&itemId=113330214&issue=hisnameisjoseph%7Cjosepho-intern-repo%7C60) exercise:  ➡️ [PR #78](https://github.com/hisnameisjoseph/josepho-intern-repo/pull/78)


## 🔎 Reflection

### Why are PRs important in a team workflow?
- Ensure code quality through peer review.
- Help detect bugs and logic errors before merging.
- Allow discussion and feedback on proposed changes.
- Create shared understanding and knowledge transfer across the team.
- Control and review merge conflicts systematically.

### What makes a well-structured PR?
- Clear and concise title summarising the change.
- Short description explaining **what** was changed and **why**.
- Small, focused changes that are easy to review.
- Clean commit history without unnecessary changes.
- Screenshots, test evidence, or context where helpful.

### What did you learn from reviewing an open-source PR?
- Real-world open-source projects follow high professional standards for PRs.
- Reviewers may not know each other personally, so clear context is important.
- Collaboration is often asynchronous, so a PR provides full context for reviewers to catch up.
- PRs are not just for code changes but also for communication and shared understanding.

---

## 🔎 Open-Source PR Reviewed

- **Repository:** [facebook/react](https://github.com/facebook/react)
- **Pull Request:** [#32099 - Fix crash caused by layout effects without update queue](https://github.com/facebook/react/pull/32099)

### PR Summary

- **Goal:** Fix a crash in React that occurred when layout effects ran without an update queue.
- **Author:** @gaearon (React core maintainer)
- **Status:** Merged
- **Type of change:** Bug fix + regression tests

### Key Takeaways

| Best Practice        | Example from PR                                   |
|-----------------------|---------------------------------------------------|
| Clear PR title        | `Fix crash caused by layout effects without update queue` |
| Explain the issue     | Described **why** the crash happened              |
| Minimal, focused change | Only touched related files                      |
| Test coverage included | Added regression tests for the fix               |
| Clean commit history  | Single commit, no unrelated changes              |
| Professional tone     | Clear, simple, and informative                   |

### What I Learned

- Good PRs explain both the problem and the solution.
- Keeping PRs focused makes review easier for others.
- Even small fixes include test coverage.
- Commit history should stay clean and purposeful.
- Simple, descriptive PR titles are best practice.

### How I Can Apply This

- Write clear PR titles summarising changes.
- Always explain both **what** was changed and **why**.
- Keep PRs small and scoped.
- Add screenshots, test results or notes when applicable.
- Keep commit history clean before opening a PR.


### 📎 Link to Open-Source PR

[facebook/react PR #32099](https://github.com/facebook/react/pull/32099)


---

# Git Understanding - Git Messages:

## What makes a good commit message?

- Well-structured and easy to read.
- Succinct and concise.
- Describes **what** was changed and **why**.
- Follows conventional formatting (e.g. `fix:`, `feat:`, `refactor:`).

## How does a clear commit message help in team collaboration?

- Makes it easy for others (and future me) to understand changes quickly.
- Reduces confusion during code reviews or debugging.
- Improves workflow efficiency and team productivity.
- Helps in generating changelogs or release notes automatically.

## How can poor commit messages cause issues later?

- Difficult to trace the origin of bugs or issues.
- Wastes time trying to figure out what a change was intended to do.
- Increases chances of misunderstandings when reviewing old commits.
- Makes the project history messy and harder to maintain.

---

### Example Commit Messages

- [Vague Commit Message](https://github.com/hisnameisjoseph/josepho-intern-repo/commit/d88c8aa4db36e308955bdbd322c03d5723f9c53c)
- [Overly Detailed Commit Message](https://github.com/hisnameisjoseph/josepho-intern-repo/commit/aa6313ef358d11659849e360a6b6bda7c4983a9d)
- [Well-Structured Commit Message](https://github.com/hisnameisjoseph/josepho-intern-repo/commit/d8ea16b26a0450bcfc4424275ed32ef90ebaf034)


--- 

# Git Bisect

## What does `git bisect` do?

`git bisect` is a Git tool that helps identify which commit introduced a bug. It uses a binary search approach — you mark one commit as "good" and another as "bad" to narrow down the commits that need to be checked. Git continues narrowing down the commit range until it finds the exact commit where the issue was introduced.

## When would you use it in a real-world debugging situation?

I would use `git bisect` when:

- A bug appears, but I'm not sure exactly which commit caused it.
- The bug was introduced sometime in the past, and manually reviewing every commit would take too long.
- The repository has many commits, making it inefficient to check them one-by-one.
- I can write a simple test to check whether a commit is "good" or "bad" (which makes the bisect process very efficient).

**Example:**  
In my calculator.ts file (in practice folder), I accidentally introduced a bug into the `divide()` function by not handling division by zero. Using `git bisect` in my local Terminal, I was able to quickly find that the bug was introduced in commit [`349bfff`](349bfffc8c9ca26e59087ffe216735e147baf1e0) when I added the `power()` function and made changes to `divide()`.

## How does it compare to manually reviewing commits?

| Git Bisect            | Manual Commit Review  |
|-----------------------|-----------------------|
| Fast (logarithmic search) | Slow (linear review of every commit) |
| Easy to automate      | Time-consuming and error-prone |
| Works well for large projects | Becomes impractical for many commits |
| Only need a simple test | Need to fully understand every commit manually |

In short: `git bisect` saves a huge amount of time and reduces human error when debugging issues that may have been introduced several commits ago.
