import css from './Select.module.css'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ children, ...props }: SelectProps) {
  return (
    <select className={`${css.select} ${props.className}`} {...props} role="combobox">
      {children}
    </select>
  )
}
