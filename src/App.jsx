import Board from './container/Board/Board'
import { Route, Routes } from 'react-router-dom'


function App() {

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
