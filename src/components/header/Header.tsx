import './header.css'
import { IHeader } from './interfacesHeader'
import { useAppSelector } from '../../app/hooks'
import { selectCount } from '../../features/section/sectionSlice'

const Header: React.FC<IHeader> = ({ setActive }) => {
  const section = useAppSelector(selectCount)
  const sectionCount = section.section.sections.length

  return (
    <div className="add_container">
      <button
        onClick={() => {
          setActive('section')
        }}
      >
        Add Day
      </button>
      {sectionCount > 0 && (
        <button
          onClick={() => {
            setActive('task')
          }}
        >
          Add Event
        </button>
      )}
      <hr />
    </div>
  )
}
export default Header
