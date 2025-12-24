# ⚠️ cPanel Deployment (Limited Functionality)

## WARNING:
Using cPanel hosting will DISABLE these features:
- ❌ Contact form email sending (no API routes)
- ❌ AI chatbot backend (no API routes)  
- ✅ Landing page display will work (static only)

## If You Still Want to Use cPanel:

### Step 1: Export as Static Site
```bash
# Edit next.config.js - add this:
output: 'export',
distDir: 'out',
```

### Step 2: Build Static Version
```bash
bun run build
```

### Step 3: Upload to cPanel
1. Compress the `out` folder as ZIP
2. Upload to cPanel File Manager
3. Extract in public_html directory
4. Done - but NO backend features

## RECOMMENDED: Use Vercel Instead
- FREE hosting
- ALL features work
- Better performance
- Automatic SSL
- Global CDN
- 5-minute setup
