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


---
# Git Understanding - Advacned Git Commands

### What does each command do?

- `git checkout main -- <file>`
  - Restore a specific file from another branch (in this case, from the `main` branch), without switching branches entirely.
  - **Use case**: Accidentally changed a file but want to revert it to how it is in `main`, while keeping your other changes intact.



- `git cherry-pick <commit>`
  - Apply a specific commit from another branch into your current branch without merging the entire branch.
  - **Use case**: A teammate made a useful fix on their branch, and you only want to bring that fix into your current work without merging unrelated changes.



- `git log`
  - View commit history of the repository in chronological order.
  - **Use case**: Track the commit history to review recent changes, investigate when a bug was introduced, or verify if certain features were merged.



- `git blame <file>`
  - Show who last modified each line in a file and when.
  - **Use case**: While debugging, check which commit or developer introduced a specific line that might be causing an issue.

#### Experiment with each command in your test repo
Here I modified the md file (this file) on my local device. Then I used `git checkout` command to retore the file from the main branch.

- `git checkout main -- <file>`
  - I created a new branch called `experiment` and made multiple commits.
  - Steps I Took
    - used a differnt branch for testing out git command
      <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/6991d1e1-7dd9-49b4-9318-945953992135" /> 
    - succencefully use `git checkout main --<file>` command to retrieve the original file (last commit to main) from the main branch.
      <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/4a177afa-f893-427b-9db7-c2d6fd8062fd" /> 

