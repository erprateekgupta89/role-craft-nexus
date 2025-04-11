
# RoleCraft Nexus

A full-stack project management application with role-based access control, built with React and TypeScript.

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui component library
- Tanstack Query for data fetching and caching

### Backend (Integration Ready)
- Supabase for database, authentication and backend services
- Azure AD OAuth integration (via next-auth)

## Project Structure

The project follows a modular architecture:

```
src/
├── components/       # UI components
│   ├── layout/       # Layout components
│   └── ui/           # Shadcn UI components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API services
└── types/            # TypeScript types
```

## Database Schema

The application uses a PostgreSQL database with the following tables:

- **users**: Stores user information with role-based access control
- **projects**: Contains project details including management roles and delivery models
- **team_members**: Associates team members with projects
- **access_matrix**: Defines access rights to assets for users
- **software_utilities**: Tracks software used in projects
- **security_checklist**: Security requirements for projects
- **custom_checklists**: Custom project checklists
- **pac_approval_history**: Project Approval Cycle history
- **pac_versions**: Tracks sealed/approved project versions

Database schema and seed data can be found in `src/services/database-schema.sql` and `src/services/database-seed.sql`.

## Available Roles

The application supports the following user roles:

- **PM (Project Manager)**: Manages projects, tasks, and team assignments
- **PoM (Portfolio Manager)**: Oversees multiple projects and resource allocation
- **AVP/VP**: Executive view with strategic insights and reporting
- **MR (Market Requirements)**: Focuses on market analysis and requirements

Each role has customized views and permissions throughout the application.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the development server with `npm run dev`

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

- Azure AD credentials for authentication
- Supabase URL and anonymous key for backend services
- Additional configuration for the NestJS backend (if deploying separately)

## Connecting to Supabase

This project is designed to work with the Supabase native integration in Lovable. To set up the integration:

1. Click the green Supabase button in the top right of the Lovable interface
2. Connect to your Supabase project or create a new one
3. Once connected, run the database setup SQL files:
   - First run `src/services/database-schema.sql` to create the tables
   - Then run `src/services/database-seed.sql` to populate with sample data
4. The application will now have access to:
   - Database tables
   - Authentication
   - Storage
   - API functions

## Features

- Role-based access control with Azure AD authentication
- Project management with task tracking
- Team collaboration tools
- Reporting and analytics
- Responsive design for all devices

## License

This project is licensed under the MIT License.
