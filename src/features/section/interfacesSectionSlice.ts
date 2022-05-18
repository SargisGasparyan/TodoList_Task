export interface ISectionState {
  sections: ITasks[]
}
export interface ITasks {
  section: string
  tasks: ITask[]
}
export interface ITask {
  title: string
  description: string
}
export interface IPayload {
  type: string
  payload: any
}
