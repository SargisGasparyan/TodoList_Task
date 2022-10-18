import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ISectionState, IPayload } from './interfacesSectionSlice'

const initialState: ISectionState = {
  sections: [],
}

export const sectionSlice = createSlice({
  name: 'selectors',
  initialState,
  reducers: {
    //reducers for sections
    addDay: (state: ISectionState, action: IPayload) => {
      state.sections = [
        ...state.sections,
        { section: action.payload.title, tasks: [] },
      ]
    },
    removeDayWithIndex: (state: ISectionState, action: IPayload) => {
      state.sections = state.sections.filter(
        (section) => section.section !== action.payload.currentSectionName,
      )
    },

    //reducers for tasks
    addEvent: (state: ISectionState, action: IPayload) => {
      state.sections = state.sections.map((section, index) =>
        index === 0
          ? {
              ...section,
              tasks: [
                ...section.tasks,
                {
                  title: action.payload.title,
                  description: action.payload.description,
                },
              ],
            }
          : { ...section },
      )
    },
    addEventWithIndex: (state: ISectionState, action: IPayload) => {
      state.sections = state.sections.map((section, index) =>
        section.section === action.payload.sectionName
          ? {
              ...section,
              tasks: [
                ...section.tasks,
                {
                  title: action.payload.task.title,
                  description: action.payload.task.description,
                },
              ],
            }
          : { ...section },
      )
    },
    removeEventWithIndex: (state: ISectionState, action: IPayload) => {
      state.sections = state.sections.map((section, index) =>
        section.section === action.payload.currentSectionName
          ? {
              ...section,
              tasks: section.tasks.filter(
                (item) => item.title !== action.payload.task.title,
              ),
            }
          : { ...section },
      )
    },

    //reducers for edit task
    changeTitleEvent: (state: ISectionState, action: IPayload) => {
      state.sections = state.sections.map((section, index) =>
        section.section === action.payload.sectionName
          ? {
              ...section,
              tasks: section.tasks.map((item) =>
                item.title === action.payload.task.title
                  ? { ...item, title: action.payload.newTitle }
                  : { ...item },
              ),
            }
          : { ...section },
      )
    },
  },
})

export const {
  addDay,
  addEvent,
  addEventWithIndex,
  removeEventWithIndex,
  removeDayWithIndex,
  changeTitleEvent,
} = sectionSlice.actions

export const selectCount = (state: RootState) => state

export default sectionSlice.reducer
