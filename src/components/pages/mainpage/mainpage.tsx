import type { IFile } from '../../config/types';
import { DisplayFile } from './displayfile';
import './mainpage.css';

export const MainPage = () => {
  const fileList: IFile[] = [
    {id: '1', original_name: 'file-01'},
    {id: '2', original_name: 'file-02'},
    {id: '3', original_name: 'file-03'},
  ]

  return (
    <div className="main-page">
        <div className="main-box-header">
          <div className="file-name">Имя</div>
          <div className="file-size">Размер</div>
          <div className="file-comment">Комментарий</div>
          <div className="file-date">Загружен</div>
          <div className="file-date">Скачан</div>
        </div>
        <div>
          {fileList.length === 0 && <div>Хранилище пока пусто</div>}
          {fileList.map(file => <DisplayFile key={file.id} {...{file}} />)} 
        </div>

    </div>
  )
}
