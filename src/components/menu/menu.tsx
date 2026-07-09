import './menu.css'
import { useContext } from 'react'
import { NavLink } from "react-router"
import { MyCloudContext } from '../config/context'

export const Menu = () => {
  const { isAuthorised, isAdmin } = useContext(MyCloudContext)

  return (
    <nav className="menu">
      <NavLink 
        to="/" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        ГЛАВНАЯ
      </NavLink>
      {isAuthorised && <NavLink 
        to="/main" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Хранилище
      </NavLink>}
      {isAdmin && <NavLink 
        to="/admin" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Пользователи
      </NavLink>}
      {!isAuthorised && <NavLink 
        to="/login" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Вход
      </NavLink>}
      {!isAuthorised && <NavLink 
        to="/register" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Регистрация
      </NavLink>}
      {isAuthorised && <NavLink 
        to="/logout" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Выход
      </NavLink>}
    </nav>
  )
}
