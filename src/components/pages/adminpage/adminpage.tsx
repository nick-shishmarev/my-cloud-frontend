import type { User } from '../../config/types';
import './adminpage.css';
import { DisplayUser } from './displayuser';


export const AdminPage = () => {
  const usersList: User[] = [
    {id: '1', username: 'User1', is_staff: true, fullname: 'User1', email: 'email1', directory: 'path1'},
    {id: '2', username: 'User2', is_staff: false, fullname: 'User2', email: 'email2', directory: 'path2'},
  ]

  return (
    <div className="users-box">
      <div className="user-row">
        <div className="user-id">ID</div>
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
      {usersList.map(user => <DisplayUser key={user.id} {...{user}} />)}
    </div>
  )
}
