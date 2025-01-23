import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { X, Loader2, Users, CheckCircle } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { teamsState, selectedTeamIdState } from '../store/teams';
import { getAPIUrl } from '../utils/api';
import { API_TOKEN } from '../envs';

if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)',
    zIndex: 50,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '32rem',
    width: '100%',
    padding: 0,
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: 'transparent',
  },
};

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTeamModal({
  isOpen,
  onClose,
}: CreateTeamModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teams, setTeams] = useRecoilState(teamsState);
  const [, setSelectedTeamId] = useRecoilState(selectedTeamIdState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
    };

    try {
      const response = await fetch(getAPIUrl('/teams/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      const newTeam = await response.json();
      
      // Update teams state
      const updatedTeams = [...teams, newTeam];
      setTeams(updatedTeams);
      setSelectedTeamId(newTeam.id);
      setSuccess(true);

      // Close modal after showing success state
      setTimeout(() => {
        onClose();
        // Reset states after modal is closed
        setTimeout(() => {
          setSuccess(false);
          setIsLoading(false);
          if (formRef.current) {
            formRef.current.reset();
          }
        }, 300);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Create New Team"
    >
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Create New Team</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-500">
              {error}
            </div>
          )}

          {success ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Team Created Successfully!</h3>
              <p className="text-sm text-gray-400">You can now start adding members to your team.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Engineering Team"
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
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your team"
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Team...
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      Create Team
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}