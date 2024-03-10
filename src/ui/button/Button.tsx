import { ForwardedRef, forwardRef } from 'react'
import css from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={`${css.button} ${className || ''}`}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export default Button
