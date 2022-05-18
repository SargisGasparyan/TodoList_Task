import React from 'react'
import { ITask } from '../../../features/section/interfacesSectionSlice'
import Item from '../item/Task'
import { useDrop } from 'react-dnd'
import { ISendTask, Iitem } from './interfcesColumn'
import { useAppDispatch } from '../../../app/hooks'

import {
  addSectionWithIndex,
  removeTaskWithIndex,
  removeSectionWithIndex,
} from '../../../features/section/sectionSlice'
import './column.css'

const Column: React.FC<Iitem> = ({ items, section, index }) => {
  const dispatch = useAppDispatch()
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'task',
    drop: (item: ISendTask) => addTaskToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))
  const addTaskToSection = (item: ISendTask) => {
    dispatch(
      addSectionWithIndex({
        task: item.task,
        currentSectionName: item.sectionName,
        sectionName: section,
      }),
    )
    dispatch(
      removeTaskWithIndex({
        task: item.task,
        currentSectionName: item.sectionName,
      }),
    )
  }
  const handleRemoveSection = () => {
    dispatch(
      removeSectionWithIndex({
        currentSectionName: section,
      }),
    )
  }
  return (
    <div className="column" key={index} ref={dropRef}>
      <p onClick={handleRemoveSection} className="close">
        X
      </p>
      <h4 className="h3">{section}</h4>
      <hr />
      {items.map((item, ind) => {
        return <Item task={item} ind={ind} sectionName={section} />
      })}
    </div>
  )
}

export default Column
