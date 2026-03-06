# KokoroGo Developer Setup Guide

**Everything Michiko (or any team member) needs to set up their MacBook and start editing kokorogo.com**

Last updated: March 5, 2026

---

## Table of Contents

1. [MacBook Pro Security Hardening & Account Setup](#1-macbook-pro-security-hardening--account-setup)
2. [Developer Tools Setup (Do This in ADMIN Account)](#2-developer-tools-setup-do-this-in-admin-account)
3. [Switch to Your Standard User Account](#3-switch-to-your-standard-user-account)
4. [Clone the Project](#4-clone-the-project)
5. [How KokoroGo.com Works (Architecture Overview)](#5-how-kokorogocom-works)
6. [How to Make Changes (The Workflow)](#6-how-to-make-changes)
7. [How to Review & Approve Changes](#7-how-to-review--approve-changes)
8. [Common Tasks](#8-common-tasks)
9. [Account Access Reference](#9-account-access-reference)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. MacBook Pro Security Hardening & Account Setup

Do this FIRST before installing any developer tools. This protects your laptop and follows the same security model ATOM uses on his Mac Mini.

### The Two-Account Model

You will create TWO user accounts on your MacBook Pro:

| Account | Type | Purpose |
|---------|------|---------|
| **Your Name (Admin)** | Administrator | ONLY for installing software, system updates, and security settings. Do NOT use this for daily work. |
| **A Standard User** (e.g., "MichikoKoko") | Standard | For ALL daily work — Claude Code, Claude Cowork, OpenClaw, browsing, coding. This account CANNOT install system software, which protects you from malware. |

This is how ATOM's Mac Mini is set up: the admin account installs everything, and the standard user account (`alohasami`) is used for all daily work including Claude Code.

### Step 1a: Set Up Your Admin Account

When you first set up your MacBook Pro, macOS creates your first account as an Administrator. This is your Admin account.

1. Go to **System Settings** (click the Apple menu  → System Settings)
2. Click **Users & Groups** in the sidebar
3. Make sure your account shows **"Admin"** next to it
4. **Set a strong password** — at least 12 characters, mix of letters, numbers, and symbols
5. **Write it down and store it somewhere safe** (you'll need it for installations)

### Step 1b: Create a Standard User Account (for daily work)

1. Go to **System Settings → Users & Groups**
2. Click the **+** button at the bottom (you may need to unlock with your password)
3. Fill in:
   - **New Account:** Standard (NOT Administrator)
   - **Full Name:** e.g., "MichikoKoko" or whatever you want
   - **Account Name:** e.g., "michikokoko" (this becomes your home folder name)
   - **Password:** Set a strong password (can be different from your admin password)
4. Click **Create User**

### Step 1c: Enable FileVault (Full Disk Encryption)

FileVault encrypts your entire hard drive. If your laptop is lost or stolen, nobody can read your data.

1. Go to **System Settings → Privacy & Security**
2. Scroll down to **FileVault**
3. Click **Turn On FileVault**
4. Choose **"Allow my iCloud account to unlock my disk"** (easiest recovery option)
5. Wait for encryption to complete (it runs in the background, may take a few hours)

**To verify:** The screen should say "FileVault is turned on."

### Step 1d: Enable the Firewall

The firewall blocks unauthorized incoming connections to your Mac.

1. Go to **System Settings → Network**
2. Click **Firewall**
3. Toggle **Firewall** to **ON**
4. Click **Options...**
   - Toggle **"Block all incoming connections"** to OFF (we need some for development)
   - Toggle **"Enable stealth mode"** to ON (hides your Mac from network scans)
5. Click **OK**

### Step 1e: Verify System Integrity Protection (SIP)

SIP prevents malicious software from modifying protected system files. It should be ON by default.

Open Terminal and run:
```bash
csrutil status
```

You should see: `System Integrity Protection status: enabled.`

**If it says "disabled," do NOT change it yourself — ask ATOM for help.** Never disable SIP.

### Step 1f: Verify Gatekeeper

Gatekeeper prevents you from installing unverified apps. It should be ON by default.

1. Go to **System Settings → Privacy & Security**
2. Under **"Allow applications downloaded from:"**, make sure **"App Store and identified developers"** is selected
3. Do NOT select "Anywhere"

### Step 1g: Enable Automatic Updates

1. Go to **System Settings → General → Software Update**
2. Click the **ⓘ** (info) icon next to "Automatic Updates"
3. Turn ON all of these:
   - Check for updates
   - Download new updates when available
   - Install macOS updates
   - Install application updates from the App Store
   - Install Security Responses and system files

### Step 1h: Enable Find My Mac

If your laptop is lost or stolen, you can locate it or remotely erase it.

1. Go to **System Settings → [Your Name] (Apple ID) → iCloud**
2. Scroll down and click **Find My Mac**
3. Turn it **ON**

### Step 1i: Lock Screen Settings

1. Go to **System Settings → Lock Screen**
2. Set **"Require password after screen saver begins or display is turned off"** to **Immediately**
3. Set **"Start Screen Saver when inactive"** to **5 minutes** (or less)

### Step 1j: Additional Security Recommendations

- **Use a different password** for your Admin and Standard accounts
- **Never share your admin password** with anyone
- **Use Safari or Chrome** with an ad blocker (like uBlock Origin)
- **Enable 2FA** (two-factor authentication) on all accounts: GitHub, Anthropic, Apple ID, Google
- **Don't install software from unknown sources** — only use Homebrew, the App Store, or official websites
- **Back up your Mac** regularly with Time Machine or iCloud

---

### Now: Stay in Your ADMIN Account for Installations

For all the installation steps below (Section 2), **stay logged in to your ADMIN account**. You're installing system-level developer tools that require admin privileges.

After all installations are complete, you'll switch to your Standard user account for daily work (Section 3).

---

## 2. Developer Tools Setup (Do This in ADMIN Account)

This is a one-time setup. Follow every step in order. The whole process takes about 20-30 minutes.

### Step 2.1: Open Terminal

1. Press **Cmd + Space** to open Spotlight
2. Type **Terminal** and press Enter
3. A black/white window will open — this is where you'll type commands
4. **Tip:** Right-click the Terminal icon in your Dock and select "Keep in Dock" so you can find it easily later

### Step 2.2: Install Xcode Command Line Tools

This installs Git, compilers, and other developer essentials that macOS needs. Many of the tools below depend on this.

```bash
xcode-select --install
```

A popup will appear asking you to install. Click **Install** and wait (5-10 minutes). If it says "already installed," that's fine — move on.

**To verify it worked:**
```bash
git --version
```
You should see something like `git version 2.39.0`. Any version is fine.

### Step 2.3: Install Homebrew

Homebrew is a package manager for macOS — think of it as an "app store for developer tools" that runs in Terminal. Almost everything else we install uses Homebrew.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will ask for your Mac password (the one you use to log in). **You won't see characters as you type — that's normal.** Press Enter after typing it.

**IMPORTANT: After it finishes, it will show you 2-3 commands to run.** They look something like:

```bash
echo >> /Users/YOURNAME/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/YOURNAME/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**You MUST copy and paste those exact commands from your terminal output** (they'll have your actual username). If you skip this, `brew` won't work.

**To verify it worked:**
```bash
brew --version
```
You should see something like `Homebrew 4.x.x`.

### Step 2.4: Install Node.js & npm

Node.js runs JavaScript on your computer. npm (Node Package Manager) comes with it and is used to install JavaScript libraries. Both are required for the KokoroGo project.

```bash
brew install node
```

**To verify it worked:**
```bash
node --version
npm --version
```
You should see version numbers for both (e.g., `v20.x.x` and `10.x.x`). Both must show a version number.

### Step 2.5: Install Git (should already be installed)

Git is the version control system that tracks all changes to the code. It was installed with Xcode Command Line Tools in Step 2.2, but let's make sure:

```bash
git --version
```

If it shows a version number, you're good. If not:
```bash
brew install git
```

**Configure Git with your name and email** (this is attached to your commits):

```bash
git config --global user.name "Michiko Lynn Powers"
git config --global user.email "YOUR_EMAIL@example.com"
```

Replace `YOUR_EMAIL@example.com` with the email you used for your GitHub account.

### Step 2.6: Install GitHub CLI

This lets you interact with GitHub from the terminal — creating pull requests, reviewing code, etc.

```bash
brew install gh
```

**Now log in to GitHub:**
```bash
gh auth login
```

It will ask you questions. Choose these answers:
1. **What account do you want to log into?** → `GitHub.com`
2. **What is your preferred protocol?** → `HTTPS`
3. **Authenticate Git with your GitHub credentials?** → `Yes`
4. **How would you like to authenticate?** → `Login with a web browser`
5. It will give you a one-time code. Press Enter, a browser will open, paste the code, and authorize.

**To verify it worked:**
```bash
gh auth status
```
You should see "Logged in to github.com as MichikoLynnPowers".

### Step 2.7: Install Vercel CLI

Vercel hosts the website. The CLI lets you test deployments and manage the project from Terminal.

```bash
npm install -g vercel
```

**To verify it worked:**
```bash
vercel --version
```
You should see something like `Vercel CLI 50.x.x`.

**You do NOT need to log in to Vercel** — ATOM manages the Vercel account. You only need the CLI if you want to preview deployments locally.

### Step 2.8: Install Claude Code

Claude Code is the AI coding assistant you'll use to edit the website. It runs in your Terminal and can read, write, and modify code for you based on plain English or Japanese instructions.

```bash
npm install -g @anthropic-ai/claude-code
```

**To verify it worked:**
```bash
claude --version
```
You should see a version number.

### Step 2.9: Set Up Claude Code

Run Claude Code for the first time to log in:

```bash
claude
```

It will ask you to log in to your Anthropic account. Follow the prompts — a browser window will open. Log in or create an account, then come back to Terminal.

Type `/exit` to quit Claude Code after logging in.

### Step 2.10: Install Claude Desktop App / Claude Cowork (optional)

Claude Cowork is a desktop app version of Claude. Download it from:

**[claude.ai/download](https://claude.ai/download)**

Install it like any other Mac app — drag it to your Applications folder. Log in with your Anthropic account.

### Step 2.11: Verify Everything is Installed

Run this final check to make sure all tools are ready:

```bash
echo "--- Checking all tools ---"
echo "Git:       $(git --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Node:      $(node --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "npm:       $(npm --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "GitHub CLI: $(gh --version 2>/dev/null | head -1 || echo 'NOT INSTALLED')"
echo "Vercel CLI: $(vercel --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Claude:    $(claude --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "--- Done ---"
```

**Every line should show a version number.** If any say "NOT INSTALLED," go back to that step and try again.

---

## 3. Switch to Your Standard User Account

You're done installing tools in your Admin account. Now switch to your Standard user account for all daily work.

### Step 3.1: Log Out of Admin

Click the **Apple menu  → Log Out**. Then log in as your **Standard user** (e.g., "MichikoKoko").

### Step 3.2: Why This Matters

From now on, you will do ALL of your daily work in the Standard account:
- Running Claude Code
- Running Claude Cowork
- Running OpenClaw (if installed)
- Editing code
- Pushing to GitHub
- Browsing the web

**The Standard account cannot:**
- Install system-level software (protects against malware)
- Modify system files
- Change security settings

If you ever need to install something new (e.g., update Claude Code, install a new tool), temporarily switch to your Admin account, install it, then switch back.

### Step 3.3: Re-run Tool Setup in Standard Account

Some tools need to be configured again in your Standard user account. Open Terminal and run:

```bash
# Configure Homebrew for this account
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Configure Git with your identity
git config --global user.name "Michiko Lynn Powers"
git config --global user.email "YOUR_EMAIL@example.com"

# Log in to GitHub CLI
gh auth login

# Log in to Claude Code
claude
```

Follow the prompts for `gh auth login` (same as Step 2.6) and `claude` (same as Step 2.9).

### Step 3.4: OpenClaw Setup (If Using)

If you install OpenClaw, use it ONLY in your Standard user account — never in Admin. This sandboxes OpenClaw so it cannot modify system files or install software without your knowledge.

1. Download OpenClaw from the official website
2. **Install it from your Admin account** (switch to Admin, install, switch back)
3. **Run it from your Standard account** for all daily use
4. OpenClaw will only have access to your Standard user's files — it cannot touch system files or other user accounts

### Step 3.5: Verify Tools Work in Standard Account

Run the same verification command from Step 2.11:

```bash
echo "--- Checking all tools ---"
echo "Git:       $(git --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Node:      $(node --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "npm:       $(npm --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "GitHub CLI: $(gh --version 2>/dev/null | head -1 || echo 'NOT INSTALLED')"
echo "Vercel CLI: $(vercel --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Claude:    $(claude --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "--- Done ---"
```

Everything should show version numbers. If not, you may need to add Homebrew to your path (see Step 3.3).

---

## 4. Clone the Project

This downloads the KokoroGo website code to your computer. **Do this in your Standard user account.**

### Step 4.1: Create a working folder

```bash
mkdir -p ~/Desktop/kokorogo
cd ~/Desktop/kokorogo
```

### Step 4.2: Clone the repository

```bash
git clone https://github.com/KOKORO-GO/KOKOROGO.git kokorogo-site
cd kokorogo-site
```

### Step 4.3: Install project dependencies

```bash
npm install
```

This installs the Supabase and Resend packages the project needs.

### Step 4.4: Verify everything works

```bash
npx serve public -l 3000
```

Open your browser and go to **http://localhost:3000** — you should see the KokoroGo landing page!

Press **Ctrl + C** in Terminal to stop the local server.

---

## 5. How KokoroGo.com Works

### The Big Picture

```
You edit code on your laptop
        ↓
Push to a branch on GitHub
        ↓
Create a Pull Request (PR)
        ↓
Michiko or ATOM reviews & approves
        ↓
Merge to main
        ↓
Vercel auto-deploys to kokorogo.com (happens automatically!)
```

### Services We Use

| Service | What It Does | URL |
|---------|-------------|-----|
| **GitHub** | Stores the code. Organization: KOKORO-GO | [github.com/KOKORO-GO/KOKOROGO](https://github.com/KOKORO-GO/KOKOROGO) |
| **Vercel** | Hosts the website. Auto-deploys when code is merged | [vercel.com](https://vercel.com) |
| **Cloudflare** | DNS — points kokorogo.com to Vercel | [dash.cloudflare.com](https://dash.cloudflare.com) |
| **Supabase** | Database — stores waitlist email signups (Tokyo region) | [supabase.com/dashboard](https://supabase.com/dashboard) |
| **Resend** | Sends notification emails to lynn@aloha.org on signup | [resend.com](https://resend.com) |

### Project Structure

```
kokorogo-site/
├── public/
│   └── index.html        ← The entire landing page (HTML + CSS + JS, all in one file)
├── api/
│   └── waitlist.js        ← Server function that saves emails to Supabase + sends notifications
├── vercel.json            ← Tells Vercel how to serve the site
├── package.json           ← Project dependencies (Supabase, Resend)
├── package-lock.json      ← Locked dependency versions
├── .gitignore             ← Files Git should ignore
└── README.md              ← Project overview
```

### What the Landing Page Includes

- Japanese/English language toggle (globe icon in nav)
- Hero section with "Summer 2026" launch badge
- How It Works (3 steps)
- Features (4 cards)
- Kokoro Map visual
- Pricing tiers (Free / Explorer / Creator Pro / Family)
- FAQ accordion
- Waitlist signup form (saves to Supabase, emails lynn@aloha.org)
- Pink Material Design heart icon in logo

### Branch Protection Rules

- **Nobody can push directly to `main`** — all changes must go through a Pull Request
- **At least 1 approval required** before merging — either Michiko or ATOM must approve
- This protects the live website from accidental changes

---

## 6. How to Make Changes (The Workflow)

This is the process you'll follow EVERY TIME you want to change something on the website.

### Option A: Using Claude Code (Recommended)

This is the easiest way. Claude Code will write the code for you.

#### Step 1: Open Terminal and navigate to the project

```bash
cd ~/Desktop/kokorogo/kokorogo-site
```

#### Step 2: Start Claude Code

```bash
claude
```

#### Step 3: Tell Claude what you want to change

Type your request in plain English or Japanese. Examples:

- "Change the hero title to say 'Dream Big, Start Small'"
- "Add a new FAQ question about data privacy"
- "Change the pricing for Creator Pro from 4,980 to 3,980 yen"
- "Update the footer copyright year"

Claude Code will edit the files for you.

#### Step 4: Create a branch, commit, and push

After Claude makes the changes, tell Claude:

> "Create a branch called 'update-hero-title', commit the changes, and push to GitHub"

Or do it manually:

```bash
# Create a new branch (pick a descriptive name)
git checkout -b update-hero-title

# Stage your changes
git add public/index.html

# Commit with a message describing what changed
git commit -m "Update hero title text"

# Push the branch to GitHub
git push -u origin update-hero-title
```

#### Step 5: Create a Pull Request

Tell Claude:

> "Create a pull request"

Or do it manually:

```bash
gh pr create --title "Update hero title" --body "Changed the hero title to say Dream Big, Start Small"
```

Or go to **[github.com/KOKORO-GO/KOKOROGO/pulls](https://github.com/KOKORO-GO/KOKOROGO/pulls)** and click **"New pull request"**.

#### Step 6: Wait for approval

Either you or ATOM needs to approve the PR on GitHub. Once approved, click **"Merge pull request"** on GitHub.

#### Step 7: Vercel auto-deploys

After merging, Vercel automatically deploys the changes to kokorogo.com. Takes about 30-60 seconds. Done!

#### Step 8: Go back to main for next change

```bash
git checkout main
git pull
```

### Option B: Using Claude Cowork

1. Open Claude Cowork
2. Open the `kokorogo-site` folder
3. Ask Claude to make changes in natural language
4. Follow the same branch → PR → review → merge workflow described above

---

## 7. How to Review & Approve Changes

When someone creates a Pull Request, you'll get a notification on GitHub.

### Reviewing a PR

1. Go to **[github.com/KOKORO-GO/KOKOROGO/pulls](https://github.com/KOKORO-GO/KOKOROGO/pulls)**
2. Click on the PR you want to review
3. Click the **"Files changed"** tab to see what was modified
4. Vercel will post a comment with a **Preview URL** — click it to see the changes live before approving
5. If it looks good, click **"Review changes"** → select **"Approve"** → click **"Submit review"**
6. Then click **"Merge pull request"** → **"Confirm merge"**

### What to Look For

- Does the preview look right? (Check on both desktop and mobile)
- Is the Japanese text correct?
- Is the English translation correct?
- Does the waitlist form still work?

---

## 8. Common Tasks

### Preview the site locally (before pushing)

```bash
cd ~/Desktop/kokorogo/kokorogo-site
npx serve public -l 3000
```

Then open **http://localhost:3000** in your browser. Press **Ctrl + C** to stop.

### Pull the latest changes from GitHub

Always do this before starting new work:

```bash
cd ~/Desktop/kokorogo/kokorogo-site
git checkout main
git pull
```

### Check waitlist signups

Go to **[supabase.com/dashboard](https://supabase.com/dashboard)** → select the **kokorogo** project → **Table Editor** → click **waitlist** in the sidebar. You'll see all email signups with timestamps.

### Edit the landing page

The entire landing page is in one file: **`public/index.html`**

- **HTML content** starts around line 450
- **CSS styles** are in the `<style>` tag at the top (lines 17-426)
- **JavaScript** is in the `<script>` tag at the bottom (lines 757-833)

### Edit the waitlist API

The serverless function is in: **`api/waitlist.js`**

This handles:
- Saving emails to Supabase
- Sending notification emails to lynn@aloha.org via Resend
- Duplicate email detection

### Change the language translations

Every translatable element has `data-ja` and `data-en` attributes. Example:

```html
<h2 data-ja="Japanese text here" data-en="English text here">Japanese text here</h2>
```

To change text, update BOTH the `data-ja`/`data-en` attributes AND the inner text (which should match `data-ja` since Japanese is the default).

---

## 9. Account Access Reference

### GitHub Organization: KOKORO-GO

- **URL:** [github.com/KOKORO-GO](https://github.com/KOKORO-GO)
- **Repo:** [github.com/KOKORO-GO/KOKOROGO](https://github.com/KOKORO-GO/KOKOROGO)
- **Members:**
  - AlohaAtom (Keith/ATOM) — Owner
  - MichikoLynnPowers (Michiko) — Owner
- **Branch protection:** `main` requires 1 PR approval before merge

### Vercel

- **Project:** kokorogo-site
- **Team:** Atom Powers' projects
- **Live URL:** [kokorogo.com](https://kokorogo.com)
- **Preview URL pattern:** Each PR gets a unique preview URL (posted as a comment on the PR)
- **Auto-deploy:** Merging to `main` triggers production deployment

### Cloudflare DNS

- **Domain:** kokorogo.com
- **DNS records:**
  - A record: `@` → `76.76.21.21` (DNS only, grey cloud)
  - CNAME record: `www` → `cname.vercel-dns.com` (DNS only, grey cloud)
- **Nameservers:** `adelaide.ns.cloudflare.com` and `guss.ns.cloudflare.com`
- **Registrar:** GoDaddy

### Supabase

- **Project:** kokorogo (Tokyo region)
- **Project URL:** `https://biitdxkqqtpdyfiosjmd.supabase.co`
- **Database table:** `waitlist` (id, email, source, created_at)

### Resend

- **Purpose:** Sends email notifications to lynn@aloha.org when someone joins the waitlist
- **From address:** `onboarding@resend.dev` (free tier default)

### Vercel Environment Variables

These are set in Vercel (Project Settings → Environment Variables) and used by the API:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase public API key |
| `RESEND_API_KEY` | Resend email API key |

---

## 10. Troubleshooting

### "command not found: node"

Homebrew or Node wasn't installed correctly. Run:
```bash
brew install node
```
If brew isn't found either, re-run the Homebrew install from Step 2.3.

### "command not found: claude"

```bash
npm install -g @anthropic-ai/claude-code
```

### "Permission denied" when pushing to GitHub

Make sure you're logged in:
```bash
gh auth status
```
If not logged in, run `gh auth login` again (Step 2.6).

### "You can't push directly to main"

This is by design! You need to:
1. Create a branch: `git checkout -b my-branch-name`
2. Push the branch: `git push -u origin my-branch-name`
3. Create a PR: `gh pr create`
4. Get it approved and merged on GitHub

### "npm install" fails

Make sure you're in the right directory:
```bash
cd ~/Desktop/kokorogo/kokorogo-site
npm install
```

### The website doesn't update after merging

1. Check [vercel.com](https://vercel.com) to see if the deployment is in progress
2. It usually takes 30-60 seconds after merge
3. Try hard-refreshing the page: **Cmd + Shift + R**

### Changes look wrong on the live site

1. Check the Vercel preview URL first (posted on the PR) before merging
2. If something went wrong, you can revert by creating a new PR that undoes the changes

### "I'm lost and nothing is working"

Open Terminal and run:
```bash
cd ~/Desktop/kokorogo/kokorogo-site
claude
```

Then tell Claude Code: "Help me, something is broken" — describe what happened and Claude will help fix it.

---

*Built with heart in Hawaii & Japan*
*KokoroGo Team: ATOM (Keith) & Michiko Lynn Powers*
