import React, { useState, useEffect } from 'react';
import { Clock, X, Loader2 } from 'lucide-react';
import { Team } from '../../../types/teams';
import { getAPIUrl } from '../../../utils/api';
import { API_TOKEN } from '../../../envs';

interface PendingInvite {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface PendingInvitesProps {
  team: Team;
}

export default function PendingInvites({ team }: PendingInvitesProps) {
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetch(
          getAPIUrl(`/teams/${team.id}/invites`),
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch invites');
        }

        const data = await response.json();
        setInvites(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch invites');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvites();
  }, [team.id]);

  const handleCancelInvite = async (inviteId: string) => {
    try {
      const response = await fetch(
        getAPIUrl(`/teams/${team.id}/invites/${inviteId}`),
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel invitation');
      }

      setInvites(invites.filter(invite => invite.id !== inviteId));
    } catch (error) {
      console.error('Error canceling invitation:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Loading invites...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Pending Invites</h3>
      </div>
      {invites.length > 0 ? (
        <div className="divide-y divide-gray-700">
          {invites.map((invite) => (
            <div key={invite.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{invite.email}</div>
                    <div className="text-sm text-gray-400">
                      Invited as {invite.role} • {new Date(invite.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelInvite(invite.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-8 text-center text-gray-400">
          No pending invites
        </div>
      )}
    </div>
  );
}