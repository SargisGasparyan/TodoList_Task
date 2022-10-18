import React from 'react'
import { ITask } from '../../../features/section/interfacesSectionSlice'
import Item from '../task/Task'
import { useDrop } from 'react-dnd'
import { ISendTask, Iitem } from './interfcesColumn'
import { useAppDispatch } from '../../../app/hooks'

import {
  addEventWithIndex,
  removeEventWithIndex,
  removeDayWithIndex,
} from '../../../features/section/sectionSlice'
import './column.css'

const Column: React.FC<Iitem> = ({ items, section, index }) => {
  const dispatch = useAppDispatch()
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'task',
    drop: (item: ISendTask) => addEventToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))
  const addEventToSection = (item: ISendTask) => {
    dispatch(
      addEventWithIndex({
        task: item.task,
        currentSectionName: item.sectionName,
        sectionName: section,
      }),
    )
    dispatch(
      removeEventWithIndex({
        task: item.task,
        currentSectionName: item.sectionName,
      }),
    )
  }
  const handleRemoveSection = () => {
    dispatch(
      removeDayWithIndex({
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
        return (
          <div key={ind}>
            <Item task={item} ind={ind} sectionName={section} />
          </div>
        )
      })}
    </div>
  )
}

export default Column
