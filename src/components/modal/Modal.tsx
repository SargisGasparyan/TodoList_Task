import './modal.css'
import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { IModal } from './InterfacesModal'
import {
  addDay,
  addEvent,
  selectCount,
} from '../../features/section/sectionSlice'

const Modal: React.FC<IModal> = ({
  activeTask,
  activeSection,
  inputValue,
  setActive,
  setInputValue,
}) => {
  const dispatch = useAppDispatch()

  const [description, setDescription] = React.useState('')
  const [validSection, setValidSection] = React.useState(false)
  const [validTaskTitle, setValidTaskTitle] = React.useState(false)
  const [validTaskDescription, setValidTaskDescription] = React.useState(false)

  const handleAddInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    if (name === 'section') {
      let bool = !/^[a-zA-Z]*$/g.test(e.target.value)
      bool ? setValidSection(true) : setValidSection(false)
    }
    if (name === 'task') {
      let bool = !/[a-z]/.test(e.target.value) && /[A-Z]/.test(e.target.value)
      !bool ? setValidTaskTitle(true) : setValidTaskTitle(false)
    }
    setInputValue(e.target.value)
  }

  const handleAddDescription = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setDescription(e.target.value)
    if (name === 'description') {
      let bool = !/[a-z]/.test(e.target.value) && /[A-Z]/.test(e.target.value)
      !bool ? setValidTaskDescription(true) : setValidTaskDescription(false)
    }
  }

  const handleKeyboardFunc = (val: string) => {
    if (val === 'section') {
      inputValue !== '' && dispatch(addDay({ title: inputValue }))
      setInputValue('')
      setDescription('')
      setActive('section', false)
    } else if (val === 'task') {
      inputValue !== '' &&
        dispatch(addEvent({ title: inputValue, description: description }))
      setInputValue('')
      setDescription('')
      setActive('task', false)
    }
  }

  return (
    <div>
      {activeSection ? (
        <div
          className="modal_container"
          onClick={() => setActive('section', !activeSection)}
        >
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="row">
              <div>
                <div className="input-field col s6">
                  <input
                    onChange={(e) => handleAddInput(e, 'section')}
                    value={inputValue}
                    id="first_name"
                    type="text"
                  />
                  <label className="active">Write name</label>
                </div>
                {validSection && inputValue !== '' && (
                  <div>
                    <label htmlFor="" className={'valid'}>
                      write only latters
                    </label>
                  </div>
                )}
              </div>
            </div>
            <button
              disabled={validSection || inputValue === '' ? true : false}
              onClick={(e) => handleKeyboardFunc('section')}
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Add Day
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
            <div className="input-field col s6">
              {validTaskTitle && inputValue !== '' && (
                <div>
                  <label htmlFor="" className={'valid'}>
                    write title latters uppercase
                  </label>
                </div>
              )}
              <input
                onChange={(e) => handleAddInput(e, 'task')}
                value={inputValue}
                id=""
                type="text"
              />
              <label className="active">Action name</label>
            </div>
            <div className="input-field col s6">
              {validTaskDescription && description !== '' && (
                <div>
                  <label htmlFor="" className={'valid'}>
                    write description latters uppercase
                  </label>
                </div>
              )}
              <input
                onChange={(e) => {
                  handleAddDescription(e, 'description')
                }}
                value={description}
                id=""
                type="text"
              />

              <label className="active">Action descripion</label>
            </div>
            <button
              disabled={
                validTaskTitle || validTaskDescription || description === ''
                  ? true
                  : false
              }
              onClick={(e) => handleKeyboardFunc('task')}
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Add Event
              <i className="material-icons right"></i>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default Modal
