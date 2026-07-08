import './header.css'
import { useContext } from "react"
import { MyCloudContext } from "../config/context"


export const Header = () => {
  const { currentUser } = useContext(MyCloudContext)

  return (
    <div className="header">
      <h1 className='header-title'>My Cloud</h1>
      <div className="header-user">{currentUser && 'Пользователь: '} {currentUser?.fullname}</div>
    </div>
  )
}
