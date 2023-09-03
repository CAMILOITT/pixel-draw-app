import { Link } from "react-router-dom";

interface IndexProps {}

export default function Index({}: IndexProps) {
  return (
    <div>
      <h1>inicio</h1>
      <Link to="/create">crear una sala</Link>
      <Link to="/join">unirse a una sala</Link>
    </div>
  )
}
