import { InfoColor } from '../../types/color/enums'
import css from './OutputColor.module.css'

interface OutputColorProps {
  infoColor: InfoColor
}

export default function OutputColor({ infoColor }: OutputColorProps) {
  function copyColor() {
    navigator.clipboard.writeText(
      `hsla(${infoColor.hue}, ${infoColor.saturation}%, ${infoColor.lightness}%, ${infoColor.alpha})`
    )
  }
  return (
    <div
      className={css.outputColor}
      style={{
        background: `hsla(${infoColor.hue}, ${infoColor.saturation}%, ${infoColor.lightness}%, ${infoColor.alpha})`,
        color:
          infoColor.lightness < 45 ||
          (infoColor.hue > 209 && infoColor.hue < 300)
            ? 'white'
            : 'black',
      }}
    >
      <span className={css.formatColor} onClick={copyColor}>
        hsla
      </span>
      <span className={css.valueColor}>
        ({infoColor.hue}deg, {infoColor.saturation}%, {infoColor.lightness}%,{' '}
        {infoColor.alpha})
      </span>
    </div>
  )
}
