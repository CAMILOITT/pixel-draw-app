import { useEffect, useRef } from 'react'
import css from './DownloadPanel.module.css'
interface DownloadPanelProps {}

export default function DownloadPanel({}: DownloadPanelProps) {
  const linkDownload = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    // Convertir el contenido del canvas a una URL de datos
    // var imagenURL = canvas.toDataURL()
    if (!linkDownload.current) return
    linkDownload.current.href = 'imagenUrl'

    linkDownload.current.download = 'mi_dibujo.png'
  }, [])

  function handleDownload(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    if (!linkDownload.current) return
    linkDownload.current.href = 'imagenUrl'

    linkDownload.current.download = 'mi_dibujo.png'
    e.currentTarget.href = ''
    e.currentTarget.download = 'mi_dibujo.png'
  }

  return (
    <dialog>
      <h2>Download</h2>
      
      <a href="" ref={linkDownload} onClick={handleDownload}>
        download
      </a>
      <button></button>
    </dialog>
  )
}
