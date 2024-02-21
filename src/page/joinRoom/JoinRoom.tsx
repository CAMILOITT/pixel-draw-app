import AdditionalTools from '../../components/additionalTools/AdditionalTools'
import MenuColor from '../../components/menuColor/MenuColor'
import BarTools from '../../components/barTools/BarTools'
import LayerPixel from '../../components/layerPixel/LayerPixel'
import css from './JoinRoom.module.css'

interface JoinRoomProps {}

export default function JoinRoom({}: JoinRoomProps) {
  return (
    <div className={css.joinRoom}>
      <AdditionalTools />
      <LayerPixel />
      <BarTools />
      <MenuColor />
      {/* <iframe src="http://localhost:5173/canvas" style={{position: 'absolute', top: 0, left: '40%', width: '50%', height: '50%'}} ></iframe> */}
    </div>
  )
}
