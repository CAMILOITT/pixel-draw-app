import { Route, Routes } from 'react-router-dom'
import JoinRoom from './page/joinRoom/JoinRoom'
import Canvas from './page/canvas/Canvas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom />} />
      <Route path="/canvas" element={<Canvas />} />
    </Routes>
  )
}

export default App
