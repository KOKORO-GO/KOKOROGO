# KokoroGo（心GO）

AI-powered passion discovery & venture platform for girls aged 12-16.

**好きを見つけて、未来をつくろう。** Find your spark. Build your future.

## Setup

1. Push this repo to GitHub
2. Connect to Vercel
3. Add your custom domain in Vercel settings
4. (Optional) Add environment variables for waitlist storage (Supabase, Airtable, etc.)

## Structure

```
kokorogo-site/
├── public/
│   └── index.html      # Landing page
├── api/
│   └── waitlist.js      # Vercel serverless function for waitlist signups
├── vercel.json          # Vercel configuration
├── package.json
└── .gitignore
```

## Deployment

This is a static site with a serverless API endpoint, deployed on Vercel.

Built with heart in Hawaii & Japan.
