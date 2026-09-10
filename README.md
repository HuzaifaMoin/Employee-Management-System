# Employee Management System

A full-stack employee management application with separate React and Express services. It supports role-based access for administrators and employees, employee records, attendance, leave applications, payslips, profile management, automated reminders, and email notifications.

## Features

### Administrators

- Sign in through the administrator flow.
- View dashboard statistics.
- Create, update, deactivate, and delete employee records.
- Create and view employee payslips.
- Review leave applications and approve or reject them.
- View attendance and employee information.
- Update the administrator password.

### Employees

- Sign in through the employee flow.
- View personal dashboard information.
- Check in and check out for attendance.
- View attendance history and statistics.
- Submit and track leave applications.
- View available payslips.
- Update profile information and password.

### Automated workflows

- Inngest functions can send attendance check-out reminders.
- Pending leave applications can trigger reminder emails to the administrator.
- A scheduled attendance workflow can email active employees who have not checked in and are not on approved leave.
- Nodemailer sends mail through the configured Brevo SMTP account.

## Technology Stack

- **Frontend:** React 19, React Router, Vite, Tailwind CSS, Axios, Lucide icons
- **Backend:** Node.js, Express 5, ES modules
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT and bcrypt
- **Background jobs:** Inngest
- **Email:** Nodemailer with Brevo SMTP
- **Deployment configuration:** Vercel configuration files are included for both services

## Project Structure

```text
.
├── client/                 React/Vite frontend
│   ├── public/             Static frontend assets
│   └── src/
│       ├── api/             Axios API client
│       ├── components/      Reusable UI components
│       ├── context/         Authentication context
│       ├── pages/           Routed application pages
│       └── assets/          Shared assets and local development data
├── server/                 Express backend
│   ├── config/              MongoDB and email configuration
│   ├── constants/           Shared server constants
│   ├── controllers/         Request handlers
│   ├── inngest/             Background functions
│   ├── middleware/          Authentication and authorization
│   ├── models/              Mongoose models
│   ├── routes/              API route definitions
│   ├── seed.js              Administrator account seed script
│   └── server.js            Express application entry point
├── jsconfig.json            JavaScript project configuration
└── README.md                Project documentation
```

## Prerequisites

Install the following before starting:

- Node.js 18 or newer
- npm
- A MongoDB database, local or hosted
- A Brevo SMTP account if email notifications are required
- An Inngest account or local Inngest development server if background functions are required

Check your versions:

```bash
node --version
npm --version
```

## Installation

The frontend and backend have separate package files and must be installed independently.

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Install frontend dependencies

Open a second terminal from the project root:

```bash
cd client
npm install
```

## Environment Variables

Create `server/.env` with the following values:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/employee-management-system
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
SMTP_USER=your-brevo-smtp-login
SMTP_PASS=your-brevo-smtp-key
SENDER_EMAIL=no-reply@example.com
```

### Server variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Express port. Defaults to `4000`. |
| `MONGODB_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign and verify seven-day JWT sessions. |
| `ADMIN_EMAIL` | Yes for seeding and reminders | Administrator email and the account created by the seed script. |
| `SMTP_USER` | Required for email | Brevo SMTP username. |
| `SMTP_PASS` | Required for email | Brevo SMTP password or SMTP key. |
| `SENDER_EMAIL` | Required for email | From address used by Nodemailer. |

Never commit `.env` files or real credentials. Use a long random value for `JWT_SECRET` in production.

### Frontend variables

Create `client/.env` only when the frontend and backend are served from different origins:

```env
VITE_BASE_URL=http://localhost:4000
```

The Axios client automatically appends `/api`, so this value must be the backend origin without a trailing `/api` path. When `VITE_BASE_URL` is omitted, the frontend calls relative paths such as `/api/auth/login`, which is suitable when a reverse proxy serves both applications from the same origin.

Restart the Vite server after changing any `VITE_*` variable.

## Database and Admin Setup

Make sure MongoDB is running and `MONGODB_URI` points to the intended database. Then create the first administrator:

```bash
cd server
npm run seed
```

The seed script creates an administrator with:

- Email: the value of `ADMIN_EMAIL`
- Initial password: `admin123`

Change this password immediately after the first login. Running the seed command again is safe when the account already exists; it will report that the user already exists.

Employees are created by an administrator from the application. The seed script does not create employee accounts.

## Running Locally

Start the API in one terminal:

```bash
cd server
npm run server
```

For a normal Node process instead of nodemon, use:

```bash
cd server
npm start
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

Verify the backend is running by opening:

```text
http://localhost:4000/
```

The response should be `Server is running`.

## Available Scripts

### Client

Run these commands from `client/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production frontend build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

### Server

Run these commands from `server/`:

| Command | Purpose |
| --- | --- |
| `npm run server` | Start the backend with nodemon. |
| `npm start` | Start the backend with Node. |
| `npm run seed` | Create the initial administrator account. |

## API Reference

All API routes are prefixed with `/api`. Protected routes require this header:

```http
Authorization: Bearer <jwt-token>
```

### Authentication

