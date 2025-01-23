import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Users, Plus, ChevronDown, Loader2 } from 'lucide-react';
import { teamsState, selectedTeamIdState } from '../store/teams/atoms';
import CreateTeamModal from './CreateTeamModal';
import { useTeam } from '../hooks/useTeam';

export default function TeamSelector() {
  const [teams, setTeams] = useRecoilState(teamsState);
  const [selectedTeamId, setSelectedTeamId] = useRecoilState(selectedTeamIdState);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { fetchTeams } = useTeam();

  // Only fetch teams on initial mount
  useEffect(() => {
    const loadTeams = async () => {
      if (teams.length === 0) {  // Only fetch if we don't have teams data
        setIsLoading(true);
        try {
          await fetchTeams();
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load teams');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTeams();
  }, []); // Empty dependency array - only run on mount

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (error) {
    return (
      <div className="text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading teams...</span>
      </div>
    );
  }

  const selectedTeam = teams.find(team => team.id === selectedTeamId);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg text-white transition-colors duration-200"
        >
          <div className="flex items-center min-w-0">
            <div className="w-6 h-6 bg-blue-500/10 rounded flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <span className="ml-2 font-medium truncate">
              {selectedTeam?.name || 'Select Team'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
            <div className="py-1">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center ${
                    team.id === selectedTeamId
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  <span className="truncate">{team.name}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-700">
              <button
                onClick={() => {
                  setIsCreateModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:bg-gray-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Team
              </button>
            </div>
          </div>
        )}
      </div>

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}