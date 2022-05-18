import './modal.css'
import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { IModal } from './InterfacesModal'
import {
  addSection,
  addTask,
  selectCount,
} from '../../features/section/sectionSlice'

const Modal: React.FC<IModal> = ({
  activeTask,
  activeSection,
  inputValue,
  setActive,
  setInputValue,
}) => {
  const [description, setDescription] = React.useState('')
  const handleAddInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handleAddDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleKeyboardFunc = (val: string) => {
    if (val === 'section') {
      inputValue !== '' && dispatch(addSection({ title: inputValue }))
      setInputValue('')
      setDescription('')
      setActive('section', false)
    } else if (val === 'task') {
      inputValue !== '' &&
        dispatch(addTask({ title: inputValue, description: description }))
      setInputValue('')
      setDescription('')
      setActive('task', false)
    }
  }

  const dispatch = useAppDispatch()
  const section = useAppSelector(selectCount)

  return (
    <div>
      {activeSection ? (
        <div
          className="modal_container"
          onClick={() => setActive('section', !activeSection)}
        >
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  onChange={handleAddInput}
                  value={inputValue}
                  id="first_name"
                  type="text"
                  className="validate"
                />
                <label className="active">Selection Name</label>
              </div>
            </div>
            <button
              onClick={(e) => handleKeyboardFunc('section')}
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Add section
              <i className="material-icons right"></i>
            </button>
          </div>
        </div>
      ) : activeTask ? (
        <div
          className="modal_container"
          onClick={() => setActive('task', !activeTask)}
        >
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  onChange={handleAddInput}
                  value={inputValue}
                  id="first_name2"
                  type="text"
                  className="validate"
                />
                <label className="active">Task Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  onChange={(e) => {
                    handleAddDescription(e)
                  }}
                  value={description}
                  id="first_name2=3"
                  type="text"
                  className="validate"
                />
                <label className="active">Task Descripion</label>
              </div>
              <button
                onClick={(e) => handleKeyboardFunc('task')}
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Add task
                <i className="material-icons right"></i>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default Modal
