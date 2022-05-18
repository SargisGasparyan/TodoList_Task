export interface IModal {
  setActive(name: string, val: boolean): void
  setInputValue(value: string): void
  inputValue: string
  activeTask: boolean
  activeSection: boolean
}
