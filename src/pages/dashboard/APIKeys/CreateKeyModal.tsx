import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { X, Copy, Key, Loader2 } from 'lucide-react';
import { CreateAPIKeyResponse } from '../../../types/apiKeys';

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

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, expiry: string) => Promise<void>;
  newKey: CreateAPIKeyResponse | null;
}

export default function CreateKeyModal({
  isOpen,
  onClose,
  onCreate,
  newKey
}: CreateKeyModalProps) {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().slice(0, 16);
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreate(name, expiry);
      // Reset form
      setName('');
      setExpiry(() => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString().slice(0, 16);
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Create API Key"
    >
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Create New API Key</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {newKey ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3 text-green-500 bg-green-500/10 p-3 rounded-lg">
              <Key className="h-5 w-5" />
              <span className="text-sm font-medium">API Key Created Successfully</span>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Your API Key (copy it now, you won't see it again)
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 p-3 bg-gray-900/50 rounded-lg text-sm text-gray-300 font-mono break-all">
                  {newKey.plain_text_key}
                </code>
                <button
                  onClick={() => copyToClipboard(newKey.plain_text_key)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Development Key"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiry Date (defaults to 30 days)
              </label>
              <input
                type="datetime-local"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={new Date().toISOString().slice(0, 16)}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Key'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}