import { Tools } from './enums'

export interface ToolsProvider {
  /** value of the tool to be used */
  toolSelect: Tools
  /** sets a new value of the tool to be used */
  setToolSelect: React.Dispatch<React.SetStateAction<Tools>>
}
