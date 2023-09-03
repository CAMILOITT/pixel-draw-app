import { Tools } from '../../../types/tools/enums'

export const Context: {
  toolSelect: Tools
  setToolSelect: (value: React.SetStateAction<Tools>) => void
} = {
  toolSelect: Tools.brush,
  setToolSelect: value => value,
}
