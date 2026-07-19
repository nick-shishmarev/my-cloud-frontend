import './fileinputpage.css'
import { useContext, useState } from "react";
import { MyCloudContext } from "../../config/context";
import { URL_FILES } from "../../config/constants";
import type { FetchParams } from "../../config/types";
import { useNavigate } from "react-router";
import { fileSize } from '../../utilits/fileSize';


export const UploadFilePage = () => {
  const { baseUrls, token, isAuthorised } = useContext(MyCloudContext);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const { baseUrl } = baseUrls!;

  if (!isAuthorised) {
    navigate('/');
    return;
  }

  const clearForm = () => {
    setFile(null);
    setComment('');
    setDisplayName('');
    setError(null);
  }

  const onClose = () => {
    clearForm();
    navigate('/main');
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError(null);
      setStatus('idle');
    }
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("original_name", file.name);
    formData.append("display_name", displayName);
    formData.append("comment", comment);

    const url = URL_FILES;
    const params: FetchParams = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Token ${token}`
      },
    }
    setStatus('uploading');
    
    try {
      const result = await fetch(baseUrl + url, params);

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      if (result.status === 201) {
        setStatus('success');
        clearForm();
        return;
      }

      throw new Error(`Error uploading! status: ${result.status}`);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="file-input-page">
      {status === 'uploading' && <div className="loader absolute"></div>}
      <div className="file-input-box">
        <div className="input-close-btn" onClick={onClose}>&times;</div>
        <div className="input-file-title">Загрузка файла</div>
        <form className="file-input-form"
          onSubmit={onSubmit}
          >
          <div className="file-input-file-group">
            <label htmlFor="file" className='input-file-choose'>Выберите файл</label>
            <input
              type="file"
              name="file"
              id="file"
              className='input-file-file'
              onChange={onFileChange}
            />
            <div>{file ? file.name : ''}</div>
          </div>
          <div className="file-input-form-group">
            <label htmlFor="name">Имя файла</label>
            <input type="text" 
              id="name"
              name="name"
              placeholder='Отображаемое имя файла'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              />
          </div>

          <div className="file-input-form-group">
            <label htmlFor="comment">Комментарий</label>
            <input type="text" 
              id="comment"
              name="comment"
              placeholder='Комментарий'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />
          </div>
          <div className="file-input-form-group">
            <label htmlFor="size">Размер файла</label>
            <input type="text" 
              id="size"
              name="size"
              value={file ? fileSize(file.size) : ''}
              />
          </div>
          <button type="submit" className="login-submit-btn">
            {status === 'uploading' ? 'Загрузка...' : 'Загрузить'}
          </button>
        </form>
        {error && (
          <div className='input-error-msg'>
            {error}
          </div>
        )}

        {status === 'success' && (
          <div className='input-success-msg'>
            Файл успешно загружен!
          </div>
        )}
      </div>
    </div>
  )
}
