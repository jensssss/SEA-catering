
# SEA Catering App (Fullstack – Next.js + Supabase)

This is the official web application for **SEA Catering**, a healthy meal delivery service that has gone viral across Indonesia.  
Built with **Next.js 15 App Router**, **Tailwind CSS**, and **Supabase**, this app supports:

- Customer subscriptions
- Meal plan customization
- Admin analytics dashboard
- Role-based authentication
- Security-aware design (including CSRF token flow)

---

##  Features

-  User Registration & Login (via Supabase Auth)
-  Dynamic Subscription System with price calculation
-  Admin Dashboard with metrics:
  - New Subscriptions
  - Monthly Recurring Revenue (MRR)
  - Reactivations
  - Growth
-  Role-Based Access Control (RBAC)
-  Testimonial submission & display
-  Responsive Design (Mobile & Desktop)
-  REST API Routes via Next.js

---

##  How to Run Locally

###  Prerequisites

- Node.js v18+
- Supabase account (already pre-configured)
- Git

---

###  1. Clone the Repository

```bash
git clone https://github.com/your-username/sea-catering.git
cd sea-catering
```

---

###  2. Install Dependencies

```bash
npm install
```

---

###  3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xakvziasxzmzjrfxywnx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhha3Z6aWFzeHptempyZnh5d254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTE3NzUsImV4cCI6MjA2NjMyNzc3NX0.PbTL7T2fJvctv5bKDiF4iPE4iNxOVbYfx4vj-IirK2w
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhha3Z6aWFzeHptempyZnh5d254Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc1MTc3NSwiZXhwIjoyMDY2MzI3Nzc1fQ.-Il7hhFKcEoLBcB4O5AAEkMYRPu9vk0JbpvtScj9d8c
```

---

###  4. Supabase Tables

Ensure your Supabase project has these tables:

#### `profiles`
| Column     | Type    |
|------------|---------|
| id         | uuid (PK, from `auth.users`) |
| full_name  | text    |
| role       | text (`admin` or `user`)     |

#### `subscriptions`
| Column       | Type        |
|--------------|-------------|
| id           | int (PK)    |
| user_id      | uuid        |
| plan         | text        |
| meals        | text[]      |
| days         | text[]      |
| total_price  | float       |
| status       | text        |
| allergies    | text        |
| pause_end    | timestamp   |
| created_at   | timestamp   |

#### `testimonials`
| Column     | Type      |
|------------|-----------|
| id         | int (PK)  |
| name       | text      |
| message    | text      |
| rating     | int       |
| created_at | timestamp |

 Enable Row-Level Security (RLS) with insert/select permissions for authenticated users.

---

###  5. Start the Dev Server

```bash
npm run dev
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

##  Admin Access

Admins can access `/admin/dashboard`.

To promote a user to admin:
1. Go to Supabase → Table Editor → `profiles`
2. Change the `role` column to `"admin"` for your test user


---

##  Tech Stack

-  React 18 + Next.js 15 (App Router)
-  Supabase (PostgreSQL + Auth)
-  Tailwind CSS
-  TypeScript
