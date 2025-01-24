import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { teamsState, selectedTeamIdState } from '../store/teams/atoms';
import { useNetwork } from './useNetwork';

export function useTeam() {
  const [teams, setTeams] = useRecoilState(teamsState);
  const [selectedTeamId, setSelectedTeamId] = useRecoilState(selectedTeamIdState);
  const { makeRequest, isLoading, error } = useNetwork();

  const fetchTeams = useCallback(async () => {
    try {
      const data = await makeRequest('/teams/list', 'GET');
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
      const newMember = await makeRequest(
        `/teams/add_member?team_id=${teamId}`,
        'POST',
        memberData
      );
      
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
      await makeRequest(
        `/teams/remove_member?team_id=${teamId}&member_id=${memberId}`,
        'DELETE'
      );

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
