export interface APIKey {
  id: string;
  team_id: string;
  user_id: string;
  key: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  expiry: string;
}

export interface CreateAPIKeyResponse extends APIKey {
  plain_text_key: string;
}

export interface CreateAPIKeyRequest {
  name: string;
  expiry: string;
}