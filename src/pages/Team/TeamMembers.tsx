import React, { useState } from 'react';
import { User, MoreVertical, Shield, Star, Trash2, Users } from 'lucide-react';
import { Team } from '../../types/teams';
import { useTeam } from '../../hooks/useTeam';
import ConfirmModal from '../../components/ConfirmModal';

interface TeamMembersProps {
  team: Team;
}

const RoleBadge = ({ role }: { role: string }) => {
  const roleConfig = {
    OWNER: {
      icon: Star,
      text: 'Owner',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/20'
    },
    ADMIN: {
      icon: Shield,
      text: 'Admin',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500/20'
    },
    DEVELOPER: {
      icon: Users,
      text: 'Developer',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-500',
      borderColor: 'border-emerald-500/20'
    }
  }[role] || {
    icon: User,
    text: role,
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-400',
    borderColor: 'border-gray-500/20'
  };

  const Icon = roleConfig.icon;

  return (
    <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${roleConfig.bgColor} ${roleConfig.borderColor}`}>
      <Icon className={`h-3.5 w-3.5 ${roleConfig.textColor}`} />
      <span className={`text-xs font-medium ${roleConfig.textColor}`}>
        {roleConfig.text}
      </span>
    </div>
  );
};

export default function TeamMembers({ team }: TeamMembersProps) {
  const [showActions, setShowActions] = useState<string | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { removeMember } = useTeam();

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
    
    setIsLoading(true);
    try {
      await removeMember(team.id, memberToRemove.id);
      setShowActions(null);
      setMemberToRemove(null);
    } catch (error) {
      console.error('Error removing team member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">Team Members</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {team.members.map((member) => (
            <div key={member.user_id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {member.first_name} {member.last_name}
                    </div>
                    <div className="text-sm text-gray-400">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <RoleBadge role={member.role} />
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(
                        showActions === member.user_id ? null : member.user_id
                      )}
                      className="p-2 text-gray-400 hover:text-white transition-colors duration-200 group relative"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        More actions
                      </span>
                    </button>
                    {showActions === member.user_id && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-700 z-50">
                        <button
                          onClick={() => {
                            setMemberToRemove({
                              id: member.user_id,
                              name: `${member.first_name} ${member.last_name}`
                            });
                            setShowActions(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center group"
                        >
                          <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          Remove from Team
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {team.members.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-400">
              No team members found. Add members to get started.
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={memberToRemove !== null}
        onClose={() => setMemberToRemove(null)}
        onConfirm={handleRemoveMember}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${memberToRemove?.name} from the team?`}
        confirmText="This action cannot be undone."
        confirmButtonText="Remove Member"
      />
    </>
  );
}