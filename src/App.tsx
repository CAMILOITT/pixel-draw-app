import { Route, Routes } from 'react-router-dom'
import JoinRoom from './page/joinRoom/JoinRoom'
import Index from './page/index/Index'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom />} />
      <Route path="/index" element={<Index />} />
    </Routes>
  )
}

export default App
