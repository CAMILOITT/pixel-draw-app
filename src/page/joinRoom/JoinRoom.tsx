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
    </div>
  )
}
