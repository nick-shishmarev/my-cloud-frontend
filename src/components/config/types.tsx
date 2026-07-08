export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegRequest {
  username: string;
  password: string;
  fullname: string;
  email: string;
}

export interface User {
  id?: string;
  username: string;
  fullname: string;
  email: string;
  is_staff: boolean;
  directory: string;
}

export interface IFile {
  id: string;
  original_name?: string;
  display_name?: string;
  size_bytes?: number;
  created_at?: number;
  downloaded_at?: number;
  comment?: string;
  public_url?: string;
}

export interface IMyCloudContext {
  isAuthorised: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: Error | null;
  token: string;
  setIsAuthorised: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface FetchParams {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: BodyInit | null | undefined;
  headers?: HeadersInit | undefined;
}

