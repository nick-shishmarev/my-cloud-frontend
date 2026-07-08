import './mycloud.css'
import { useState } from "react";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Outlet } from 'react-router';
import { Menu } from '../components/menu/menu';
import { MyCloudContext } from './config/context';

export const MyCloud = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthorised, setIsAuthorised] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  return (
    <MyCloudContext.Provider value={ {
      loading,
      error,
      isAuthorised,
      isAdmin,
      token,
      setLoading,
      setError,
      setIsAuthorised,
      setIsAdmin,
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
