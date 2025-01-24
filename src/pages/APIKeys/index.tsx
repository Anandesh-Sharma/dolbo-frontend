import React, { useEffect, useState } from 'react';
import { Copy, Key, Plus, Check, Trash2 } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { selectedTeamIdState } from '../../store/teams/atoms';
import { useApiKeys } from '../../hooks/useApiKeys';
import { CreateAPIKeyResponse } from '../../types/apiKeys';
import CreateKeyModal from './CreateKeyModal';
import ConfirmModal from '../../components/ConfirmModal';
import PageHeader from '../../components/PageHeader';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    ACTIVE: 'bg-green-500/10 text-green-500 border-green-500/20',
    INACTIVE: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    EXPIRED: 'bg-red-500/10 text-red-500 border-red-500/20',
  }[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

export default function APIKeys() {
  const selectedTeamId = useRecoilValue(selectedTeamIdState);
  const { cache, isLoading, error, fetchApiKeys, createApiKey, deleteApiKey } = useApiKeys();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKey, setNewKey] = useState<CreateAPIKeyResponse | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const apiKeys = selectedTeamId ? cache[selectedTeamId] || [] : [];

  useEffect(() => {
    if (selectedTeamId) {
      fetchApiKeys(selectedTeamId);
    }
  }, [selectedTeamId, fetchApiKeys]);

  const handleCreateKey = async (name: string, expiry: string) => {
    if (!selectedTeamId) return;
    
    try {
      const data = await createApiKey(selectedTeamId, name, expiry);
      setNewKey(data);
    } catch (err) {
      console.error('Error creating API key:', err);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!selectedTeamId) return;
    try {
      await deleteApiKey(selectedTeamId, keyId);
      setKeyToDelete(null);
    } catch (err) {
      console.error('Error deleting API key:', err);
    }
  };

  const copyToClipboard = async (key: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatKeyForDisplay = (key: string) => {
    const firstPart = key.slice(0, 8);
    const lastPart = key.slice(-4);
    return (
      <span className="font-mono">
        {firstPart}
        <span className="blur-[3px] mx-1 select-none">{'•'.repeat(24)}</span>
        {lastPart}
      </span>
    );
  };

  const CreateKeyButton = (
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      <Plus className="h-5 w-5 mr-2" />
      Create New Key
    </button>
  );

  if (isLoading && !apiKeys.length) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="API Keys"
          description="Manage your API keys and access tokens"
          action={CreateKeyButton}
        />
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
            <span>Loading API keys...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="API Keys"
        description="Manage your API keys and access tokens"
        action={CreateKeyButton}
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">
          {error}
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">Active API Keys</h3>
        </div>
        <div className="divide-y divide-gray-800">
          {apiKeys.map((key) => (
            <div key={key.id} className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex items-center space-x-3 w-[40%]">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Key className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate capitalize">{key.name}</p>
                    <p className="text-xs text-gray-400">
                      Expires on {new Date(key.expiry).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="w-[45%] px-4">
                  <div className="text-sm text-gray-400 font-mono truncate">
                    {formatKeyForDisplay(key.key)}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 w-[15%]">
                  <StatusBadge status={key.status} />
                  <button 
                    onClick={() => copyToClipboard(key.key, key.id)}
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200 group relative"
                    title="Copy API key"
                  >
                    {copiedKey === key.id ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    )}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {copiedKey === key.id ? 'Copied!' : 'Copy API key'}
                    </span>
                  </button>
                  <button
                    onClick={() => setKeyToDelete(key.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 group relative"
                  >
                    <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Delete key
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {apiKeys.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-400">
              No API keys found. Create one to get started.
            </div>
          )}
        </div>
      </div>

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewKey(null);
        }}
        onCreate={handleCreateKey}
        newKey={newKey}
      />

      <ConfirmModal
        isOpen={keyToDelete !== null}
        onClose={() => setKeyToDelete(null)}
        onConfirm={() => keyToDelete && handleDeleteKey(keyToDelete)}
        title="Delete API Key"
        message="Are you sure you want to delete this API key?"
        confirmText="This action cannot be undone and will immediately revoke access for applications using this key."
        confirmButtonText="Delete Key"
      />
    </div>
  );
}