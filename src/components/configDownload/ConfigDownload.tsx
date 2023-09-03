import { useContext } from 'react'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import css from './ConfigDownload.module.css'
import CloseIcon from '../../assets/icons/CloseIcon'

interface ConfigDownloadProps {}

export default function ConfigDownload({}: ConfigDownloadProps) {
  const { urlImage, openMenuDownload, setOpenMenuDownload } =
    useContext(InfoCanvasContext)
  function closeConfiguration() {
    setOpenMenuDownload(false)
  }
  return (
    <dialog open={openMenuDownload}>
      <form className={css.formDownload}>
        <button
          className={css.closeMenu}
          type="button"
          onClick={closeConfiguration}
        >
          <CloseIcon />
        </button>
        <h2>Download</h2>
        <img src={urlImage} alt="drawing" className={css.previewImage} />
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
          <select name="type-img" id="typeImg">
            <option value="png">PNG</option>
            <option value="img">IMG</option>
          </select>
        </label>
        <a href={urlImage} download={urlImage} className={css.downloadImage}>
          Download
        </a>
      </form>
    </dialog>
  )
}
