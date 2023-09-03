import {  Route, Routes } from 'react-router-dom'
import Index from './page/index/Index'
import CreateRoom from './page/createRoom/CreateRoom'
import JoinRoom from './page/joinRoom/JoinRoom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/create" element={<CreateRoom />} />
      <Route path="/join" element={<JoinRoom />} />
    </Routes>
  )
}

export default App
