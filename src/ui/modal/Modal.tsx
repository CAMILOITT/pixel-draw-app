import { forwardRef, useImperativeHandle, useRef } from 'react'
import CloseIcon from '../../assets/icons/CloseIcon'
import css from './Modal.module.css'

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  children?: React.ReactNode
}
export interface ModalRef {
  open(): void
  close(): void
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ children, ...props }, ref) => {
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
      <dialog ref={Modal} className={css.modal} role="dialog" {...props}>
        <button onClick={close} className={css.btnClose} role="closeDialog">
          <CloseIcon />
        </button>
        {children}
      </dialog>
    )
  }
)

export default Modal
