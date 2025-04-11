
# RoleCraft Nexus

A full-stack project management application with role-based access control, built with React, TypeScript, and Supabase.

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui component library
- Tanstack Query for data fetching and caching

### Backend
- Supabase for database, authentication and backend services
- PostgreSQL database
- Row-Level Security (RLS) policies for data protection

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
├── types/            # TypeScript types
└── integrations/     # External service integrations
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

- Supabase URL and anonymous key for backend services

## Features

- Role-based access control
- Project management with task tracking
- Team collaboration tools
- Reporting and analytics
- Responsive design for all devices

## Acknowledgments

This project uses the following open source libraries:
- [React](https://reactjs.org/) - UI library
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tanstack Query](https://tanstack.com/query) - Data fetching library
- [Lucide React](https://lucide.dev/) - Icon library

## License

This project is licensed under the MIT License.
