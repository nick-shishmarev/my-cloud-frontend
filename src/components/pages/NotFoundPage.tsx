import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <article className="article">
      <h1 className="article__title">HTTP 404</h1>
      <p className="article__paragraph">Страница не найдена</p>
      <p className="article__paragraph">Такого маршрута не существует</p>
      <Link to="/" className="menu__item  menu__item-active">← на главную</Link>
    </article>
  )
}
