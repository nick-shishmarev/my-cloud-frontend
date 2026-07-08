import './homepage.css'

export const HomePage = () => {

  return (
    <div className="home-page">
      <div className="home-box">
        <div className="home-title">
          Облачное хранилище My Cloud
        </div>
        <div className="home-text">
          <p className='home-pgph'>
            Приложение позволяет пользователям отображать, загружать, 
            отправлять, скачивать и переименовывать файлы.
          </p>
          <p className='home-pgph'>
            Обычный пользователь может управлять только своим хранилищем. 
          </p>
          <p className='home-pgph'>
            Пользователи с правами администратора могут просматривать 
            список пользователей, управлять хранилищем любого пользователя, 
            а также удалять пользователей и присваивать/отзывать права
            администратора для любого пользователя.
          </p>
        </div>
      </div>
    </div>
  )
}