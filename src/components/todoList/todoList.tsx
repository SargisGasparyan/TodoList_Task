import React from 'react'
import { selectCount } from '../../features/section/sectionSlice'
import { useAppSelector } from '../../app/hooks'
import Column from './column/Column'
import './todoList.css'
const TodoList: React.FC = () => {
  const state = useAppSelector(selectCount)
  const allsections = state.section.sections

  return (
    <div className="cols_container">
      {allsections.map((item, index) => {
        return (
          <div key={index}>
            <Column items={item.tasks} section={item.section} index={index} />
          </div>
        )
      })}
    </div>
  )
}

export default TodoList
