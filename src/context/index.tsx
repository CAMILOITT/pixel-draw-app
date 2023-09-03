import { ColorProvider } from './state/color/Color'
import { InfoCanvasProvider } from './state/infoCanvas/InfoCanvas'
import { BrushProvider } from './state/pencil/Pencil'
import { SelectorToolsProvider } from './state/selectorTools/SelectorTools'

interface StateProviderProps {
  children: React.ReactNode
}

export default function StateProvider({ children }: StateProviderProps) {
  return (
    <InfoCanvasProvider>
      <ColorProvider>
        <BrushProvider>
          <SelectorToolsProvider>{children}</SelectorToolsProvider>
        </BrushProvider>
      </ColorProvider>
    </InfoCanvasProvider>
  )
}
