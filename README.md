# Personal Hub - Docs + Prototypes

A minimalist Next.js app for managing markdown documentation and live React prototype routes.

## Features

- 📝 **Docs Section**: Write and edit markdown documents with live preview
- ⚙️ **Prototypes Section**: Create live React component routes you can share
- 🔗 **Shareable URLs**: Each prototype has its own URL (e.g., `/prototypes/button-counter`)
- 💾 **Local Storage**: Docs persist in browser localStorage
- 🌗 **Dark Mode**: Toggle between light and dark themes
- 🎨 **Minimal UI**: Clean, distraction-free interface

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
│   ├── components/
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── DocsView.tsx         # Docs section with editor/preview
│   │   └── PrototypesView.tsx   # Prototypes list view
│   ├── prototypes/
│   │   ├── [id]/
│   │   │   └── page.tsx         # Dynamic route for each prototype
│   │   ├── components/          # Your prototype components
│   │   │   ├── ButtonCounter.tsx
│   │   │   └── CardDemo.tsx
│   │   └── layout.tsx
│   ├── prototypes-registry.tsx  # Register your prototypes here
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page component
│   └── globals.css              # Global styles
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Usage

### Docs Section

- Click "📝 Docs" in the sidebar
- Click "+ New Doc" to create a new document
- Click on a document to view it
- Click "Edit" to edit the markdown
- Changes are auto-saved to localStorage

### Prototypes Section

**Viewing Prototypes:**
- Click "⚙️ Prototypes" in the sidebar to see all available prototypes
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

## Sharing Prototypes

Each prototype has its own URL:
- Local: `http://localhost:3000/prototypes/[id]`
- Production: `https://your-domain.com/prototypes/[id]`

Share these URLs with colleagues and friends to show off your prototypes!

## Data Storage

- **Docs**: Stored in browser localStorage
- **Prototypes**: Stored as React components in the codebase

## Future Enhancements

- File system integration for docs
- GitHub sync
- Folder organization
- Search functionality
- Prototype categories/tags
