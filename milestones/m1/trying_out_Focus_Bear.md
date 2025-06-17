# 🧪 Trying Out Focus Bear

This document captures the first-time user experience of the Focus Bear app from a new user's perspective. It includes annotated screenshots and feedback for improvement.

---

## 1. 🪟 To-Do Player Cannot Be Minimised

**Problem:**  
The To-Do Player window stays on the screen in a small floating box and cannot be minimised properly. Users expect it to minimise like a taskbar icon, but instead it always remains visible, which can be distracting.

**Screenshots:**  
| Before Minimising | After Minimising (Still visible) |
|-------------------|----------------------------------|
| <img width="1512" alt="Screenshot 2025-06-04 at 3 20 39 pm" src="https://github.com/user-attachments/assets/17db6da8-7135-4ea0-ba8a-29ec03acb522" /> | <img width="1512" alt="Screenshot 2025-06-04 at 3 20 46 pm" src="https://github.com/user-attachments/assets/e1671bed-b994-4c55-9c1c-eb17250a4e85" />|


---

## 2. 🖥️ UI Conflict with MacBook Dynamic Island

**Problem:**  
On MacBooks with a Dynamic Island, key information or interface elements can be blocked or obscured (you can see on the top of the screen in the picture)

**Screenshot:**  
![IMG_9119](https://github.com/user-attachments/assets/0e83bde8-386b-4ba2-85f5-4cc8b0c2a2b9)


---

## 3. 🔁 Repeated Website Access Prompts

**Problem:**  
Focus Bear frequently prompts users to confirm access for familiar websites like GitHub or Gmail. This repetition can interrupt workflow and becomes frustrating even after previous approvals.
(It doesn't check if the webpage is from the same website, it also keeps asking even if I have already approved and stay on the same page)

**Screenshots:**  
| Gmail Prompt (first) | Gmail Prompt (second) |
|---------------|--------------|
| <img width="1512" alt="Screenshot 2025-06-04 at 3 27 04 pm" src="https://github.com/user-attachments/assets/75862f7f-3c77-49a5-b2ac-f370bfdf9d83" /> |<img width="1512" alt="Screenshot 2025-06-04 at 3 40 13 pm" src="https://github.com/user-attachments/assets/b8197d6b-b0cd-4a32-88f3-429604b7500e" /> |

---

## 4. 🚫 Super Strict Mode Blocks Workflow

**Problem:**  
Super Strict Mode blocks unfamiliar sites completely—even when "I need to use this" is clicked. This caused data loss while editing an unsaved GitHub markdown file. For example, Focus Bear refreshed the tab and erased the content due to blocking, making it unreliable for work on non-auto-saving sites.

E.g. For this markdown file, I first wrote it with simple md style with my thoguhts, but then once I turned on super strict mode, it blocked the access (didn't let me to go back) and when I go back after the time the file is gone (because I didn't commit it and GitHub didn't auto-save).

---

## 5. ⏸️ Confusing Pause Button

**Problem:**  
The “Pause Blocking” button exits the app and restarts it, ending the session instead of pausing it or continuing the focus session. This breaks user expectations and interrupts the flow.

**Screenshot:**  
![Screenshot 2025-06-04 at 4 02 22 pm](https://github.com/user-attachments/assets/7934040d-3f16-452a-843c-bcde459bbe32)

---

## 🧠 Reflection Questions

**1. First Impression:**  
The app has a clear productivity focus, I love the idea of incorporating routines with the app.

**2. Difficult to Understand:**  
The distinction between strict and super strict modes, and the inconsistent behavior of the "pause blocking" button, were unclear.

**3. One-Sentence Summary for a Friend:**  
“Focus Bear helps you stay on task with distraction blocking and structured focus sessions, not only that, it can also helps you to build healthy routines :)”

**4. Suggested Improvements:**  
- Allow proper minimisation of the To-Do Player
- Improve prompt control for approved websites
- Clarify and fix functionality in strict modes
- Pause blocking behave like a true pause, not an exit the app.
- Some of the buttons and fonts are a bit small on iPhone
  - e.g. Edit Habit -> Morning & Evening routine, words like "Habit", "Duration", "More options" are a bit small in my opinion
  - Filer and add activity button can be bigger (a bit close to each other as well).
