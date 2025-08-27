# weight-tracker

A weight tracking web application scaffolded with Node.js, Vue 3, and MySQL.

## Features

- Light and dark themes adjustable in the user settings.
- Daily food tracker with calorie totals and remaining allowance based on profile info.
- User settings page to adjust height, gender, and daily calorie cut.
- Role-based access control with admin-only error log view and ability to clear logs.

## Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Registration

New user registration requires height (inches) and gender. These values and a daily calorie cut can be updated later on the settings page.

### Docker
```bash
docker-compose up
```
