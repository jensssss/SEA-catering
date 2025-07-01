# SEA Catering Admin Dashboard (Next.js + Supabase)

This is the admin dashboard for SEA Catering, built with **Next.js 15 App Router**, **Supabase**, and **Tailwind CSS**.  
It provides real-time metrics for subscriptions and revenue, and includes **role-based access control (RBAC)** to restrict admin pages.

---

##  Features

-  **Authentication** via Supabase
-  **RBAC**: Only `admin` users can access `/admin/dashboard`
-  Subscription & revenue metrics:
  - New subscriptions
  - Monthly Recurring Revenue (MRR)
  - Reactivations
  - Active subscriptions
- 📆 Filter metrics by date range
- ⚡ Modern stack: React 18, Next.js 15, Tailwind CSS 3, Supabase

---

## 🛠 Setup Instructions

1. **Clone & install:**

```bash
git clone https://github.com/your-org/sea-catering.git
cd sea-catering
npm install
```

2. **Set up `.env.local`:**

```
NEXT_PUBLIC_SUPABASE_URL=******
NEXT_PUBLIC_SUPABASE_ANON_KEY=******
SUPABASE_SERVICE_ROLE_KEY=******
```

3. **Run the dev server:**

```bash
npm run dev
```

4. **Supabase setup:**
   - Ensure you have a `profiles` table with:
     - `id`: uuid (linked to auth.users)
     - `full_name`: text
     - `role`: text (`admin` or `user`)

---

## Role-Based Access Logic

- **Client Side (Navbar, etc):**
  - Admins will see the "Admin Panel" link.
- **Server Side (layout.tsx):**
  - `app/admin/layout.tsx` restricts access based on `profiles.role`.
  - If not `admin`, user is redirected to `/unauthorized`.

---