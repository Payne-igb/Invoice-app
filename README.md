# 🧾 Invoice Management App

A modern React-based invoice management application that allows users to create, edit, view, and manage invoices efficiently. This project is built with a focus on clean UI, dynamic state management, and practical business logic.

---

## 🚀 Features

* ✅ Create new invoices with dynamic form inputs
* ✏️ Edit existing invoices
* 👁️ View detailed invoice information
* 💰 Automatically calculate totals and payment due
* 📌 Mark invoices as **Paid**, **Pending**, or **Draft**
* 🗑️ Delete invoices with confirmation modal
* 🔄 Real-time UI updates using React state
* 📱 Responsive layout

---

## 🛠️ Tech Stack

* **Frontend:** React
* **Routing:** React Router
* **Styling:** CSS
* **State Management:** React Hooks (`useState`)

---

## 📁 Project Structure

```
src/
│
├── assets/              # Images and static files
├── components/          # Reusable components
│   ├── Sidebar.jsx
│   ├── EditSidebar.jsx
│   ├── BreakdownCost.jsx
│   ├── DeleteModal.jsx
│
├── pages/               # Main application pages
│   ├── ViewInvoice.jsx
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 2. Navigate into the project

```
cd YOUR_REPO_NAME
```

### 3. Install dependencies

```
npm install
```

### 4. Start development server

```
npm run dev
```

---

## 📦 Build for Production

To create an optimized production build:

```
npm run build
```

This generates a `build/` or `dist/` folder (depending on your setup).

---

## 🌍 Deployment (Netlify)

### Option 1: Manual

* Run `npm run build`
* Upload the `build/` folder to Netlify

### Option 2: GitHub Integration

* Connect your repo to Netlify
* Set:

  * Build command: `npm run build`
  * Publish directory: `build`

---

## ⚠️ Routing Fix (Important)

If you are using React Router, create this file:

```
public/_redirects
```

Add:

```
/*    /index.html   200
```

This prevents page refresh errors on deployed apps.

---

## 🧠 Key Logic Highlights

* **Dynamic Invoice Creation:**
  Form inputs are collected and transformed into structured invoice objects.

* **Automatic Calculations:**
  Totals and payment due are computed based on item prices and quantities.

* **State Updates:**
  Uses immutable updates to ensure React re-renders correctly.

* **Invoice Identification:**
  Each invoice is assigned a unique ID (e.g., `RT1024`).

---

## 📌 Future Improvements

* 🔐 Authentication system
* ☁️ Backend integration (Node.js / Firebase)
* 📊 Dashboard analytics
* 🧾 PDF export for invoices
* 🔎 Search and filter functionality

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👤 Author

**Christopher Igbonekwu**

---

## ⭐ Support

If you find this project useful, consider giving it a star ⭐ on GitHub.
