# Study Planner App

A lightweight **personal productivity web app** that helps you organize weekly priorities, embed your Google Calendar, manage to-do tasks, study sessions, and assignments. Built with **HTML, CSS, Bootstrap, and vanilla JavaScript**, and uses **LocalStorage** for persistence (no server required).

---

## Features

* **Weekly Priorities**: Add, edit, and save weekly goals with bullet points. Persists in LocalStorage.
* **Google Calendar Integration**: Paste your Google Calendar embed link to view your schedule inside the app. Calendar persists and can be removed anytime.
* **To-Do List**: Add tasks, mark complete (moves to bottom with strikethrough), delete tasks, and scrollable when long.
* **Study Sessions**: Add sessions with session name, date, and time (from → to). Check off completed sessions.
* **Assignments**: Add assignments with name, deadline date, and time. Mark complete and delete assignments.
* **Themed UI**: Transparent card design, background image, semi-frosted look, cohesive styling with `styles.css`.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, Bootstrap 5
* **Logic:** Vanilla JavaScript (ES6)
* **Storage:** Browser LocalStorage
* **Calendar:** Google Calendar Embed (iframe)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/srishti-k-dubey/Study-Planner.git
cd study-planner
```

### 2. Open in browser

Simply open `index.html` in your browser. No server or database required.

---

## How to Use

### Weekly Priorities

* Click **Edit** to unlock the text area.
* Add your tasks (Enter automatically adds a bullet point).
* Click **Save** to store them in LocalStorage.

### Embed Google Calendar

1. In Google Calendar, go to **Settings → Integrate calendar → Embed code**.
2. Copy the `src` URL from the embed `<iframe>`.
3. Paste it into the input field and click **Load Calendar**.
4. Calendar will appear and persist even after refresh.
5. Click **Remove** to clear it.

### To-Do List / Study Sessions / Assignments

* Add items using the input fields.
* Mark items complete (they move to bottom with strikethrough).
* Delete items using the trashbin button.
* Dates and times help keep your schedule clear.

---

## Customization

* Change background: replace `images/bg.jpg`.
* Adjust transparency: tweak `.card { background-color: rgba(...); }` in `styles.css`.
* Fonts and colors can be customized in `styles.css`.

---

## Future Enhancements

* Export tasks to Google Calendar automatically.
* User authentication for syncing across devices.
* Dark mode toggle.
* Tabs for daily, weekly and monthly planners.
* Database integration for scalability.
* Progress tracker.
* Timers for study sessions.
* Focus music for study sessions.
* Reminders for assignment deadlines.
* Gamification, i.e., badges for progress.

---

## License

This project is open-source and available under the **MIT License**.