| Method | Path | Access | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Public | Log in an admin or employee. Body: `{ "email", "password", "role_type": "admin" \| "employee" }`. |
| `GET` | `/api/auth/session` | Authenticated | Return the current session. |
| `POST` | `/api/auth/change-password` | Authenticated | Change password. Body: `{ "currentPassword", "newPassword" }`. |

A successful login returns a JWT in `token`. The frontend stores this token in `localStorage` and sends it as a bearer token.

### Employees and dashboard

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/dashboard` | Authenticated | Return dashboard data for the current role. |
| `GET` | `/api/employees` | Admin | List employees. |
| `POST` | `/api/employees` | Admin | Create an employee and user account. |
| `PUT` | `/api/employees/:id` | Admin | Update an employee. |
| `DELETE` | `/api/employees/:id` | Admin | Delete or deactivate an employee according to server logic. |

### Profile and attendance

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/profile` | Authenticated | Get the current employee profile. |
| `POST` | `/api/profile` | Authenticated | Update the current profile. |
| `POST` | `/api/attendance` | Authenticated | Check in or check out. |
| `GET` | `/api/attendance` | Authenticated | Get attendance data for the current user or administrator. |

### Leave

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/leave` | Employee | Submit a future-dated leave application. |
| `GET` | `/api/leave` | Authenticated | List leave applications. Admins can filter with `?status=PENDING`, `APPROVED`, or `REJECTED`. |
| `PATCH` | `/api/leave/:id` | Admin | Update a leave status. Body: `{ "status": "APPROVED" \| "REJECTED" \| "PENDING" }`. |

### Payslips

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/payslips` | Admin | Create a payslip. |
| `GET` | `/api/payslips` | Admin | List payslips. |
| `GET` | `/api/payslips/:id` | Authenticated | Get a payslip by ID. |

### Inngest

| Method | Path | Purpose |
| --- | --- | --- |
| `GET`/`POST` | `/api/inngest` | Inngest serves and executes registered background functions. |

## Authentication and Roles

The backend accepts two login role values:

- `admin`, mapped to the `ADMIN` database role
- `employee`, mapped to the `EMPLOYEE` database role

Authentication is stateless. The server signs a JWT that expires after seven days. The client keeps the token in browser `localStorage`; logging out removes the token on the client.

Authorization is enforced in the backend, not only in the UI. Admin-only operations return `403` for employee sessions, and missing or invalid bearer tokens return `401`.

## Deployment

The repository contains separate Vercel configurations in `client/vercel.json` and `server/vercel.json`.

### Recommended deployment order

1. Provision MongoDB and collect the production connection string.
2. Deploy the server using the `server/` directory as the project root.
3. Add all server environment variables in the hosting provider.
4. Confirm the deployed API root returns `Server is running`.
5. Deploy the client using the `client/` directory as the project root.
6. Set `VITE_BASE_URL` to the deployed server origin when the client and API use different domains.
7. Configure Inngest to use the deployed `/api/inngest` endpoint if background workflows are enabled.
8. Configure the production SMTP credentials and verify that the sender address is authorized by Brevo.

The Vercel rewrite in the client configuration routes browser requests to `index.html` so React Router routes can load directly. Do not expose MongoDB, JWT, or SMTP secrets as frontend variables.

## Troubleshooting

### The client shows network errors

- Confirm the backend is running on port `4000`.
- If the client is separate from the API, set `VITE_BASE_URL=http://localhost:4000` in `client/.env`.
- Restart Vite after changing the environment file.
- Check the browser network tab for the final request URL.

### Login returns `401`

- Confirm the email exists in MongoDB.
- Use the matching role value: `admin` for an `ADMIN` user or `employee` for an `EMPLOYEE` user.
- Run `npm run seed` if the first admin account has not been created.
- Verify `JWT_SECRET` is set consistently for the running server.

### The server cannot connect to MongoDB

- Confirm MongoDB is running or the hosted cluster is reachable.
- Verify `MONGODB_URI` and any required network allowlist settings.
- Check that the `.env` file is in `server/`, next to `server.js` and `package.json`.

### Emails are not sent

- Confirm `SMTP_USER`, `SMTP_PASS`, and `SENDER_EMAIL` are present.
- Use a Brevo SMTP key rather than an unrelated API key.
- Verify the sender address in Brevo.
- Check the server logs and Inngest function runs.

### Background jobs do not run

- Confirm the deployed or local Inngest endpoint is reachable at `/api/inngest`.
- Make sure events are being sent by the server.
- Check Inngest logs for failed steps and inspect the server logs for MongoDB or SMTP errors.

## Security Notes

- Replace the seeded `admin123` password immediately.
- Use a unique, high-entropy `JWT_SECRET` for every production environment.
- Keep all server secrets out of source control and frontend environment variables.
- Restrict MongoDB network access in production.
- Use HTTPS in production so credentials and bearer tokens are encrypted in transit.
- Review SMTP and Inngest access credentials before sharing a deployment.

## License

No project license has been specified yet. Add a license before distributing this software publicly.
 
 ##Live Demo
 https://employee-management-system-6ylu.vercel.app/login