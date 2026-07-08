import './loginpage.css'
import { useContext, useState } from "react"
import { MyCloudContext } from "../../config/context"
import { type FetchParams } from "../../config/types";
import { useNavigate } from "react-router";
import { BASE_URL, URL_AUTH } from '../../config/constants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loading,
    error, 
    setIsAuthorised, 
    setIsAdmin, 
    setToken, 
    setLoading, 
    setError, 
    setCurrentUser, 
    setStockOwner, 
  } = useContext(MyCloudContext);
  
  const [userName, setUserName] = useState('');
  const [userPsw, setUserPsw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const loginUser = async (userName: string, userPsw: string) => {
      const url = URL_AUTH; 
      const params: FetchParams = {
        method: "POST", 
        body: JSON.stringify({ username: userName, password: userPsw }), 
        headers: {"Content-Type": "application/json"} 
      };
      setLoading(true);

      try {
        const result = await fetch(BASE_URL + url, params);

        if (result.status === 200) {
          const loginResponse = await result.json();
          const { token, user} = loginResponse!;
          const { is_staff } = user;
          setCurrentUser(user);
          setStockOwner(user);
          setIsAuthorised(true);
          setIsAdmin(is_staff);
          setToken(token);
          navigate('/main');
          return;
        }

        setErrorMsg('User not found or wrong password');

      } catch (err) {
        const myerror = err instanceof Error ? err : new Error(String(err));
        setError(myerror)

      } finally {
        setLoading(false);
      }
    }

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(userName, userPsw);
  }

  return (
    <div className="login-page">
      <div className="login-box">
        {loading && <div className="message-page"><div className="loader"></div></div>}
        {error && <div className="message-page">
          <div className="error_msg" onClick={() => setError(null)}>
            {error.name}: {error.message}
          </div>
        </div>}
        <form className="login-form"
          onSubmit={onSubmit}
        >
          <div className="login-form-group">
            <label htmlFor="name">Имя</label>
            <input type="text" 
              id="name"
              name="name"
              placeholder='my_name'
              value={userName}
              required
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="psw">Пароль</label>
            <input type="password" 
              id="psw"
              name="psw"
              placeholder='****'
              value={userPsw}
              required
              onChange={(e) => setUserPsw(e.target.value)}
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Войти
          </button>

        </form>
        <div className="login-error-box">
          {errorMsg !== '' && <div className="login-error-message">{errorMsg}</div>}
        </div>
      </div>
    </div>
  )
}
