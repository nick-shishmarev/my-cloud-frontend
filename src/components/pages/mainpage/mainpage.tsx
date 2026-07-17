import './mainpage.css';
import { useCallback, useContext, useEffect, useState } from "react";
import { MyCloudContext } from "../../config/context";
import { URL_FILES, URL_USERS } from '../../config/constants';
import type { IFile, User, FetchParams } from '../../config/types';
import { useNavigate } from 'react-router';
import { DisplayFile } from './displayfile';


export const MainPage = () => {
  const { BASE_URL,  
    token, 
    stockOwner, 
    currentUser, 
    error, 
    loading, 
    isAuthorised, 
    isAdmin,
    setStockOwner, 
    setLoading, 
    setError 
  } = useContext(MyCloudContext);
    
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<IFile[]>([]);

  const getFiles = useCallback(async () => {
    let url;

    if (isAdmin) {
      url = URL_USERS  + stockOwner!.id + '/files';
    } else {
      url = URL_FILES;
    }

    const params: FetchParams = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      } 
    };

    setLoading(true);

    try {
      const result = await fetch(BASE_URL + url, params);

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const files = await result.json();

      if (files && files.length > 0) {
        files.sort((a: IFile, b:IFile) => a.original_name!.localeCompare(b.original_name!));
      }
      setFileList(files);

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error)

    } finally {
      setLoading(false);
    }
  }, [BASE_URL, stockOwner, isAdmin, token, setError, setLoading])

  const addFile = () => {
    navigate('/upload');
  }

  const returnToOwn = () => {
    const user: User = {...currentUser!};
    setStockOwner(user);
  }

  useEffect(() => {
    getFiles();
  }, [stockOwner, getFiles]);
    
  if (!isAuthorised) {
    navigate('/login');
    return <></>;
  }

  return (
    <div className="main-page">
      {loading && <div className="message-page"><div className="loader"></div></div>}
      {error && <div className="message-page">
        <div className="error_msg" onClick={() => setError(null)}>
          {error.name}: {error.message}
        </div>
      </div>}
      <div className="main-header">
        <div className="main-title">Хранилище: {stockOwner?.fullname}</div>
        {currentUser!.id !== stockOwner!.id && 
        <div className="main-add-btn" onClick={returnToOwn}>Вернуться в своё хранилище</div>}
        {currentUser!.id === stockOwner!.id &&
          <div className="main-add-btn" onClick={addFile}>Добавить файл</div>}
      </div>
      <div className="main-box">
        <div className="main-box-header">
          <div className="file-name">Имя файла</div>
          <div className="file-size">Размер файла</div>
          <div className="file-comment">Комментарий</div>
          <div className="file-date">Загружен</div>
          <div className="file-date">Последняя выгрузка</div>
          <div className="file-btn"></div>
          <div className="file-btn"></div>
          <div className="file-btn"></div>
          <div className="file-btn"></div>
          <div className="file-btn"></div>
        </div>
        <div>
          {fileList.length === 0 && <div>Хранилище пока пусто</div>}
          {fileList.map(file => <DisplayFile key={file.id} {...{file, getFiles}}/>)} 
        </div>
      </div>
    </div>
  )
}
