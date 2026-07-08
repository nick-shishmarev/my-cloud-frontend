import './menu.css'
import { NavLink } from "react-router"

export const Menu = () => {

  return (
    <nav className="menu">
      <NavLink 
        to="/" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        ГЛАВНАЯ
      </NavLink>
      <NavLink 
        to="/main" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Файлы
      </NavLink>
      <NavLink 
        to="/admin" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Пользователи
      </NavLink>
      <NavLink 
        to="/login" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Вход
      </NavLink>
      <NavLink 
        to="/register" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Регистрация
      </NavLink>
      <NavLink 
        to="/logout" 
        className={({ isActive }) => `menu__item + ${isActive ? 'menu__item-active' : ''}`}
      >
        Выход
      </NavLink>
    </nav>
  )
}
