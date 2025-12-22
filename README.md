# 🧠 WisdomVault

**WisdomVault** is a full-stack digital life lessons platform where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom gathered from real-life experiences. The platform encourages mindful reflection and community learning through structured lesson management and premium content access.

🌐 **Live Website:** https://wisdom-vault-client-side.vercel.app/  
📦 **Client Repository:** https://github.com/ferdaws-ahmed/WisdomVault-client  
🖥 **Server Repository:** https://github.com/ferdaws-ahmed/WisdomVault-server-side  

---

## ✨ Key Features

- 🔐 Secure authentication using email/password and Google login
- 📝 Create, update, and manage personal life lessons with category & emotional tone
- 🌍 Public and private lesson visibility with Free & Premium access control
- ⭐ Premium system with Stripe one-time lifetime payment
- 🔖 Save lessons to Favorites and track engagement
- ❤️ Like, comment, report, and share life lessons
- 📊 User & Admin dashboards with analytics and management tools
- 🛡 Role-based access control (User / Admin)
- 📱 Fully responsive design for mobile, tablet, and desktop

---

## 🧩 Lesson Access Rules

- Free users can view **public free lessons**
- Premium users can view **all public lessons (Free + Premium)**
- Premium lessons appear **blurred & locked** for Free users with upgrade prompt
- Only Premium users can create **Premium lessons**

---

## 💳 Pricing & Premium Plan

- 💰 **Price:** ৳1500 (One-time payment – Lifetime access)
- 💰 **Price:** ৳3000 (One-time payment – Lifetime Admin access)
- 🔗 Payment handled via **Stripe Checkout**
- 🔄 User premium status is synced from MongoDB (single source of truth)

---

## 🧑‍💻 Dashboard Overview

### 👤 User Dashboard
- Overview analytics (total lessons, favorites, recent activity)
- Add / Update / Delete lessons
- Manage lesson visibility and access level
- Favorites management
- Profile management with Premium badge

### 🛠 Admin Dashboard
- Platform analytics (users, lessons, reports)
- Manage users and roles
- Moderate lessons and reported content
- Feature lessons and review reports

---

## 🔐 Authentication & Security

- Authentication powered by **:contentReference[oaicite:0]{index=0}**
- JWT verification using Firebase Admin SDK on server
- Secure environment variables for Firebase & MongoDB credentials
- Protected routes for authenticated users only
- Reload-safe private routes (no auto logout on refresh)

---

## 🧰 Tech Stack

### Frontend
- React.js
- React Router
- TanStack Query
- Tailwind CSS
- SweetAlert / Toast Notifications
- Lottie Animations

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- **:contentReference[oaicite:1]{index=1}** (Test Mode)

---

## 📄 Pages Implemented

- Home
- Login / Register
- Public Lessons
- Lesson Details (Protected)
- Pricing / Upgrade
- Payment Success & Cancel
- Dashboard (User & Admin)
- Favorites
- Add / Update Lesson
- Profile
- 404 Not Found
- Loading Page

---

## 🚀 Deployment Notes

- Frontend routes are reload-safe
- No CORS, 404, or private route reload issues
- Firebase domain authorization configured
- Server deployed without errors

---


## 📜 Project Purpose

People often learn powerful lessons in life but forget them over time. **WisdomVault** preserves those lessons, helps users reflect on personal growth, and allows the community to learn from shared experiences in a meaningful and organized way.

---

## 📬 Contact

If you have any questions or feedback, feel free to reach out.
**Md.Ferdaws (Alif)**
**📧 Email: mdalifmahmud555@gmail.com**
**🌐 GitHub: github.com/ferdaws-ahmed**

**Made with ❤️ for mindful learning & growth**
