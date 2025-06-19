# 🧠 Git Understanding Reflection

## 🛠️ What caused the conflict?

The merge conflict occurred because I edited the same section of the same file (`file_for_conflict.md`) in two different branches: `main` and `NewBranchForMergeConflict`. 

Git couldn’t automatically decide which version to keep since both branches modified the same lines with different content.

## 🔧 How did I resolve it?

1. I reviewed the conflicting lines, which were clearly marked by Git (Github) with conflict markers:
   - `<<<<<<<` for the current branch
   - `=======` as the separator
   - `>>>>>>>` for the incoming branch
2. I manually chose which version to keep—or combined both where appropriate, in the end I combined both sentences into the file.
3. I removed the conflict markers after resolving the content.
4. I marked the conflict as resolved in the GitHub interface and committed the changes, which the pull-request now is shown as "closed".

## 📚 What did I learn?

- I noticed that once I committed the changes, both branches now have the same file content on GitHub, I can even choose to delete the other branch that is conflicted with the main branch.
- I believe merge conflicts usually happen when multiple branches modify the same file (especially the same lines).
- Git clearly marks the conflict and allows manual intervention to resolve it (or Copilot can help check the conflict as I noticed on GitHub).
- Resolving conflicts requires understanding the intention of each change, I believe it would be great if there's comments in the files (especially if it is a code file) to understand the whole context or how algorithms work in those files to see how to edit and merge them together.
- It’s important to communicate with teammates during real projects to prevent or resolve conflicts effectively.
