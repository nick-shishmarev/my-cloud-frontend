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

export interface IbaseUrls {
  baseUrl: string;
  baseUrlMedia: string;
}

export interface IMyCloudContext {
  baseUrls: IbaseUrls | null;
  isAuthorised: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: Error | null;
  currentUser: User | null;
  stockOwner: User | null;
  token: string;
  setIsAuthorised: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setStockOwner: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface FetchParams {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: BodyInit | null | undefined;
  headers?: HeadersInit | undefined;
}

