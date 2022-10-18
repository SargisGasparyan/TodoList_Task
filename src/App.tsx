import Header from './components/header/Header'
import Modal from './components/modal/Modal'
import React from 'react'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TodoList from './components/todoList/todoList'

function App() {
  const [modalActiveTask, setModalActiveTask] = React.useState(false)
  const [modalActiveSection, setModalActiveSection] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const handleActive = (name: string) => {
    if (name === 'section') {
      setModalActiveSection((prev) => !prev)
    } else {
      setModalActiveTask((prev) => !prev)
    }
  }
  const handleSetInputValue = (value: string) => {
    setInputValue(value)
  }

  return (
    <div className="App">
      <h1 className='headerClass'>My Todo List</h1>
      <DndProvider backend={HTML5Backend}>
        <Header setActive={handleActive} />
        <TodoList />
        <Modal
          inputValue={inputValue}
          setInputValue={handleSetInputValue}
          setActive={handleActive}
          activeTask={modalActiveTask}
          activeSection={modalActiveSection}
        />
      </DndProvider>
    </div>
  )
}

export default App
