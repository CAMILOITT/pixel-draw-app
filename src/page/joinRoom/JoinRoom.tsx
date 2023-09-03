import AdditionalTools from '../../components/additionalTools/AdditionalTools'
import BarDesign from '../../components/barDesign/BarDesign'
import BarTools from '../../components/barTools/BarTools'
import ConfigDownload from '../../components/configDownload/ConfigDownload'
import ConfigurationCanvas from '../../components/configurationCanvas/ConfigurationCanvas'
import LayerPixel from '../../components/layerPixel/LayerPixel'
import css from './JoinRoom.module.css'

interface JoinRoomProps {}

export default function JoinRoom({}: JoinRoomProps) {
  return (
    <div className={css.joinRoom}>
      {/* <BarDocument /> */}
      <LayerPixel />
      <BarTools />
      <AdditionalTools />
      <BarDesign />
      <ConfigurationCanvas />
      <ConfigDownload />
    </div>
  )
}
