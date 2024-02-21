import css from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.LegacyRef<HTMLButtonElement> | undefined
}

export default function Button({ children, ref, className, ...props }: ButtonProps) {
  return (
    <button className={`${css.button} ${className||''}`} {...props} ref={ref}>
      {children}
    </button>
  )
}