- `git cherry-pick <commit>`

  - I created a new branch called `experiment` and made multiple commits.
  - After a few commits, I only wanted to bring one specific commit into the `main` branch.
  - Steps I Took
    1. Added several commits and pushed them to the `experiment` branch.
   ![Experiment branch ahead of main](https://github.com/user-attachments/assets/bd0ff4a6-1c2d-47fd-9e80-cd079daef8dd)
    2. GitHub detected that my `experiment` branch was ahead of `main` by a few commits, but I didn't want to merge all of them.
   ![GitHub prompting for PR](https://github.com/user-attachments/assets/b7ef0128-100d-4a56-a8dd-07e39867f1a5)
    3. Identified the commit I wanted to cherry-pick:  
   Commit hash: `fddb4cdab34da1c70d454c71e21c756f5258a0e8`
    4. Used the `git cherry-pick` command on my `main` branch to apply that specific commit: `git cherry-pick fddb4cd`
    5. The commit was successfully applied to `main` without merging all the other unrelated commits.
    ![Cherry-pick success](https://github.com/user-attachments/assets/5dc9b9f5-52f6-4150-8f41-e42f8f71127d)

- `git log`
  - I type in `git log` in Terminal, as you can see below, I managed to see the commit history and understand the interactions between my local commit and when I push the commits to the origin/main branch on GitHub. **Here I can see how important it is to have good commit messages.**
    ![Screenshot for git log example](<Screenshot 2025-06-16 at 3.52.02 pm.png>)
- `git blame`
  - I use `git blame` command to see what I can check
    ![Git blame command: shows files that can select to see the past changes](<Screenshot 2025-06-16 at 3.55.13 pm.png>)
  - I selected the `git_understanding.md` file to inspect and see the past changes, I believe what I am seeing right here is the last commit for each line?
  ![Past changes via using `git blame`](<Screenshot 2025-06-16 at 3.55.13 pm-1.png>)

### When would you use it in a real project (hint: these are all really important in long running projects with multiple developers)?
I think these commands will be really helpful for project management work, espcailly for debugging, like if a commit is bad and they want to retrive the previous commit from other branches, thery can use `git blame` to see the modification, use `git log` to view the commits and changes, based on the commit message... and then select the right commit from another branch by using `git checkout` to restore the file or use `git cherry-pick`for merging a speecific commit. I believe these commands help promote safe practices for debugging, rollback, and selective merging, especially in larger projects where multiple people are contributing and frequent merges happen.
### What surprised you while testing these commands?
I was already familiar with `git log` and `git blame`, but testing `git cherry-pick` was quite interesting. The name itself caught my attention, and I found it very useful for selectively applying changes without needing to merge an entire branch. This is something I hadn't encountered in my previous solo projects or university work, but I can see how valuable it is for real-world team collaboration, particularly for fixing bugs (e.g. hotfixes) or pulling in isolated changes.

---
# Git Understanding - Branching & Team Collaboration

For this issue, I created a new branch called `issue_55` branch. I worked locally on my VS Code for this branch and follow the instructions from issue #55 to recreate the scenario.
- I made sure I push the branch with the commits I have got with the command line: `git push --set-upstream origin issue_55`
- ![Any commits for edited file in another branch do not effect the main branch](https://github.com/user-attachments/assets/d05f89bd-af96-4396-b443-d958334faefa)

### Why is pushing directly to main problematic?

Pushing directly to main is risky, especially in a team setting, because it increases the chances of code conflicts and bugs. When multiple people work on the same branch, it becomes harder to track changes, review code, and resolve conflicts. Direct pushes can lead to unstable code, accidental overwrites, and make it difficult to identify which changes introduced bugs. 

Using feature branches and pull requests allows:
- Code reviews before merging
- Easier conflict resolution
- Better version control
- Keeping main stable and production-ready.

### How do branches help with reviewing code?

Branches allow developers to work on new features or fixes in isolation without affecting the main codebase. This makes reviewing changes much easier:
- Pull requests can be created to compare branches with main.
- Reviewers can clearly see what was changed, comment directly on specific lines, and request modifications.
- The review process improves code quality, catches potential issues early, and promotes collaboration.

### What happens if two people edit the same file on different branches?

If two people edit the same file on different branches:
- Git will try to automatically merge changes if edits are in different parts of the file.
- If both edits affect the same lines of code, a **merge conflict** occurs.
- Developers must manually review the conflict, decide which changes to keep, or combine both versions into a working solution.

This highlights the importance of:
- Clear communication
- Frequent syncing with main
- Keeping branches up to date to reduce merge conflicts.

---

# Git Understanding - Staging vs Committing

### 🔎 What is the difference between staging and committing?
- **Staging (git add)**:  
  - Selects which changes/files you want to include in your next commit.
  - Think of it as "preparing your commit basket" before you hit submit.
- **Committing (git commit)**:  
  - Actually creates a snapshot of your staged changes into the repository history.
  - This is the permanent record that gets tracked and shared.
I have been using these two commands a lot during my internship (adding files, reflections, etc.).



### 🔎 Why does Git separate these two steps?

- Allows you to carefully review and select which changes you want to include. *For example, there were files that I modified and didn't want to include in the commit in the previous issue (like adding a typescript file and compiled javascript file locally for testing, but I didn't want to commit the compiled file).*
- Gives you the flexibility to:
  - Partially commit only some changes.
  - Group multiple related changes into meaningful commits.
  - Avoid accidentally committing unrelated edits.
- Helps us keep clean and meaningful commit history.

### 🔎 When would you want to stage changes without comitting?
Sometimes I make multiple changes but want to commit them separately. Staging allows me to control exactly which files or changes to include in a commit. It also helps me review what will be committed before finalising it. This is helpful for keeping my commits clean and focused, especially when working on different parts of a file or multiple issues at once.

### My Experiment & Workflow

I’ve already been using both commands a lot during my internship (as I already knew this concept from university):

- When I modify files locally (e.g. updating markdown reflections), I typically do:
  ```bash
  git status  # check which files are modified (and if they are staged), if not staged, they will be in red
  git add .   # stage all changes (add all files)
  git status  # check again to see which files are staged (they will be in green)
  git commit -m "docs: add reflection for issue #XX"
  git push
  ```
  As you can see in the screenshot below.
  ![Git staging and commit](<Screenshot 2025-06-16 at 5.38.41 pm.png>)