import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './components/config/router'

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
