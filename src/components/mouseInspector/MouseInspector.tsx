interface MouseInspectorProps {}

export default function MouseInspector({}: MouseInspectorProps) {
  return (
    <canvas
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        pointerEvents: 'revert',
      }}
      onMouseMove={e => {
        console.log(e)
      }}
    >
      tu navegador no soporta la api de Canvas por favor considere actualizar o
      utilizar otro navegador
    </canvas>
  )
}
