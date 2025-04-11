
-- Seed Users data
INSERT INTO users (id, name, email, image, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'John Doe', 'john.doe@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', 'PM'),
  ('22222222-2222-2222-2222-222222222222', 'Jane Smith', 'jane.smith@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', 'PoM'),
  ('33333333-3333-3333-3333-333333333333', 'Michael Johnson', 'michael.johnson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', 'AVP'),
  ('44444444-4444-4444-4444-444444444444', 'Emily Brown', 'emily.brown@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', 'VP'),
  ('55555555-5555-5555-5555-555555555555', 'Robert Wilson', 'robert.wilson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', 'MR'),
  ('66666666-6666-6666-6666-666666666666', 'Sarah Davis', 'sarah.davis@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 'PM'),
  ('77777777-7777-7777-7777-777777777777', 'David Miller', 'david.miller@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', 'PM'),
  ('88888888-8888-8888-8888-888888888888', 'Lisa Garcia', 'lisa.garcia@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', 'PoM'),
  ('99999999-9999-9999-9999-999999999999', 'Thomas Rodriguez', 'thomas.rodriguez@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas', 'MR'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jennifer Martinez', 'jennifer.martinez@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer', 'AVP');

-- Seed Projects data
INSERT INTO projects (project_id, name, manager, lead, client, mode, delivery_model, engagement_model, effort_gt_30, rm, work_order_id, qa, dev_model, meeting_date) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'E-Commerce Platform Redesign', '11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 'RetailCorp', 'Agile', 'Offshore', 'Fixed Price', TRUE, '22222222-2222-2222-2222-222222222222', 'WO-2023-001', '99999999-9999-9999-9999-999999999999', 'Scrum', '2023-05-15T10:00:00Z'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Healthcare Management System', '77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'MedLife Inc.', 'Waterfall', 'Onsite', 'Time & Material', FALSE, '88888888-8888-8888-8888-888888888888', 'WO-2023-002', '99999999-9999-9999-9999-999999999999', 'DevOps', '2023-06-20T14:30:00Z'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Mobile Banking App', '66666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'GlobalBank', 'Hybrid', 'Nearshore', 'Fixed Price', TRUE, '22222222-2222-2222-2222-222222222222', 'WO-2023-003', '99999999-9999-9999-9999-999999999999', 'Kanban', '2023-07-10T09:15:00Z'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Smart City Infrastructure', '11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'MetroGov', 'Agile', 'Remote', 'Time & Material', TRUE, '88888888-8888-8888-8888-888888888888', 'WO-2023-004', '99999999-9999-9999-9999-999999999999', 'SAFe', '2023-08-05T11:00:00Z'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Enterprise Resource Planning', '77777777-7777-7777-7777-777777777777', '66666666-6666-6666-6666-666666666666', 'IndustryCorp', 'Waterfall', 'Hybrid', 'Fixed Price', FALSE, '22222222-2222-2222-2222-222222222222', 'WO-2023-005', '99999999-9999-9999-9999-999999999999', 'Traditional', '2023-09-12T13:45:00Z');

-- Seed Team Members data
INSERT INTO team_members (project_id, name, role, join_date, relieve_date, remarks) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Alex Johnson', 'Frontend Developer', '2023-05-20T00:00:00Z', NULL, 'React specialist'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Maya Patel', 'Backend Developer', '2023-05-20T00:00:00Z', NULL, 'Node.js expert'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Carlos Rodriguez', 'UI/UX Designer', '2023-05-25T00:00:00Z', '2023-08-15T00:00:00Z', 'Completed initial design phase'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Emma Wilson', 'Database Architect', '2023-06-25T00:00:00Z', NULL, 'PostgreSQL specialist'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'James Chen', 'Full Stack Developer', '2023-06-25T00:00:00Z', NULL, 'TypeScript expert'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Sophia Kim', 'Mobile Developer', '2023-07-15T00:00:00Z', NULL, 'React Native specialist'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Lucas Brown', 'Backend Developer', '2023-07-15T00:00:00Z', NULL, 'API expert'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Olivia Davis', 'IoT Specialist', '2023-08-10T00:00:00Z', NULL, 'Sensor integration expert'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Noah Taylor', 'Cloud Engineer', '2023-08-10T00:00:00Z', NULL, 'AWS certified'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Ethan Martinez', 'Business Analyst', '2023-09-15T00:00:00Z', NULL, 'Process optimization expert');

-- Seed Access Matrix data
INSERT INTO access_matrix (project_id, asset_name, user_id, access_rights) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Source Code Repository', '11111111-1111-1111-1111-111111111111', 'admin'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Source Code Repository', '66666666-6666-6666-6666-666666666666', 'write'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Project Documentation', '22222222-2222-2222-2222-222222222222', 'read'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Database Server', '77777777-7777-7777-7777-777777777777', 'admin'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Client Portal', '11111111-1111-1111-1111-111111111111', 'write'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Mobile App Store Account', '66666666-6666-6666-6666-666666666666', 'admin'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'IoT Device Management', '11111111-1111-1111-1111-111111111111', 'admin'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Cloud Infrastructure', '77777777-7777-7777-7777-777777777777', 'write'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'ERP System', '77777777-7777-7777-7777-777777777777', 'admin'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Data Warehouse', '66666666-6666-6666-6666-666666666666', 'write');

