import { ForwardedRef, forwardRef } from 'react'
import css from './Select.module.css'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { children, ...props }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => (
    <select
      className={`${css.select} ${props.className}`}
      {...props}
      role="combobox"
      ref={ref}
    >
      {children}
    </select>
  )
)

export default Select
