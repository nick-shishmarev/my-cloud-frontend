import './loginpage.css'
import React, { useContext, useState } from "react"
import { MyCloudContext } from "../../config/context"
import { type FetchParams } from "../../config/types";
import type { RegRequest } from "../../config/types";
import { useNavigate } from 'react-router';
import { URL_REGISTER, USERNAME_MAX_LEN } from '../../config/constants';
import { isValidEmail, isValidPassword, isValidUserName } from '../../utilits/validators';


export const RegisterPage = () => {
  const navigate = useNavigate();

  const { BASE_URL, 
    loading, 
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
  const [userPsw2, setUserPsw2] = useState('');
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const registerUser = async (user: RegRequest) => {
    const url = URL_REGISTER; 
    const params: FetchParams = {
      method: "POST", 
      body: JSON.stringify(user), 
      headers: {"Content-Type": "application/json"} 
    };
    setLoading(true);
    try {
      const result = await fetch(BASE_URL + url, params);
      if (result.status === 201) {
        const responseJson = await result.json();
        const { token, user} = responseJson;
        setCurrentUser(user!);
        setStockOwner(user!);
        setIsAuthorised(true);
        setIsAdmin(user!.is_staff);
        setToken(token);
        navigate('/main');
        return;
      }
      if (result.status === 400) {
        const responseJson: string[] = await result.json();
        console.log(responseJson);
        console.log(Object.values(responseJson));
        const message = JSON.stringify(Object.values(responseJson).join(' / '));
        setErrorMsg(message);
        return;
      }
      setErrorMsg('Ошибка регистрации');
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error)
        console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const onChangePsw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const psw = e.target.value;
    setUserPsw(psw);
  }

  const onChangePsw2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const psw = e.target.value;
    setUserPsw2(psw);
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const name = e.target.value;
    if (name.length <= USERNAME_MAX_LEN) {
      setUserName(name);
    }
  }

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidUserName(userName)) {
      setErrorMsg('Недопустимый логин');
      return
    }

    const { fault, msg } = isValidPassword(userPsw)

    if (fault) {
      setErrorMsg(msg);
      return
    }

    if (!isValidEmail(userEmail)) {
      setErrorMsg('Недопустимый e-mail адрес');
      return
    }
    
    if (userPsw !== userPsw2) {
      setErrorMsg('Пароли не совпадают');
      return
    }

    setErrorMsg('');

    const user: RegRequest = {
      username: userName,
      fullname: fullName,
      email: userEmail,
      password: userPsw,
    }

    registerUser(user);
  }

  return (
    <div className="login-page">
      <div className="login-box">

        {loading && <div className="message-page"><div className="loader"></div></div>}
        <form className="login-form"
          onSubmit={onSubmit}
          >
          <div className="login-form-group">
            <label htmlFor="name">Логин</label>
            <input type="text" 
              id="name"
              name="name"
              placeholder='login'
              value={userName}
              required
              autoFocus
              onChange={onChangeName}
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
              autoComplete="new-password"
              onChange={onChangePsw}
              />
          </div>

          <div className="login-form-group">
            <label htmlFor="psw2">Повтор пароля</label>
            <input type="password" 
              id="psw2"
              name="psw2"
              placeholder='****'
              value={userPsw2}
              required
              onChange={onChangePsw2}
              />
          </div>

          <div className="login-form-group">
            <label htmlFor="fullname">Полное имя</label>
            <input type="text" 
              id="fullname"
              name="fullname"
              placeholder='Иван Петров'
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              />
          </div>

          <div className="login-form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" 
              id="email"
              name="email"
              placeholder='name@aaa.ru'
              value={userEmail}
              required
              autoComplete="new-email"
              onChange={(e) => setUserEmail(e.target.value)}
              />
          </div>

          <button type="submit" className="login-submit-btn">
            Зарегистрироваться
          </button>
        </form>
        
        <div className="login-text">
          <ul>
            <li>
              логин — только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов
            </li>
            <li>
              пароль — не менее 6 символов: как минимум одна заглавная буква, одна цифра и один спецсимвол
            </li>
          </ul>
        </div>
      </div>
      <div className="login-error-box">
        {errorMsg !== '' && <div className="login-error-message">{errorMsg}</div>}
      </div>
    </div>
  )
}
