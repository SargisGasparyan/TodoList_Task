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
    addSection: (state: ISectionState, action: IPayload) => {
      state.sections = [
        ...state.sections,
        { section: action.payload.title, tasks: [] },
      ]
    },
    addSectionWithIndex: (state: ISectionState, action: IPayload) => {
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
    removeTaskWithIndex: (state: ISectionState, action: IPayload) => {
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
    removeSectionWithIndex: (state: ISectionState, action: IPayload) => {
      state.sections = state.sections.filter(
        (section) => section.section !== action.payload.currentSectionName,
      )
    },
    addTask: (state: ISectionState, action: IPayload) => {
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
  },
})

export const {
  addSection,
  addTask,
  addSectionWithIndex,
  removeTaskWithIndex,
  removeSectionWithIndex,
} = sectionSlice.actions

export const selectCount = (state: RootState) => state

export default sectionSlice.reducer
