// src/hooks/useTeam.ts

import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { teamsState, selectedTeamIdState } from '../store/teams/atoms';
import { getAPIUrl } from '../utils/api';
import { API_TOKEN } from '../envs';

export function useTeam() {
  const [teams, setTeams] = useRecoilState(teamsState);
  const [selectedTeamId, setSelectedTeamId] = useRecoilState(selectedTeamIdState);

  const fetchTeams = useCallback(async () => {
    try {
      const response = await fetch(getAPIUrl('/teams/list'), {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json',
          "ngrok-skip-browser-warning": "69420"
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }

      const data = await response.json();
      setTeams(data);
      
      if (!selectedTeamId && data.length > 0) {
        setSelectedTeamId(data[0].id);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }, [selectedTeamId, setSelectedTeamId, setTeams]);

  const addMember = useCallback(async (teamId: string, data: { 
    email: string; 
    firstName: string; 
    lastName: string; 
    role: string;
  }) => {
    try {
      const response = await fetch(getAPIUrl(`/teams/add_member?team_id=${teamId}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add team member');
      }

      const newMember = await response.json();
      
      // Update teams state with new member
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
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  }, [setTeams]);

  const removeMember = useCallback(async (teamId: string, memberId: string) => {
    try {
      const response = await fetch(
        getAPIUrl(`/teams/remove_member?team_id=${teamId}&member_id=${memberId}`),
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove team member');
      }

      // Update teams state by removing the member
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
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  }, [setTeams]);

  return {
    teams,
    selectedTeamId,
    setSelectedTeamId,
    fetchTeams,
    addMember,
    removeMember,
  };
}
