import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { teamsState } from '../../store/teams';
import { Team } from '../../types/teams';
import { getAPIUrl } from '../../utils/api';
import { API_TOKEN } from '../../envs';

interface TeamSettingsProps {
  team: Team;
}

export default function TeamSettings({ team }: TeamSettingsProps) {
  const [teams, setTeams] = useRecoilState(teamsState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const updatedTeam = {
      name: formData.get('name'),
      description: formData.get('description'),
    };

    try {
      const response = await fetch(getAPIUrl(`/teams/${team.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json',
        },
        body: JSON.stringify(updatedTeam),
      });

      if (!response.ok) {
        throw new Error('Failed to update team');
      }

      const updatedTeamData = await response.json();
      
      // Update teams state
      setTeams(teams.map(t => t.id === team.id ? updatedTeamData : t));
      setSuccess(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Team Settings</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-sm text-green-500">
            Team settings updated successfully
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Team Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={team.name}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={team.description}
            rows={3}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}