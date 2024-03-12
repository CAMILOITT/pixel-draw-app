import { Route, Routes } from 'react-router-dom'
import JoinRoom from './page/joinRoom/JoinRoom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom />} />
    </Routes>
  )
}

export default App
