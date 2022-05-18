import './header.css'
import { IHeader } from './interfacesHeader'

const Header: React.FC<IHeader> = ({ setActive }) => {
  return (
    <div className="add_container">
      <button
        onClick={() => {
          setActive('section')
        }}
      >
        Add Section
      </button>
      <button
        onClick={() => {
          setActive('task')
        }}
      >
        Add Task
      </button>
      <hr />
    </div>
  )
}
export default Header
