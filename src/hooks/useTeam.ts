import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { teamsState, selectedTeamIdState } from '../store/teams/atoms';
import { useNetwork } from './useNetwork';
import { Team, TeamMember } from '@/types/teams';

export function useTeam() {
  const [teams, setTeams] = useRecoilState(teamsState);
  const [selectedTeamId, setSelectedTeamId] = useRecoilState(selectedTeamIdState);
  const { makeRequest, isLoading, error } = useNetwork();

  const fetchTeams = useCallback(async () => {
    try {
      const {data} = await makeRequest<Team[]>({
        method: 'GET',
        url: '/teams/list',
      });
      if (!data) {
        throw new Error('Failed to fetch teams');
      }
      setTeams(data);
      
      if (!selectedTeamId && data.length > 0) {
        setSelectedTeamId(data[0].id);
      }
      
      return data;
    } catch (err) {
      console.error('Error fetching teams:', err);
      throw err;
    }
  }, [selectedTeamId, setSelectedTeamId, setTeams, makeRequest]);

  const addMember = useCallback(async (teamId: string, memberData: { 
    email: string; 
    firstName: string; 
    lastName: string; 
    role: string;
  }) => {
    try {
      const {data: newMember} = await makeRequest<TeamMember>({
        method: 'POST',
        url: `/teams/add_member?team_id=${teamId}`,
        data: memberData
      });
      if (!newMember) {
        throw new Error('Failed to add team member');
      }
      
      setTeams(prevTeams => prevTeams.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            members: [...team.members, newMember]
          };
        }
        return team;
      }));

      return newMember;
    } catch (err) {
      console.error('Error adding team member:', err);
      throw err;
    }
  }, [setTeams, makeRequest]);

  const removeMember = useCallback(async (teamId: string, memberId: string) => {
    try {
      await makeRequest({
        method: 'DELETE',
        url: `/teams/remove_member?team_id=${teamId}&member_id=${memberId}`,
      });

      setTeams(prevTeams => prevTeams.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            members: team.members.filter(member => member.user_id !== memberId)
          };
        }
        return team;
      }));

      return true;
    } catch (err) {
      console.error('Error removing team member:', err);
      throw err;
    }
  }, [setTeams, makeRequest]);

  return {
    teams,
    selectedTeamId,
    setSelectedTeamId,
    fetchTeams,
    addMember,
    removeMember,
    isLoading,
    error
  };
}
