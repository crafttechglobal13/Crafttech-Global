# Deploying CRAFTTECH GLOBAL on Hostinger via Git

This guide provides simple, step-by-step instructions to deploy CRAFTTECH GLOBAL on Hostinger using Git.

---

## Prerequisites Configured in this Repository
- **`server.js`** / **`app.js`**: Production Node.js server entry points.
- **`ecosystem.config.js`**: PM2 process manager configuration.
- **`.htaccess`**: Reverse proxy routing web traffic to the Node.js server (port 3000).
- **`deploy.sh`**: Automated one-click deployment script.
- **`package.json`**: Configured with `main: "server.js"`.

---

## Step 1: Clone Repository in Hostinger SSH Terminal

Open your Hostinger SSH / Web Terminal and navigate to your website root directory:

```bash
cd domains/yourdomain.com/public_html
# (or simply: cd public_html)
```

Clone using your GitHub Token (replace `YOUR_TOKEN` with your GitHub Personal Access Token):

```bash
git clone https://crafttechglobal13:YOUR_TOKEN@github.com/crafttechglobal13/Crafttech-Global.git .
```

---

## Step 2: Run Automated Deployment Script

Once cloned, make `deploy.sh` executable and run it:

```bash
chmod +x deploy.sh
./deploy.sh
```

This single command automatically:
1. Pulls the latest files from `main`
2. Creates `.env` from `.env.example`
3. Installs dependencies (`npm install`)
4. Generates Prisma database models (`npx prisma generate`)
5. Compiles the Next.js production build (`npm run build`)
6. Reloads the Node.js application

---

## Step 3: Configure Hostinger Node.js Manager (hPanel)

1. Open **Hostinger hPanel** -> **Websites** -> **Node.js**.
2. Click **Create Application** (or Edit):
   - **Node.js version:** `18.x` or `20.x`
   - **Application mode:** `Production`
   - **Application root:** `domains/yourdomain.com/public_html` (or `public_html`)
   - **Application startup file:** `server.js` (or `app.js`)
3. Click **Save** and **Start Application**.

---

## Step 4: Admin Access

Once live, access your administrative dashboard:
- **URL:** `https://yourdomain.com/admin`
- **Email:** `admin@crafttechglobal.com`
- **Password:** `crafttech@admin2026`
