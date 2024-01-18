import { useEffect, useState } from 'react'

import { TodoContextProvider } from './context'
import { TodoForm, TodoItem } from './components/Tasks'
import Board from './container/Board/Board'
import { Route, Routes } from 'react-router-dom'
import Header from './container/Header/Header'

function App() {
  const [todos, setTodos] = useState([]);
  const [progressTodos, setProgressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  return (
      <div>
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/visualize' element={<Board/>} />
        </Routes>
      </div>
  )
}

export default App
