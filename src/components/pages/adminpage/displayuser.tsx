import type { User } from "../../config/types";

interface Props {
  user: User;
}

export const DisplayUser = (props: Props) => {
  const { user } = props;
  const {id, username, fullname, email, directory, is_staff} = user;

  return (
    <>
      <div className="user-row">
        <div className="user-id">{id}</div>
        <div className="user-username">{username}</div>
        <div className="user-admin">{is_staff ? <p className='large'>&#10004;</p> : ''}</div>
        <div className="user-fullname">{fullname}</div>
        <div className="user-email">{email}</div>
        <div className="user-directory">{directory}</div>
      </div>
    </>
  )
}
