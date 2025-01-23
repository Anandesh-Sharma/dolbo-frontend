import { selector } from 'recoil';
import { teamsState, selectedTeamIdState } from './atoms';

export const selectedTeamState = selector({
  key: 'selectedTeamState',
  get: ({ get }) => {
    const teams = get(teamsState);
    const selectedId = get(selectedTeamIdState);
    return teams.find(team => team.id === selectedId);
  },
});

export const teamMembersState = selector({
  key: 'teamMembersState',
  get: ({ get }) => {
    const selectedTeam = get(selectedTeamState);
    return selectedTeam?.members || [];
  },
});

export const isTeamAdminState = selector({
  key: 'isTeamAdminState',
  get: ({ get }) => {
    const selectedTeam = get(selectedTeamState);
    const members = selectedTeam?.members || [];
    return members.some(
      (member) => member.roles === 'ADMIN' || member.roles === 'OWNER'
    );
  },
});