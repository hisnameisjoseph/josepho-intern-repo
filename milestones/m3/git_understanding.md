# Git Understanding - Pull Request

The PR that I created for [issue 60](https://github.com/users/hisnameisjoseph/projects/5/views/1?pane=issue&itemId=113330214&issue=hisnameisjoseph%7Cjosepho-intern-repo%7C60) exercise:  ➡️ [PR #78](https://github.com/hisnameisjoseph/josepho-intern-repo/pull/78)

---

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


## 📎 Link to Open-Source PR

[facebook/react PR #32099](https://github.com/facebook/react/pull/32099)


---
# Git Understanding - Git Messages:

## What makes a good commit message?
## How does a clear commit message help in team collaboration?
## How can poor commit messages cause issues later?
