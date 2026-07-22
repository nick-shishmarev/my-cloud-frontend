import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MyCloudContext } from "../../config/context";
import { URL_USERS } from "../../config/constants";
import type { FetchParams, IFile, User } from "../../config/types";
import { fileSize } from "../../utilits/fileSize";

interface Props {
  user: User;
  getUsers: () => void;
}

export const DisplayUser = (props: Props) => {
  const { user, getUsers } = props;
  const {id, username, fullname, email, directory, is_staff} = user;
  const { baseUrls, token, currentUser, setLoading, setStockOwner } = useContext(MyCloudContext); 
  const navigate = useNavigate();
  const [fileNumber, setFileNumber] = useState<number>(0);
  const [fileVolume, setFileVolume] = useState<number>(0);
  const [userError, setUserError] = useState<Error | null>(null);
  const { baseUrl } = baseUrls!;

  const onDelete = async () => {
    if (currentUser!.id === id) {
      const error = new Error('Нельзя удалить самого себя!');
      setUserError(error);
      return;
    }
    setLoading(true);
    const url = `${URL_USERS}${id}`;
    const params: FetchParams = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      }
    };

    try {
      const result = await fetch(baseUrl + url, params);

      if (!result.ok) {
        if (result.status === 423) {
          throw new Error(`Отказ удаления: в хранилище пользователя остались файлы`);
        }
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      
      getUsers();

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setUserError(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    
    setLoading(true);

    (async () => {
      const url = `${URL_USERS}${id}/files`;
      const params: FetchParams = {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        } 
      };

      try {
        const result = await fetch(baseUrl + url, params);
        
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const files = await result.json() as IFile[];

        setFileNumber(files.length);

        const volume = files.reduce((sum, file) => {
          return sum +file.size_bytes!;
        }, 0);
        setFileVolume(volume);
        
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setUserError(error)
        
      } finally {
        setLoading(false);
      }
    })();
    }, [baseUrl, token, id, setUserError, setLoading, setFileVolume, setFileNumber]);

  const onAdminChange = async () => {
    if (currentUser!.id === id) {
      const error = new Error('Нельзя удалить статус администратора у самого себя!');
      setUserError(error);
      return;
    }
    setLoading(true);
    const staff = !is_staff;
    const url = `${URL_USERS}${id}`;
    const params: FetchParams = {
      method: "PATCH",
      body: JSON.stringify({ is_staff: staff }),
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const result = await fetch(baseUrl + url, params);
      if (result.ok) {
        getUsers();
      }

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setUserError(error);

    } finally {
      setLoading(false);
    }
  }

  const toFiles = () => {
    const owner = user;
    setStockOwner(owner);
    navigate('/main');
  }
 
  return (
    <>
      {userError && <div className="message-page">
        <div className="error_msg" onClick={() => setUserError(null)}>
          {userError.message}
        </div>
      </div>}
      <div className="user-row">
        {/* <div className="user-id">{id}</div> */}
        <div className="user-username">{username}</div>
        <div className="user-admin">{is_staff ? <p className='large'>&#10004;</p> : ''}</div>
        <div className="user-fullname">{fullname}</div>
        <div className="user-email">{email}</div>
        <div className="user-directory">{directory}</div>
        <div className="user-file-number">{fileNumber}</div>
        <div className="user-file-volume">{fileSize(fileVolume)}</div>
        <div className="user-btn large" title="К хранилищу" onClick={toFiles}>⬆️</div>
        <div className="user-btn large" onClick={onAdminChange} title="Администратор/Нет">&#9989;</div>
        <div className="user-btn large" onClick={onDelete} title="Удалить пользователя">&#10060;</div>
      </div>
    </>
  )
}
