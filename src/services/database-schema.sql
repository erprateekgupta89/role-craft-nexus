
-- Users Table: Stores user information
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255),
  role VARCHAR(20) NOT NULL CHECK (role IN ('PM', 'PoM', 'AVP', 'VP', 'MR')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table: Stores project information
CREATE TABLE projects (
  project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  manager UUID REFERENCES users(id),
  lead UUID REFERENCES users(id),
  client VARCHAR(100) NOT NULL,
  mode VARCHAR(50) NOT NULL,
  delivery_model VARCHAR(100) NOT NULL,
  engagement_model VARCHAR(100) NOT NULL,
  effort_gt_30 BOOLEAN DEFAULT FALSE,
  rm UUID REFERENCES users(id),
  work_order_id VARCHAR(100),
  qa UUID REFERENCES users(id),
  dev_model VARCHAR(100) NOT NULL,
  meeting_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Team Members Table: Associates team members with projects
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  join_date TIMESTAMP WITH TIME ZONE NOT NULL,
  relieve_date TIMESTAMP WITH TIME ZONE,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Access Matrix Table: Defines access rights to assets for users
CREATE TABLE access_matrix (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  asset_name VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id),
  access_rights VARCHAR(50) NOT NULL CHECK (access_rights IN ('read', 'write', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Software Utilities Table: Tracks software used in projects
CREATE TABLE software_utilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  version VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Security Checklist Table: Security requirements for projects
CREATE TABLE security_checklist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  requirement_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed', 'not_applicable', 'in_progress')),
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Custom Checklists Table: Custom project checklists
CREATE TABLE custom_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  checklist_type VARCHAR(100) NOT NULL,
  parameters JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PAC Approval History Table: Project Approval Cycle history
CREATE TABLE pac_approval_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  version VARCHAR(20) NOT NULL,
  author UUID REFERENCES users(id),
  reviewer UUID REFERENCES users(id),
  approver UUID REFERENCES users(id),
  status VARCHAR(50) NOT NULL CHECK (status IN ('draft', 'under_review', 'approved', 'rejected')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PAC Versions Table: Tracks sealed/approved project versions
CREATE TABLE pac_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
  version VARCHAR(20) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('draft', 'sealed', 'deprecated')),
  sealed_by UUID REFERENCES users(id),
  sealed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE software_utilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE pac_approval_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE pac_versions ENABLE ROW LEVEL SECURITY;
