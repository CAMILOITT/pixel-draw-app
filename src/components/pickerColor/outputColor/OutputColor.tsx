import css from './OutputColor.module.css';

interface OutputColorProps {
  infoColor: { color: number; saturation: number; light: number; dark: number }
}

export default function OutputColor({ infoColor }: OutputColorProps) {
  function copyColor() {
    navigator.clipboard.writeText(
      `hslaToRgba(${infoColor.color}, ${infoColor.saturation}%, ${
        infoColor.light + infoColor.dark
      }%, {infoColor.alpha})`
    )
  }
  return (
    <div className={css.outputColor}>
      <span
        className={css.formatColor}
        onClick={copyColor}
        style={{
          background: `hsl(${infoColor.color}, ${infoColor.saturation}%, ${
            infoColor.light + infoColor.dark
          }%)`,
          /**
           * @todo a;adir condiciones para que cambie de color dependiendo el color
           */
          color: infoColor.dark + infoColor.light < 45 ? 'white' : 'black',
        }}
      >
        hsl({infoColor.color}, {infoColor.saturation}%,
        {infoColor.dark + infoColor.light}%)
      </span>
      {/* <button className={css.openFormatColor}>
        <ArrowIcon />
      </button> */}
    </div>
  )
}
