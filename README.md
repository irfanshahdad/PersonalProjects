# Personal Hub - Docs + Prototypes

A minimalist Next.js app for managing markdown documentation and live React prototype routes.

## Features

- 📝 **Docs Section**: Write and edit markdown documents with live preview
  - File-based storage: Docs stored as `.md` files in the `docs/` folder
  - API endpoints for reading and updating docs
  - Individual doc pages at `/docs/[id]` with full editing capabilities
  - localStorage fallback for backwards compatibility
- ⚙️ **Prototypes Section**: Create live React component routes you can share
- 🔗 **Shareable URLs**: Each prototype has its own URL (e.g., `/prototypes/interview-tracker`)
- 🌗 **Dark Mode**: Toggle between light and dark themes with persistent preference
- 🎨 **Minimal UI**: Clean, distraction-free interface
- 📄 **GitHub Flavored Markdown**: Full GFM support with `react-markdown` and `remark-gfm`

## Setup Instructions

### Prerequisites

Make sure you have Node.js installed (version 18 or higher). If not, download it from [nodejs.org](https://nodejs.org/).

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
personal-hub/
├── app/
│   ├── api/
│   │   └── docs/
│   │       ├── route.ts         # GET all docs from docs/ folder
│   │       └── [id]/
│   │           └── route.ts     # GET/PUT individual doc
│   ├── components/
│   │   ├── DocsList.tsx         # Docs list view on home page
│   │   ├── DocsView.tsx         # Full docs editor (legacy/unused)
│   │   ├── PrototypesList.tsx   # Prototypes list view
│   │   └── Sidebar.tsx          # Navigation sidebar (legacy/unused)
│   ├── docs/
│   │   └── [id]/
│   │       └── page.tsx         # Individual doc page with editor
│   ├── prototypes/
│   │   ├── [id]/
│   │   │   ├── page.tsx         # Dynamic route for each prototype
│   │   │   └── not-found.tsx    # 404 page for prototypes
│   │   ├── components/          # Your prototype components
│   │   │   ├── ButtonCounter.tsx
│   │   │   ├── CardDemo.tsx
│   │   │   └── InterviewTracker.tsx
│   │   └── layout.tsx           # Prototypes layout
│   ├── prototypes-registry.tsx  # Register your prototypes here
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page component
│   └── globals.css              # Global styles
├── docs/                        # Markdown documentation files
│   ├── welcome.md
│   └── interview-tracker-app.md
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Usage

### Docs Section

**Viewing Docs:**
- Docs are automatically loaded from the `docs/` folder
- Click on any document in the Docs section to view it at `/docs/[id]`
- Each doc has its own dedicated page with full editing capabilities

**Creating/Editing Docs:**

**Option 1: File System (Recommended)**
- Create a new `.md` file in the `docs/` folder (e.g., `my-doc.md`)
- The file will automatically appear in the docs list
- Click on it to view and edit with live preview
- Changes are saved directly to the file via API

**Option 2: Browser (localStorage)**
- Click "+ New Doc" on the home page
- Creates a doc stored in browser localStorage
- Note: localStorage docs cannot be edited on individual doc pages

**Editing:**
- Click "Edit" on any file-based doc page
- Split-screen editor with live markdown preview
- Click "Save" to persist changes to the file
- Changes are saved via PUT request to `/api/docs/[id]`

### Prototypes Section

**Viewing Prototypes:**
- All available prototypes are displayed on the home page in the Prototypes section
- Click on any prototype card to view it at `/prototypes/[id]`
- Share the URL with colleagues/friends!

**Adding a New Prototype:**

1. **Create your component** in `app/prototypes/components/`:
   ```tsx
   // app/prototypes/components/MyPrototype.tsx
   'use client';
   
   export default function MyPrototype() {
     return <div>Your component here</div>;
   }
   ```

2. **Register it** in `app/prototypes-registry.tsx`:
   ```tsx
   import MyPrototype from './prototypes/components/MyPrototype';
   
   export function getPrototypes(): Prototype[] {
     return [
       // ... existing prototypes
       {
         id: 'my-prototype',
         name: 'My Prototype',
         description: 'Description of what it does',
         component: MyPrototype,
       },
     ];
   }
   ```

3. **Access it** at `/prototypes/my-prototype`

**Current Prototypes:**
- `interview-tracker` - A comprehensive interview management app for job seekers
- `button-counter` - Example counter component
- `card-demo` - Example card component

## Sharing Prototypes

Each prototype has its own URL:
- Local: `http://localhost:3000/prototypes/[id]`
- Production: `https://your-domain.com/prototypes/[id]`

Share these URLs with colleagues and friends to show off your prototypes!

## Data Storage

- **Docs**: 
  - Primary: Stored as `.md` files in the `docs/` folder (file system)
  - Fallback: Browser localStorage for backwards compatibility
  - API endpoints: `/api/docs` (GET all) and `/api/docs/[id]` (GET/PUT individual)
- **Prototypes**: Stored as React components in the codebase, registered in `prototypes-registry.tsx`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with remark-gfm (GitHub Flavored Markdown)
- **Runtime**: Node.js 18+

## API Endpoints

### Docs API

- `GET /api/docs` - Retrieve all markdown files from the `docs/` folder
- `GET /api/docs/[id]` - Retrieve a specific document by ID
- `PUT /api/docs/[id]` - Update a document's content

All endpoints return JSON with the document structure:
```json
{
  "id": "document-id",
  "title": "Document Title",
  "content": "Markdown content...",
  "filename": "document-id.md"
}
```

## Future Enhancements

- ✅ File system integration for docs (implemented)
- GitHub sync
- Folder organization for docs
- Search functionality
- Prototype categories/tags
- Doc creation via API
