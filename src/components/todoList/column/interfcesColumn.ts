import { ITask } from '../../../features/section/interfacesSectionSlice'
export interface Iitem {
  items: ITask[]
  section: string
  index: number
}
export interface Iitem {
  items: ITask[]
  section: string
  index: number
}
export interface ISendTask {
  task?: ITask
  currentSectionName?: string
  id: number
  taskName: string
  sectionName: string
}
