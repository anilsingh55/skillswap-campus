# 🎓 SkillSwap Campus

> **Zero-Cost Peer Student Skill Exchange Network**  
> Empowering students from all colleges and universities to trade skills 1-on-1 for free—no money, no paywalls, just peer learning.

---

## 🌟 Overview & Features

SkillSwap Campus is a modern, responsive, mobile-first web application designed for students across colleges to connect, teach what they know, and learn what they need:

1. **Collegiate Peer Discovery**: Browse students by college (UC Berkeley, Stanford, MIT, NYU, UCLA, Columbia, Georgia Tech, UT Austin, etc.), major, and graduation year.
2. **Smart Complementary Matching**: Rule-based matching engine identifies **Direct Reciprocal Swaps** (where Student A teaches what Student B wants, and Student B teaches what Student A wants).
3. **Session Lifecycle Management**:
   - Send swap proposals specifying what you offer, what you want, schedule, and format (Remote Video or On-Campus Library).
   - Accept, decline with coordination notes, cancel outgoing proposals, and mark sessions as completed.
4. **Campus Reputation & Reviews**: Peer ratings (1–5 stars), written testimonials, completed swaps counters, and total learning hours credited.
5. **Community Safety & Privacy**:
   - Privacy controls: Public (All Colleges), Campus Only, or Incognito.
   - Report student mechanisms for ghosting or policy violations.
   - One-click block list that instantly removes users from search and matching feeds.
6. **Zero-Monetization Pledge**: Free-tier compatible with zero paid dependencies.
7. **Secure Credential Handling**: Passwords are never stored in plain text or `localStorage`. Hashes are computed via the native **Web Crypto API (SHA-256 + salt)**.

---

## 🏗️ Project Architecture

```
skillswap-campus/
├── index.html                   # HTML entry point with metadata & OpenGraph tags
├── package.json                 # Standard npm dependencies (React 19, Tailwind CSS v4, Lucide)
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite bundler config
├── firestore.rules              # Zero-trust production security rules
├── firebase-blueprint.json      # Blueprint Intermediate Representation (IR)
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root layout, routing & modal controller
│   ├── index.css                # Global Tailwind CSS imports
│   ├── types/
│   │   └── index.ts             # TypeScript domain interfaces (Student, Skill, SessionRequest, Review, Report)
│   ├── services/
│   │   ├── crypto.ts            # Web Crypto SHA-256 password hashing with salt
│   │   ├── storage.ts           # Persistent database service with initial seed state
│   │   ├── authService.ts       # Student registration, login, and session tokens
│   │   ├── matchingService.ts   # Reciprocal complementary match scoring
│   │   ├── requestService.ts    # Proposal state machine (pending, accepted, rejected, completed)
│   │   └── safetyService.ts     # Moderation, reporting, and blocking
│   ├── context/
│   │   ├── AuthContext.tsx      # Current student session state provider
│   │   └── ToastContext.tsx     # Toast notifications provider
│   ├── components/
│   │   ├── common/              # Modal, Badge, EmptyState, ToastContainer
│   │   ├── layout/              # Navbar, MobileNav, Footer
│   │   ├── students/            # StudentCard, StudentDetailModal, ReportModal
│   │   ├── requests/            # SendRequestModal, RequestActionModal
│   │   ├── reviews/             # ReviewModal with celebratory confetti
│   │   └── github/              # ExportGuideModal
│   ├── pages/
│   │   ├── HomePage.tsx         # Platform overview, value pillars, how it works
│   │   ├── ExplorePage.tsx      # Multi-filter search (college, category, availability)
│   │   ├── MatchesPage.tsx      # Complementary & reciprocal matches feed
│   │   ├── DashboardPage.tsx    # Incoming/outgoing requests & scheduled sessions
│   │   ├── ProfilePage.tsx      # Skills offered & wanted editor, availability slots
│   │   ├── SettingsPage.tsx     # Privacy controls, blocked list, database reset
│   │   └── AuthModal.tsx        # Registration, login & quick test switcher
│   └── data/
│       └── seedData.ts          # Authentic college student profiles & initial reviews
```

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- Node.js version 18 or higher
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/skillswap-campus.git

# Navigate into project directory
cd skillswap-campus

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔒 Security & Privacy Features

- **No Plaintext Passwords**: Password hashing is handled in `src/services/crypto.ts` using `crypto.subtle.digest('SHA-256', salt + password)`.
- **Zero Third-Party Trackers**: No intrusive advertising pixels or external analytics scripts.
- **Privacy Controls**: Students can hide their email, conceal their profile outside their university, or toggle incognito mode in **Privacy & Safety**.
- **Community Safety**: Inappropriate requests or no-shows can be reported and blocked with immediate removal from future matching results.

---

## 🌐 Free-Tier Deployment (100% Free Forever)

SkillSwap Campus is engineered to run seamlessly on completely free hosting tiers:

### Option A: Vercel (Recommended)
1. Push your repository to GitHub (see instructions below).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**. Your site is live with a free SSL certificate!

### Option B: Netlify
1. Log in to [netlify.com](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy site"**.

### Option C: GitHub Pages
1. Install `gh-pages` as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`.

---

## 📦 How to Push to GitHub or Export as ZIP

### Pushing to GitHub (Terminal)
Open your terminal in the project directory and run:

```bash
# 1. Initialize git
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete SkillSwap Campus web application"

# 4. Set main branch
git branch -M main

# 5. Connect your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/skillswap-campus.git

# 6. Push code to GitHub
git push -u origin main
```

### Exporting as ZIP
- From AI Studio Build interface, click the **Download / Export** icon in the project toolbar to save the entire source code archive as a `.zip` file to your computer.
- You can also export the database state directly inside the application via **GitHub & Deploy Guide > Export Database JSON**.

---

## 📄 License
Open source and available under the **Apache-2.0 License**. Free for student organizations and colleges worldwide.
