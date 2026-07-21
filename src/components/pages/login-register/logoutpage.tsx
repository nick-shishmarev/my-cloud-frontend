import './loginpage.css'
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyCloudContext } from '../../config/context';


export const LogoutPage = () => {
  const navigate = useNavigate();
  const { isAuthorised, setIsAuthorised, setIsAdmin, setCurrentUser } = useContext(MyCloudContext);
  
  if (!isAuthorised) {
    navigate('/');
    return;
  }

  const onClick = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setIsAuthorised(false);
    navigate('/')
  }

  const onCancel = () => {
    navigate('/main')
  }

  return (
    <div className='login-page'>
      <div className="login-box">
        <div className="logout-box">
          <div className="logout-text">
            <p>Вы собираетесь выйти из своего аккаунта.</p>
            <p>Подтверждаете?</p>
          </div>
          <button className="login-submit-btn" onClick={onClick}>Выход</button>
          <button className="login-submit-btn" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  )
}
