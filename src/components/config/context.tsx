import { createContext } from "react";
import type { IMyCloudContext } from "./types";

const initialState: IMyCloudContext = {
  BASE_URL: '',
  loading: false,
  error: null,
  isAuthorised: true,
  isAdmin: true,
  currentUser: null,
  stockOwner: null,
  token: '',
  setLoading: () => {},
  setError: () => {},
  setIsAuthorised: () => {},
  setIsAdmin: () => {},
  setCurrentUser: () => {},
  setStockOwner: () => {},
  setToken: () => {},
};

export const MyCloudContext = createContext<IMyCloudContext>(initialState);