-- Seed Software Utilities data
INSERT INTO software_utilities (project_id, title, company, version, type, remarks) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Visual Studio Code', 'Microsoft', '1.78.0', 'Development IDE', 'Primary development environment'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Adobe XD', 'Adobe', '55.0', 'Design Tool', 'UI/UX prototyping'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'PostgreSQL', 'PostgreSQL Global Development Group', '15.3', 'Database', 'Primary data store'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Jira', 'Atlassian', '9.5', 'Project Management', 'Task tracking'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Android Studio', 'Google', '2022.3.1', 'Development IDE', 'Android app development'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'XCode', 'Apple', '14.3', 'Development IDE', 'iOS app development'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'AWS IoT Core', 'Amazon', '2023', 'Cloud Service', 'IoT device management'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Terraform', 'HashiCorp', '1.5.0', 'Infrastructure as Code', 'Cloud infrastructure provisioning'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'SAP ERP', 'SAP', '2023 Q2', 'Enterprise Software', 'Core ERP system'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Power BI', 'Microsoft', '2023', 'Business Intelligence', 'Reporting and analytics');

-- Seed Security Checklist data
INSERT INTO security_checklist (project_id, category, requirement_type, status, remarks) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Authentication', 'Multi-factor Authentication', 'completed', 'Implemented SMS and email verification'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Data Protection', 'Encryption at Rest', 'in_progress', 'Implementing AES-256 encryption'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Access Control', 'Role-based Access Control', 'completed', 'Five distinct roles implemented'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Compliance', 'HIPAA Compliance', 'in_progress', 'Working on data anonymization'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Mobile Security', 'App Transport Security', 'completed', 'TLS 1.3 implemented'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Authentication', 'Biometric Authentication', 'completed', 'Fingerprint and Face ID implemented'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'IoT Security', 'Secure Boot', 'in_progress', 'Implementing firmware verification'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Network Security', 'Firewall Configuration', 'completed', 'Rules set up for all environments'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Data Protection', 'Data Masking', 'pending', 'To be implemented for production data'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Compliance', 'SOX Compliance', 'not_applicable', 'Not required for this project');

-- Seed Custom Checklists data
INSERT INTO custom_checklists (project_id, checklist_type, parameters) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Code Review', '{
    "items": [
      {"name": "Code follows style guide", "mandatory": true},
      {"name": "Unit tests present", "mandatory": true},
      {"name": "Documentation updated", "mandatory": false}
    ]
  }'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Deployment', '{
    "items": [
      {"name": "Database backup completed", "mandatory": true},
      {"name": "Change request approved", "mandatory": true},
      {"name": "Rollback plan documented", "mandatory": true}
    ]
  }'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'App Store Submission', '{
    "items": [
      {"name": "Screenshots prepared", "mandatory": true},
      {"name": "Privacy policy updated", "mandatory": true},
      {"name": "Marketing materials ready", "mandatory": false}
    ]
  }'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'IoT Device Testing', '{
    "items": [
      {"name": "Power consumption test", "mandatory": true},
      {"name": "Signal strength test", "mandatory": true},
      {"name": "Environmental durability test", "mandatory": true}
    ]
  }'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Integration Testing', '{
    "items": [
      {"name": "Interface contracts validated", "mandatory": true},
      {"name": "Performance benchmarks met", "mandatory": true},
      {"name": "Error handling verified", "mandatory": true}
    ]
  }');

-- Seed PAC Approval History data
INSERT INTO pac_approval_history (project_id, version, author, reviewer, approver, status, description) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '1.0.0', '66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'approved', 'Initial project approval'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '1.1.0', '66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'approved', 'Feature addition: shopping cart'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '1.0.0', '11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'approved', 'Initial healthcare system approval'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '1.0.1', '11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'under_review', 'Security enhancements'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '1.0.0', '77777777-7777-7777-7777-777777777777', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'approved', 'Initial mobile app approval'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1.0.0', '77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'approved', 'Initial smart city infrastructure approval'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1.1.0', '77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'draft', 'Traffic monitoring enhancement'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '1.0.0', '66666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'rejected', 'Initial ERP plan - scope issues'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '1.0.1', '66666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'approved', 'Revised ERP implementation plan');

-- Seed PAC Versions data
INSERT INTO pac_versions (project_id, version, status, sealed_by, sealed_at) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '1.0.0', 'sealed', '22222222-2222-2222-2222-222222222222', '2023-05-25T09:30:00Z'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '1.1.0', 'sealed', '22222222-2222-2222-2222-222222222222', '2023-06-15T11:45:00Z'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '1.0.0', 'sealed', '33333333-3333-3333-3333-333333333333', '2023-07-05T10:15:00Z'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '1.0.1', 'draft', NULL, NULL),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '1.0.0', 'sealed', '33333333-3333-3333-3333-333333333333', '2023-07-25T14:20:00Z'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1.0.0', 'sealed', '44444444-4444-4444-4444-444444444444', '2023-08-20T16:10:00Z'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1.1.0', 'draft', NULL, NULL),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '1.0.0', 'deprecated', '44444444-4444-4444-4444-444444444444', '2023-09-25T13:30:00Z'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '1.0.1', 'sealed', '44444444-4444-4444-4444-444444444444', '2023-10-10T15:45:00Z');
