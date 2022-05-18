import React from 'react'
import './item.css'
import { useDrag } from 'react-dnd'
import { Itask } from './interfacesTask'
import { useAppDispatch } from '../../../app/hooks'
import { removeTaskWithIndex } from '../../../features/section/sectionSlice'

const Task: React.FC<Itask> = ({ task, ind, sectionName }) => {
  const dispatch = useAppDispatch()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: ind, task: task, sectionName: sectionName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const handleRemoveTask = () => {
    dispatch(
      removeTaskWithIndex({
        task: task,
        currentSectionName: sectionName,
      }),
    )
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
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
    </div>
  )
}

export default Task
