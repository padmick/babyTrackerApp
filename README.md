# Family Tracking App

A secure, real-time family tracking application built with React, Cloudflare Workers, and Firebase Authentication.

## Features

- 👨‍👩‍👧‍👦 Multi-family support with partner invitations
- 🍼 Feeding tracking (breast, bottle, solids)
- 😴 Sleep tracking with quality monitoring
- 📝 Daily journal with mood tracking and milestones
- ✅ Shared task management between partners
- 📱 Responsive design for mobile/desktop
- 🔄 Real-time updates using Cloudflare Durable Objects
- 📸 Photo storage with Cloudflare R2
- 🔒 Secure authentication with Firebase

## Prerequisites

- Node.js 18+
- Cloudflare account
- Firebase account
- Wrangler CLI (`npm install -g wrangler`)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication with email/password
   - Copy your Firebase config to `src/lib/firebase.ts`

4. Configure Cloudflare:
   - Create a Cloudflare account
   - Create an R2 bucket named "family-tracking-media"
   - Login to Wrangler:
     ```bash
     wrangler login
     ```

5. Environment Setup:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Deploy the worker:
   ```bash
   npm run deploy:worker
   ```

## Project Structure

```
├── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility libraries
│   ├── pages/        # Page components
│   ├── stores/       # State management
│   └── types/        # TypeScript types
├── workers/
│   ├── durable-objects/  # DO implementations
│   └── index.ts      # Worker entry point
```

## Security

- All data is encrypted at rest and in transit
- Firebase Authentication handles user identity
- Cloudflare Workers provide edge security
- R2 Storage uses signed URLs for media access

## License

MIT