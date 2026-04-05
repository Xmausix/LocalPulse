# LocalPulse

Information platform for the Polish local community.

## About

LocalPulse is a web application for aggregating and presenting local information for Polish communities. Built with React and TypeScript, with a focus on responsiveness, accessibility and clean user experience.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Radix UI) |
| Routing | React Router DOM v6 |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query |
| Authentication | Auth0 |
| Charts | Recharts |
| Unit Testing | Vitest + Testing Library |
| E2E Testing | Playwright |
| Package Manager | Bun / npm |

## Installation

```bash
git clone https://github.com/Xmausix/LocalPulse.git
cd LocalPulse

bun install
# or
npm install
```

## Development

```bash
bun dev
# or
npm run dev
```

Available at `http://localhost:5173`.

## Build

```bash
# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview
```

## Testing

```bash
# Unit tests
npm run test

# Unit tests in watch mode
npm run test:watch

# E2E tests
npx playwright test
```

## Linting

```bash
npm run lint
```

## Project Structure

```
LocalPulse/
├── public/
├── src/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── playwright.config.ts
└── vitest.config.ts
```

## Authentication

Auth0 is used for authentication and session management. Create a `.env` file in the project root:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

Private repository. All rights reserved.