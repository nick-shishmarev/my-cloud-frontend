import './mycloud.css'
import { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Outlet } from 'react-router';
import { Menu } from '../components/menu/menu';
import { MyCloudContext } from './config/context';
import type { IbaseUrls, User } from './config/types';
import { getBaseUrl } from './utilits/getbaseurl';

export const MyCloud = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthorised, setIsAuthorised] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [stockOwner, setStockOwner] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const [baseUrls, setBaseUrls] = useState<IbaseUrls>({baseUrl: '', baseUrlMedia: ''});

  useEffect(() => {
    getBaseUrl(setBaseUrls);
  },[]);

  return (
    <MyCloudContext.Provider value={ {
      baseUrls,
      loading,
      error,
      isAuthorised,
      isAdmin,
      currentUser,
      stockOwner,
      token,
      setLoading,
      setError,
      setIsAuthorised,
      setIsAdmin,
      setCurrentUser,
      setStockOwner,
      setToken,
    } }>
      <div className="main">
        <Menu />
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </MyCloudContext.Provider>
  )
}
