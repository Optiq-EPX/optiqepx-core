# 💎 OptiqEPX — Pro Alpha Series

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-DB%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

**OptiqEPX** is a next-generation student learning and growth platform designed to transform education through competition, collaboration, and high-performance AI integration. Built with a "Pro Max" aesthetic, it delivers a state-of-the-art interface for the modern scholar.

---

## Key Features

### 🏆 Battle Arena

Gamified learning at its peak. Students compete in real-time study duels across various subjects, earning points and climbing the leaderboard through AI-validated knowledge challenges.

### 📡 Live Study Rooms

High-performance collaboration spaces with real-time status monitoring, peer-to-peer engagement, and seamless resource sharing.

### 🧠 Personalized AI Tutor

An integrated intelligence layer that provides real-time feedback, generates personalized study paths, and assists in complex problem solving.

### 🛡️ Multi-Role Dashboard System

- **Students**: Personalized activity feeds, stat tracking, and mission progress.
- **Moderators**: Supervision tools for study rooms and arena integrity.
- **Administrators**: Full system console for infrastructure and user management.

---

## 🛠️ Technical Implementation

### **Core Stack**

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Design System: Pro Max Alpha**

- **Glassmorphism**: Advanced backdrop-blur utilities with hardware-accelerated rendering.
- **Dynamic Glows**: Non-blocking radial gradients for depth and premium aesthetic.
- **Motion Engine**: Staggered entrance animations and layoutId-based state transitions.
- **Typography**: Space Grotesk (Headings) & Outfit (Body) pairing.

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Routes & Layouts)
├── components/
│   ├── landing/          # "Hero", "Features", "Pricing" sections
│   ├── shared/           # Core UI: "Logo", "Sidebar", "DashboardShell"
│   └── ui/               # shadcn/ui primitive components
├── features/             # Domain-specific logic (Auth, Arena, Quiz)
├── lib/                  # Utilities, Animations, Constants
├── store/                # Redux store & shared slices
├── utils/                # Supabase helpers & server actions
└── public/               # Static assets & dynamic icons
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/)
- Supabase Project Credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/opticepx-core.git
   cd opticepx-core
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure Environment**
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
   ```

4. **Run Development Server**
   ```bash
   bun dev
   ```

---

## 🗺️ Roadmap & Planning

- [x] **Phase 1**: Core MVP & Auth Integration
- [x] **Phase 2**: Pro Max UI/UX Overhaul & Branding
- [ ] **Phase 3**: Enhanced AI Quiz Generation & Adaptive Tuning
- [ ] **Phase 4**: Advanced Analytics for Students & Educators
- [ ] **Phase 5**: Native Mobile Application (React Native Bridge)

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Built with ❤️ by the OptiqEPX Engineering Team</p>
</div>
