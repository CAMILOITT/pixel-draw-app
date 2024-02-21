import { useContext } from 'react'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import css from './ConfigDownload.module.css'
import Select from '@ui/select/Select'

interface ConfigDownloadProps {}

export default function ConfigDownload({}: ConfigDownloadProps) {
  const { urlImage } = useContext(InfoCanvasContext)
  return (
    <form className={css.formDownload}>
      <h2>Download</h2>
      {urlImage && (
        <img src={urlImage} alt="drawing" className={css.previewImage} />
      )}
      <label className={css.informationDownload}>
        Nombre:
        <input
          type="text"
          name="name-img"
          id="nameImg"
          placeholder="nombre de la imagen"
        />
      </label>
      <label className={css.informationDownload}>
        formato de la imagen
        <Select name="type-img" id="typeImg" className={css.formatImg}>
          <option value="png">PNG</option>
          <option value="img">IMG</option>
        </Select>
      </label>
      <a href={urlImage} download={urlImage} className={css.downloadImage}>
        Download
      </a>
    </form>
  )
}
