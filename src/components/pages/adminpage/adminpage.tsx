import './adminpage.css';
import { useCallback, useContext, useEffect, useState } from "react";
import { URL_USERS } from "../../config/constants";
import { MyCloudContext } from "../../config/context";
import type { FetchParams, User } from "../../config/types";
import { useNavigate } from 'react-router';
import { DisplayUser } from './displayuser';


export const AdminPage = () => {
  const { baseUrls, token, isAuthorised, isAdmin, loading, error, setLoading, setError } = useContext(MyCloudContext);
  const [usersList, setUsersList] = useState<User[]>([]);
  const navigate = useNavigate();
  
  let baseUrl = '';
  let baseUrlMedia = '';
  if (baseUrls) {
    baseUrl = baseUrls.baseUrl
    baseUrlMedia = baseUrls.baseUrlMedia
  }

  const getUsers = useCallback(async () => {
    if (baseUrlMedia === '') {
      navigate('/');
      return;
    }

    const url = URL_USERS;
    const params: FetchParams = {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        } 
      };

    setLoading(true);
    try {
      const result = await fetch(baseUrl + url, params);

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
	  
      const users = await result.json();
      setUsersList(users.sort((a: User, b: User) => a.fullname.localeCompare(b.fullname)));
    } catch (err) {
      const myerr = err instanceof Error ? err : new Error(String(err));
      setError(myerr);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, baseUrlMedia, token, navigate, setError, setLoading, setUsersList])
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!isAuthorised) {
    navigate('/login');
    return <></>;
  }

  if (!isAdmin) {
    navigate('/main');
    return <></>;
  }

  return (
    <div className="users-box">
      {loading && <div className="message-page"><div className="loader"></div></div>}
      {error && <div className="message-page">
        <div className="error_msg" onClick={() => setError(null)}>
          {error.name}: {error.message}
        </div>
      </div>}
      <div className="user-row dark">
        {/* <div className="user-id">ID</div> */}
        <div className="user-username">Логин</div>
        <div className="user-admin">Админ</div>
        <div className="user-fullname">Полное имя</div>
        <div className="user-email">E-mail</div>
        <div className="user-directory">Хранилище</div>
        <div className="user-file-number">Файлов</div>
        <div className="user-file-volume">Занято</div>
        <div className="user-btn">&nbsp;</div>
        <div className="user-btn">&nbsp;</div>
        <div className="user-btn">&nbsp;</div>
      </div>
      {usersList.map(user => <DisplayUser key={user.id} {...{user, getUsers: getUsers}} />)}
    </div>
  )
}
