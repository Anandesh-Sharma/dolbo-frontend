export interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  role: string;
  added_by: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  members: TeamMember[];
}