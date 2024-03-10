import { ForwardedRef, forwardRef } from 'react'
import css from './Range.module.css'

interface RangeProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Range = forwardRef<HTMLInputElement, RangeProps>(
  (props: RangeProps, ref: ForwardedRef<HTMLInputElement>) => (
    <input className={`${css.range} ${props.className}`} {...props} ref={ref} />
  )
)

export default Range
