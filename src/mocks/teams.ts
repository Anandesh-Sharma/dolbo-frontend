export const mockTeams = [
  {
    id: '1',
    name: 'Engineering Team',
    description: 'Core engineering and development team',
    created_by: 'user1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    members: [
      {
        user_id: 'user1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        roles: 'OWNER',
        joined_at: '2024-01-01T00:00:00Z'
      },
      {
        user_id: 'user2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        roles: 'ADMIN',
        joined_at: '2024-01-02T00:00:00Z'
      },
      {
        user_id: 'user3',
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@example.com',
        roles: 'DEVELOPER',
        joined_at: '2024-01-03T00:00:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'UI/UX design and product team',
    created_by: 'user4',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    members: [
      {
        user_id: 'user4',
        first_name: 'Sarah',
        last_name: 'Wilson',
        email: 'sarah.wilson@example.com',
        roles: 'OWNER',
        joined_at: '2024-01-02T00:00:00Z'
      },
      {
        user_id: 'user5',
        first_name: 'Mike',
        last_name: 'Brown',
        email: 'mike.brown@example.com',
        roles: 'DEVELOPER',
        joined_at: '2024-01-03T00:00:00Z'
      }
    ]
  }
];