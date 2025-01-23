import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserPlus } from 'lucide-react';
import { selectedTeamState } from '../../../store/teams/selectors';
import TeamMembers from './TeamMembers';
import AddMemberModal from './AddMemberModal';
import PageHeader from '../../../components/PageHeader';

export default function Team() {
  const selectedTeam = useRecoilValue(selectedTeamState);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const AddMemberButton = (
    <button
      onClick={() => setIsAddModalOpen(true)}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      <UserPlus className="h-5 w-5 mr-2" />
      Add Member
    </button>
  );

  if (!selectedTeam) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Team"
          description="Manage your team members and roles"
        />
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p>No team selected</p>
            <p className="text-sm">Please select a team to manage members</p>
          </div>
        </div>
      </div>
    );
  }

  // Get a default description based on the team's purpose
  const getDefaultDescription = (teamName: string) => {
    const lowercaseName = teamName.toLowerCase();
    if (lowercaseName.includes('engineering') || lowercaseName.includes('dev')) {
      return 'Technical team responsible for development and engineering tasks';
    }
    if (lowercaseName.includes('design')) {
      return 'Creative team focused on user interface and experience design';
    }
    if (lowercaseName.includes('marketing')) {
      return 'Team dedicated to marketing and growth initiatives';
    }
    if (lowercaseName.includes('sales')) {
      return 'Team focused on sales and customer acquisition';
    }
    if (lowercaseName.includes('support')) {
      return 'Customer support and success team';
    }
    return 'Collaborative team working together to achieve shared goals and objectives';
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={selectedTeam.name}
        description={selectedTeam.description || getDefaultDescription(selectedTeam.name)}
        action={AddMemberButton}
      />

      <TeamMembers team={selectedTeam} />

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        team={selectedTeam}
      />
    </div>
  );
}