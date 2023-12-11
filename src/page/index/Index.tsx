import { Link } from 'react-router-dom'
import css from './Index.module.css'
interface IndexProps {}

export default function Index({}: IndexProps) {
  return (
    <div className={css.home} >
      <div className={css.banner} >
        imagen
        <h1>Pixel Drawing</h1>
        <h2>deja que tu imaginacion se dibuje</h2>
      </div>
      <div className={css.newProject} >
        <Link to={'/'}>nuevo projecto</Link>
      </div>
    </div>
  )
}
