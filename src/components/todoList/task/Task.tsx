import React, { ChangeEvent } from 'react'
import './task.css'
import { useDrag } from 'react-dnd'
import { Itask } from './interfacesTask'
import { useAppDispatch } from '../../../app/hooks'
import {
  removeEventWithIndex,
  changeTitleEvent,
} from '../../../features/section/sectionSlice'

const Task: React.FC<Itask> = ({ task, ind, sectionName }) => {
  const dispatch = useAppDispatch()
  const [editTask, setEditTask] = React.useState(false)
  const [titleText, setTitleText] = React.useState('')
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: ind, task: task, sectionName: sectionName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const handleRemoveTask = () => {
    dispatch(
      removeEventWithIndex({
        task: task,
        currentSectionName: sectionName,
      }),
    )
  }
  const handleEditTask = () => {
    setEditTask(true)
  }
  const changeTitleText = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleText(e.target.value)
  }
  const sendTitle = () => {
    dispatch(
      changeTitleEvent({
        task: task,
        sectionName: sectionName,
        newTitle: titleText,
      }),
    )
    setEditTask(false)
  }
  return (
    <div
      className={'container_item'}
      key={ind}
      ref={drag}
      style={{ border: isDragging ? '5px solid pink' : '' }}
    >
      <p onClick={handleRemoveTask} className={'p_close'}>
        X
      </p>
      <div style={{ position: 'relative' }}>
        {editTask && (
          <div className="edit_task_div">
            <p>Edit task</p>
            <p onClick={() => setEditTask(false)} className={'p_close'}>
              X
            </p>
            <div>
              <input
                type="text"
                onChange={(e) => changeTitleText(e)}
                value={titleText}
              />
              <span className="edit_span" onClick={sendTitle}>
                Edit
              </span>
            </div>
          </div>
        )}
        <div className="edit_title">
          <p className="p_task">Title: {task.title}</p>
          <p className="edit_p" onClick={handleEditTask}>
            Edit
          </p>
        </div>
        <p className="p_task">Description: {task.description}</p>
      </div>
    </div>
  )
}

export default Task
