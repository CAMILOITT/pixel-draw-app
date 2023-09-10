import { Tools } from '../../../types/tools/enums'
import { ToolsProvider } from '../../../types/tools/interface'

export const Context: ToolsProvider = {
  toolSelect: Tools.brush,
  setToolSelect: value => value,
}
