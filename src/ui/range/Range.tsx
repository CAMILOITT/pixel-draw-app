import css from './Range.module.css'
interface RangeProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Range(props: RangeProps) {
  return <input className={`${css.range} ${props.className}`} {...props} />
}
