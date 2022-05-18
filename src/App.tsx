import Header from './components/header/Header'
import Modal from './components/modal/Modal'
import React from 'react'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TrelloContent from './components/trelloContent/trelloContent'

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
      <DndProvider backend={HTML5Backend}>
        <Header setActive={handleActive} />
        <TrelloContent />
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
