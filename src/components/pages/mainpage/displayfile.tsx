import { useContext, useState } from "react";
import { MyCloudContext } from "../../config/context";
import { URL_FILES } from "../../config/constants";
import type { FetchParams, IFile } from "../../config/types";
import { fileSize } from "../../utilits/fileSize";

interface Props {
  file: IFile;
  getFiles: () => void;
}

export const DisplayFile = (props: Props) => {
  const { file, getFiles } = props;
  const { BASE_URL, token, error, setLoading, setError } = useContext(MyCloudContext);
  const [newName, setNewName] = useState<string>('');
  const [newСomment, setNewСomment] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const { display_name, size_bytes, comment, created_at, downloaded_at } = file;
  const dateCreated = new Date(created_at!).toLocaleString('ru-RU');
  
  let dateDownloaded = '';
  if (downloaded_at) {
    dateDownloaded = new Date(downloaded_at).toLocaleString('ru-RU')
  }

  let publicLink = '';
  if (file.public_url) {
    if (!file.public_url.startsWith('http')) {
      publicLink = BASE_URL + file.public_url!;
    } else {
      publicLink = file.public_url!;
    }
  }

  const onDelete = async () => {
    const url = URL_FILES + file.id +'/';
    const params: FetchParams = {
      method: "DELETE", 
      headers: {
        "Authorization": `Token ${token}`
      } 
    };

    setLoading(true);

    try {
      const result = await fetch(BASE_URL + url, params);

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      getFiles();

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const onDownLoad = async () => {
    const url = URL_FILES + file.id +'/download';
    const params: FetchParams = {
      method: "GET", 
      headers: {
        "Authorization": `Token ${token}`
      } 
    };

    const result = await fetch(BASE_URL + url, params);

    if (!result.ok) throw new Error('Не удалось скачать файл');

    const blob = await result.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = file.display_name!;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
    getFiles();
  }

  const onSave = async () => {
    const url = URL_FILES + file.id +'/';
    const params: FetchParams = {
      method: "PATCH",
      body: JSON.stringify({display_name: newName, comment: newСomment}), 
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

      setNewName('');
      getFiles();

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);

    } finally {
      setLoading(false);
    }
  }

  const onRename = async () => {
    setNewName(display_name!);
    setNewСomment(comment!);
  }

  const onCopyLink = async () => {
    if (publicLink === '') return;

    try {
      await navigator.clipboard.writeText(publicLink!);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  };

  return (
    <div  className="main-box-row">
      {error && <div className="message-page">
        <div className="error_msg" onClick={() => setError(null)}>
          {error.name}: {error.message}
        </div>
      </div>}
      {/* <div className="file-name">{file.id}</div> */}
      <div className="file-name">{display_name}</div>
      <div className="file-size">{fileSize(size_bytes!)}</div>
      <div className="file-comment">{comment}</div>
      <div className="file-date">{dateCreated}</div>
      <div className="file-date">{dateDownloaded}</div>
      <div className="file-btn" title='Удалить' onClick={onDelete}>&#10060;</div>
      <div className="file-btn" title='Переименовать' onClick={onRename}>&#128260;</div>
      <div className="file-btn" title='Просмотр'>
        <a className='file-link' 
          href={BASE_URL + file.public_url}
          target="_blank"
          rel="noopener noreferrer"
        >⏺️</a>
      </div>
      <div className="file-btn" title='Скачать' onClick={onDownLoad}>&#9196;</div>
      <div className="file-btn" title='Спецссылка' 
        onClick={onCopyLink}
        >🔗</div>
      {copyStatus === 'copied' && <div className="file-public-link-box">
        <div className="file-public-link">
          Скопировано
        </div> 
        <div className='file-operation-btn' onClick={()=> setCopyStatus('idle')}>
          &times;
        </div>
      </div>}
      {copyStatus === 'error' && <div className="file-public-link-box">
        <div className="file-public-link">
          Не удалось скопировать ссылку
        </div> 
        <div className='file-operation-btn' onClick={()=> setCopyStatus('idle')}>
          &times;
        </div>
      </div>}
      {newName && <div className="file-newname-box">
        <label htmlFor="name">Имя:</label>
        <input type="text"
          className="file-newname-input" 
          id="name"
          name="name"
          placeholder='Новое имя'
          value={newName}
          required
          autoFocus
          onChange={(e) => setNewName(e.target.value)}
        />
        <label htmlFor="comment">Комментарий:</label>
        <input type="text"
          className="file-newname-input" 
          id="comment"
          name="comment"
          placeholder='Новый комментарий'
          value={newСomment}
          required
          onChange={(e) => setNewСomment(e.target.value)}
        />
        <div  className='file-operation-btn' onClick={onSave}>&#9989;</div>
        <div className='file-operation-btn' onClick={()=> setNewName('')}>&#10060;</div>
      </div>}
    </div>
  )
}
