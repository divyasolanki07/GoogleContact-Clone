<div align="center">
# 📒 Google Contacts Clone

**A fully component-based Google Contacts web app built with React + Vite**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📌 About the Project

A pixel-perfect **Google Contacts clone** built as a front-end web application using **React** and **Vite**. The app replicates the look and feel of the real Google Contacts interface, with additional custom features not found in the original — such as **Blood Group tracking** and a **dynamic "Add Field" system**.

All UI state is persisted via **localStorage**, so your contacts are saved even after refreshing the browser.

---

## ✨ Features

### 🏠 Core Features
| Feature | Description |
|--------|-------------|
| 📋 **Contact List** | View all contacts grouped alphabetically |
| ➕ **Add Contact** | Create new contacts with a Google-style form |
| ✏️ **Edit Contact** | Modify any existing contact |
| 🗑️ **Delete / Trash** | Soft-delete contacts — moved to Trash |
| ⭐ **Starred Contacts** | Mark contacts as favourites with one click |
| 🔍 **Live Search** | Search contacts by name, email, or phone |
| 🏷️ **Labels** | Filter contacts by label (Friends, Work, Family, Home) |
| 📱 **Frequently Contacted** | Quickly access your starred contacts |

### 🚀 Custom Features (Not in Google Contacts)
| Feature | Description |
|--------|-------------|
| 🩸 **Blood Group Tracker** | Save & display a contact's blood group |
| 🎛️ **Dynamic Add Field** | Click "+ Add field" to add Birthday, Address, Blood Group, or Notes — only what you need! |
| 💾 **Local Persistence** | All contact data saved to browser localStorage |

### 🛠️ Technical Features
| Feature | Description |
|--------|-------------|
| 🧩 **Modular Architecture** | Every UI element is a reusable component |
| 🔗 **Client-side Routing** | Smooth navigation with React Router DOM |
| 🎨 **Google Design System** | Faithful recreation using CSS variables & Google fonts |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |

---

## 🗂️ Project Structure

```
GoogleContact/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Avatar.jsx
│   │   ├── ContactCard.jsx
│   │   ├── ContactDetail.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ContactList.jsx
│   │   ├── GInput.jsx
│   │   ├── LabelView.jsx
│   │   ├── PlaceholderPage.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── utils/
│   │   └── contacts.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧩 Components Overview

| Component | Location | Purpose |
|-----------|----------|---------|
| `Avatar` | `components/` | Displays colored circle with initials |
| `ContactCard` | `components/` | Single contact row with hover actions |
| `ContactList` | `components/` | Groups & displays all contacts A-Z |
| `ContactDetail` | `components/` | Full detail view of one contact |
| `ContactForm` | `components/` | Create/Edit form with add-field system |
| `GInput` | `components/` | Reusable Google floating-label input |
| `LabelView` | `components/` | Shows contacts filtered by label |
| `PlaceholderPage` | `components/` | Placeholder for empty/upcoming pages |
| `Sidebar` | `components/` | Navigation sidebar |
| `TopBar` | `components/` | Search bar + logo |

---

## 🛣️ App Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `ContactList` | All contacts |
| `/contact/:id` | `ContactDetail` | Single contact detail |
| `/new` | `ContactForm` | Create new contact |
| `/edit/:id` | `ContactForm` | Edit existing contact |
| `/frequent` | `ContactList` | Starred / frequently contacted |
| `/label/:name` | `LabelView` | Contacts filtered by label |
| `/trash` | `ContactList` | Deleted contacts |
| `/directory` | `PlaceholderPage` | Organization directory |
| `/merge` | `PlaceholderPage` | Merge & fix duplicates |
| `/import` | `PlaceholderPage` | Import contacts |
| `/export` | `PlaceholderPage` | Export contacts |

---

## 🩸 Custom Feature: Blood Group + Dynamic Fields

Unlike the real Google Contacts, this app has a **"+ Add Field"** button in the contact form. Clicking it shows a dropdown menu with:

- 🩸 Blood Group *(A+, A-, B+, B-, AB+, AB-, O+, O-)*
- 📅 Birthday *(date picker)*
- 📍 Address *(text)*
- 📝 Notes *(text)*

Each added field can be **removed** with the × button. In **Edit mode**, previously saved fields automatically appear.

> 💡 **Idea:** In emergency situations, knowing a contact's blood group can be life-saving. That's why we added this feature that Google Contacts doesn't have!

---

## ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ⚛️ **React 18** | Component-based UI |
| ⚡ **Vite 5** | Fast development server & bundler |
| 🔗 **React Router DOM** | Client-side navigation |
| 🎨 **Vanilla CSS** | Custom styling with CSS variables |
| 🅱️ **Bootstrap Icons** | All icons via `bi-*` classes |
| 🔤 **Google Fonts** | `Roboto` + `Google Sans` typography |
| 💾 **localStorage** | Data persistence in browser |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
# 1. Clone the repository
git https://github.com/divyasolanki07/GoogleContact-Clone

# 2. Navigate to project folder
cd GoogleContact

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser and go to: **http://localhost:5173**

---

## 👨‍💻 Author

**Made with Me ❤️ as a React learning project**

---

## 📄 License

This project is licensed under the **MIT License** — free to use for educational purposes.

