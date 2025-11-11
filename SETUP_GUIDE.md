# 🚀 Personal Hub - Complete Setup Guide

## ✅ What's Been Created

Your Next.js app is ready! Here's what's included:

- ✅ Next.js 15 with App Router
- ✅ TypeScript configuration
- ✅ TailwindCSS for styling
- ✅ Markdown editor with live preview
- ✅ Prototypes code viewer/editor
- ✅ Dark mode toggle
- ✅ LocalStorage persistence
- ✅ Sample data to get you started

## 📋 Prerequisites

Before you start, make sure you have:

1. **Node.js** installed (version 18 or higher)
   - Check if installed: `node --version`
   - Download: [https://nodejs.org/](https://nodejs.org/)

2. **npm** (comes with Node.js)
   - Check if installed: `npm --version`

## 🛠️ Setup Steps

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
cd /Users/irfanshahdad/Desktop/PersonalProjects
npm install
```

This will install all required packages:
- Next.js
- React
- TypeScript
- TailwindCSS
- react-markdown (for markdown rendering)
- And other dependencies

**Expected time:** 1-2 minutes

### Step 2: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in Xs
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Personal Hub app with:
- Sidebar with "Docs" and "Prototypes" buttons
- Header with theme toggle
- Sample content ready to explore

## 🎯 How to Use

### Docs Section

1. Click **"📝 Docs"** in the sidebar
2. You'll see a sample "Welcome" document
3. Click **"Edit"** to edit the markdown
4. Click **"+ New Doc"** to create a new document
5. Changes are saved automatically to localStorage

**Features:**
- Split-pane editor/preview when editing
- Full markdown support (headers, lists, code blocks, links, etc.)
- GitHub Flavored Markdown (tables, task lists, etc.)

### Prototypes Section

1. Click **"⚙️ Prototypes"** in the sidebar
2. You'll see a sample "Button Component" prototype
3. Click **"Edit"** to edit the code
4. Click **"+ New Prototype"** to create a new code snippet
5. Code is saved to localStorage

**Note:** Currently displays code. For live React rendering, you can copy code to CodeSandbox or similar tools.

### Dark Mode

- Click the 🌙/☀️ icon in the header to toggle theme
- Preference is saved to localStorage

## 📁 Project Structure

```
PersonalProjects/
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── DocsView.tsx         # Docs editor/preview
│   │   └── PrototypesView.tsx   # Prototypes viewer/editor
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── globals.css              # Global styles
├── docs/                        # Sample markdown files (optional)
├── prototypes/                  # Sample code files (optional)
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # TailwindCSS config
└── README.md                   # Project documentation
```

## 🔧 Available Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 💾 Data Storage

All data is stored in your browser's localStorage:
- **Docs**: `localStorage.getItem('docs')`
- **Prototypes**: `localStorage.getItem('prototypes')`
- **Theme**: `localStorage.getItem('theme')`

**Note:** Data persists between sessions but is browser-specific. To backup, you can export from browser DevTools.

## 🐛 Troubleshooting

### "command not found: npm"
- Install Node.js from [nodejs.org](https://nodejs.org/)

### Port 3000 already in use
- Kill the process: `lsof -ti:3000 | xargs kill`
- Or use a different port: `npm run dev -- -p 3001`

### Styles not loading
- Make sure TailwindCSS is installed: `npm install`
- Restart the dev server

### TypeScript errors
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` is present

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Add Features
- Components are in `app/components/`
- Main logic is in `app/page.tsx`
- Styles are in `app/globals.css`

## 📝 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ Create your first document!
5. ✅ Add your first prototype!

## 🚀 Deployment

To deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

Or build locally:
```bash
npm run build
npm start
```

---

**Enjoy your Personal Hub! 🎉**

For questions or issues, check the README.md file.

