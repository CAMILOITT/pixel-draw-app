import { forwardRef, useImperativeHandle, useRef } from 'react'
import css from './Modal.module.css'
import CloseIcon from '../../assets/icons/CloseIcon'

interface ModalProps {
  children?: React.ReactNode
}
export interface ModalRef {
  open(): void
  close(): void
}

const Modal = forwardRef<ModalRef, ModalProps>(({ children }, ref) => {
  const Modal = useRef<HTMLDialogElement | null>(null)

  function open() {
    if (!Modal.current) return
    Modal.current?.showModal()
  }

  function close() {
    Modal.current?.close()
  }

  useImperativeHandle(
    ref,
    () => {
      return { open, close }
    },
    []
  )

  return (
    <dialog ref={Modal} className={css.modal}>
      <button onClick={close} className={css.btnClose}>
        <CloseIcon />
      </button>
      {children}
    </dialog>
  )
})
export default Modal
