import { useEffect, useRef } from 'react'
import css from './PositionMouse.module.css'

interface PositionMouseProps {}

export default function PositionMouse({}: PositionMouseProps) {
  const cursorMask = useRef<HTMLDivElement | null>(null)

 
  return <div ref={cursorMask} className={css.maskCursor}></div>
}
