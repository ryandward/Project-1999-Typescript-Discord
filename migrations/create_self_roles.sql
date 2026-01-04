-- Create self_roles table for self-assignable roles
CREATE TABLE IF NOT EXISTS self_roles (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT UNIQUE NOT NULL,
    role_name TEXT NOT NULL,
    description TEXT
);

CREATE INDEX IF NOT EXISTS idx_self_roles_role_id ON self_roles(role_id);
