import css from './InputNumber.module.css'

interface InputNumberProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputNumber({ onClick, ...props }: InputNumberProps) {
  function handleClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.currentTarget.select()
  }

  return (
    <input
      className={`${css.inputNumber} ${props.className}`}
      type="number"
      role="spinbutton"
      onClick={onClick || handleClick}
      {...props}
    />
  )
}
