# GUPI — مؤشر الحضور العالمي للجامعات

GUPI (Global University Presence Index) is a platform for ranking Arab universities based on their presence in international rankings and excellence in top-tier rankings.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Auth**: JWT + bcryptjs
- **Excel**: xlsx (import/export)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=postgresql://user:password@host:port/database
PGSSL=true
JWT_SECRET=your-secret-key
```

### Database Setup

The schema is created automatically on first request. To seed initial data:

```bash
npm run seed
```

Then update descriptions:

```bash
node scripts/update-descriptions.js
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## Deploy on Railway

1. Fork/push this repo to GitHub
2. Create a new project on [Railway](https://railway.app)
3. Add a PostgreSQL database service
4. Link the GitHub repo as a service
5. Set environment variables:
   - `DATABASE_URL` (auto-provided by Railway PostgreSQL)
   - `JWT_SECRET`
   - `PGSSL=true`
6. Deploy — schema auto-creates on first request
7. Run `npm run seed` via Railway shell to populate data

## Admin Access

Default credentials: `admin` / `admin123` (change after first login)

## License

MIT
