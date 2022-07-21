import './Header.styles.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";


const Header = () => {
  const navigate = useNavigate()

  const { tasks } = useSelector(state => {
    return state.tasksReducer
  })

  let userName = localStorage.getItem("userName")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    navigate("/login", {replace: true})
  }

  return (
    <header>
      <span>Go Scrum</span>
      <div className='wrapper_right_header'>
        <div onClick={() => navigate("/donate", { replace: true }) }>Donar</div>
        <div>Tareas creadas: {tasks?.length}</div>
        <div>{userName}</div>
      <div onClick={handleLogout}>x</div>

      </div>
    </header>
  )
}

export default Header