import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import {
  createEvent,
  fireEvent,
  userEvent,
  within,
} from '@storybook/testing-library'
import cssBarTools from '../../components/barTools/BarTools.module.css'
import JoinRoom from './JoinRoom'

const meta: Meta<typeof JoinRoom> = {
  title: 'v1/Page/JoinRoom',
  component: JoinRoom,
  args: {},
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement, step }) => {
    const { getByRole, findByRole, /* findAllByRole */ } = within(canvasElement)
    const layerDrawing = getByRole('layerDrawing')
    const layerMouse = getByRole('layerMouse')
    const nav = getByRole('navigation')
    const menuTools = getByRole('menuTools')
    const menuColor = getByRole('menuColor')
    const colorSelectorBox = getByRole('ColorSelectorBox')
    const btnBrush = getByRole('buttonBrush')
    const selectBrush = getByRole('combobox')

    await step(
      'comprobando que los componentes se encuentren renderizados',
      async () => {
        await expect(layerDrawing).toBeInTheDocument()
        await expect(layerMouse).toBeInTheDocument()
        await expect(nav).toBeInTheDocument()
        await expect(menuTools).toBeInTheDocument()
        await expect(menuColor).toBeInTheDocument()
        await expect(colorSelectorBox).toBeInTheDocument()
        await expect(selectBrush).toBeInTheDocument()

        await step('comprobando valores iniciales', async () => {
          await expect(colorSelectorBox.textContent).toContain(
            'hsla(0, 100%, 50%, 1)'
          )
          await expect(btnBrush).toHaveClass(cssBarTools.InUse)
          await expect(selectBrush).toHaveValue('square')
        })
      }
    )

    await step('interacción con el canvas', async () => {
      await step('cambiando de color', async () => {
        const hue = getByRole('sliderHue')
        const saturation = getByRole('sliderSaturation')
        const lightness = getByRole('sliderLightness')
        const alpha = getByRole('sliderAlpha')

        const color = {
          hue: 20,
          saturation: 80,
          lightness: 60,
          alpha: 1,
        }

        fireEvent.change(hue, { target: { value: color.hue } })
        fireEvent.change(saturation, { target: { value: color.saturation } })
        fireEvent.change(lightness, { target: { value: color.lightness } })
        fireEvent.change(alpha, { target: { value: color.alpha } })

        await expect(hue).toHaveValue(`${color.hue}`)
        await expect(saturation).toHaveValue(`${color.saturation}`)
        await expect(lightness).toHaveValue(`${color.lightness}`)
        await expect(alpha).toHaveValue(`${color.alpha}`)

        const colorSelectorBox = await findByRole('ColorSelectorBox')
        const colorPanelPrimary = await findByRole('colorPanelPrimary')

        await expect(colorSelectorBox.textContent).toBe(
          `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
        )
        await expect(colorPanelPrimary).toHaveAttribute(
          'data-color',
          `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
        )
      })

      await step('añadiendo color a la lista', async () => {
        const btnAddColor = getByRole('addColor')
        fireEvent.click(btnAddColor)

        const listColors = await findByRole('listColor')
        await expect(listColors.children.length).toBe(2)
      })

      await step('dibujando un cuadrado en el canvas', async () => {
        const layerMouse = await findByRole('layerMouse')

        const { left, top } = layerMouse.getBoundingClientRect()
        const initialDrawing = { clientX: left + 200, clientY: top + 200 }
        const finalDrawing = { clientX: left + 270, clientY: top + 250 }
        const space = 10
        const centerSquare = {
          clientY:
            initialDrawing.clientY +
            (finalDrawing.clientY - initialDrawing.clientY) / 2,
          clientX:
            initialDrawing.clientX +
            (finalDrawing.clientX - initialDrawing.clientX) / 2,
        }
        await userEvent.type(layerMouse, 'b')

        fireEvent(layerMouse, createEvent.mouseDown(layerMouse, initialDrawing))

        for (
          let i = initialDrawing.clientX;
          i <= finalDrawing.clientX;
          i += space
        ) {
          fireEvent(
            layerMouse,
            createEvent.mouseMove(layerMouse, {
              clientX: i,
              clientY: initialDrawing.clientY,
            })
          )
          fireEvent(
            layerMouse,
            createEvent.mouseMove(layerMouse, {
              clientX: i,
              clientY: finalDrawing.clientY,
            })
          )
        }

        for (
          let i = initialDrawing.clientY;
          i <= finalDrawing.clientY;
          i += space
        ) {
          fireEvent(
            layerMouse,
            createEvent.mouseMove(layerMouse, {
              clientX: initialDrawing.clientX,
              clientY: i,
            })
          )
          fireEvent(
            layerMouse,
            createEvent.mouseMove(layerMouse, {
              clientX: finalDrawing.clientX,
              clientY: i,
            })
          )
        }
        fireEvent.mouseUp(layerDrawing)
        await userEvent.type(layerMouse, 'd')

        await step('obtener el color de una parte del canvas', async () => {
          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))

          let colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).not.toBe(
            'hsla(20, 80%, 60%, 1)'
          )

          fireEvent(layerMouse, createEvent.click(layerMouse, finalDrawing))

          colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).toBe(
            'hsla(20, 80%, 60%, 1)'
          )
        })
        const color = {
          hue: 222,
          saturation: 90,
          lightness: 50,
          alpha: 1,
        }

        await step('rellenar el cuadrado', async () => {
          const btnBucket = getByRole('buttonFillBucket')
          await userEvent.click(btnBucket)
          await userEvent.type(layerMouse, 'x')
          const hue = await findByRole('sliderHue')
          const saturation = await findByRole('sliderSaturation')
          const lightness = await findByRole('sliderLightness')
          const alpha = await findByRole('sliderAlpha')

          fireEvent.change(hue, { target: { value: color.hue } })
          fireEvent.change(saturation, {
            target: { value: color.saturation },
          })
          fireEvent.change(lightness, {
            target: { value: color.lightness },
          })
          fireEvent.change(alpha, { target: { value: color.alpha } })
          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))
          await userEvent.type(layerMouse, 'd')
          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))
          const colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).toBe(
            `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
          )
        })

        await step('deshacer', async () => {
          const btnUndo = getByRole('buttonUndo')
          await userEvent.click(btnUndo)
          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))
          const colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).not.toBe(
            `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
          )
        })

        await step('rehacer', async () => {
          const btnRedo = getByRole('buttonRedo')
          await userEvent.click(btnRedo)
          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))
          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))
          const colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).toBe(
            `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
          )
        })

        await step('borrar partes del interior del cuadrado', async () => {
          const btnEraser = getByRole('buttonEraser')
          await userEvent.click(btnEraser)
          fireEvent(layerMouse, createEvent.mouseDown(layerMouse, centerSquare))
          fireEvent(layerMouse, createEvent.mouseUp(layerMouse, centerSquare))
          const btnEyeDropper = getByRole('buttonEyeDropper')
          await userEvent.click(btnEyeDropper)

          fireEvent(layerMouse, createEvent.click(layerMouse, centerSquare))

          let colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).not.toBe(
            `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
          )

          fireEvent(
            layerMouse,
            createEvent.click(layerMouse, {
              clientX: centerSquare.clientX - space,
              clientY: centerSquare.clientY + space,
            })
          )

          colorSelectorBox = await findByRole('ColorSelectorBox')
          await expect(colorSelectorBox.textContent).toBe(
            `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`
          )
        })

      //   await step('cambiar el tamaño del cuadrado', async () => {
      //     await userEvent.click(btnBrush)

      //     await step('x2', async () => {
      //       const selectBrush = await findByRole('combobox')
      //       const inputSize = await findByRole('spinbutton')
      //       await userEvent.selectOptions(selectBrush, ShapesBrush.square)
      //       await expect(selectBrush).toHaveValue('square')
      //       await userEvent.click(inputSize)
      //       await userEvent.keyboard('2{enter}')
      //       let colorSelectorBox = await findByRole('ColorSelectorBox')

      //       const hue = await findByRole('sliderHue')
      //       const saturation = await findByRole('sliderSaturation')
      //       const lightness = await findByRole('sliderLightness')
      //       const alpha = await findByRole('sliderAlpha')

      //       const newColor = {
      //         hue: 301,
      //         saturation: 50,
      //         lightness: 50,
      //         alpha: 1,
      //       }

      //       fireEvent.change(hue, { target: { value: newColor.hue } })
      //       fireEvent.change(saturation, {
      //         target: { value: newColor.saturation },
      //       })
      //       fireEvent.change(alpha, { target: { value: newColor.alpha } })
      //       fireEvent.change(lightness, {
      //         target: { value: newColor.lightness },
      //       })

      //       await expect(colorSelectorBox.textContent).toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )
      //       fireEvent(
      //         layerMouse,
      //         createEvent.mouseDown(layerMouse, initialDrawing)
      //       )
      //       fireEvent(
      //         layerMouse,
      //         createEvent.mouseUp(layerMouse, initialDrawing)
      //       )

      //       const btnEyeDropper = getByRole('buttonEyeDropper')

      //       await userEvent.click(btnEyeDropper)

      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX + space,
      //           clientY: initialDrawing.clientY + space,
      //         })
      //       )

      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )

      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX,
      //           clientY: initialDrawing.clientY + space,
      //         })
      //       )
      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).not.toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )

      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX + space,
      //           clientY: initialDrawing.clientY,
      //         })
      //       )
      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).not.toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )
      //     })

      //     await step('x3', async () => {
      //       await userEvent.click(btnBrush)
      //       const selectBrush = await findByRole('combobox')

      //       await userEvent.selectOptions(selectBrush, ShapesBrush.rectangle)
      //       await expect(selectBrush).toHaveValue(ShapesBrush.rectangle)
            // const [inputWidth, inputHeight] = await findAllByRole('spinbutton')

      //       await userEvent.click(inputWidth)
      //       await userEvent.keyboard('3')
      //       await userEvent.click(inputHeight)
      //       await userEvent.keyboard('2')

      //       await expect(inputWidth).toHaveValue(3)
      //       await expect(inputHeight).toHaveValue(2)
      //       let colorSelectorBox = await findByRole('ColorSelectorBox')
      //       const hue = await findByRole('sliderHue')
      //       const saturation = await findByRole('sliderSaturation')
      //       const lightness = await findByRole('sliderLightness')
      //       const alpha = await findByRole('sliderAlpha')
      //       const newColor = {
      //         hue: 100,
      //         saturation: 50,
      //         lightness: 50,
      //         alpha: 1,
      //       }
      //       fireEvent.change(hue, { target: { value: newColor.hue } })
      //       fireEvent.change(saturation, {
      //         target: { value: newColor.saturation },
      //       })
      //       fireEvent.change(alpha, { target: { value: newColor.alpha } })
      //       fireEvent.change(lightness, {
      //         target: { value: newColor.lightness },
      //       })
      //       await expect(colorSelectorBox.textContent).toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )

      //       fireEvent(
      //         layerMouse,
      //         createEvent.mouseDown(layerMouse, initialDrawing)
      //       )
      //       fireEvent(
      //         layerMouse,
      //         createEvent.mouseUp(layerMouse, initialDrawing)
      //       )
      //       const btnEyeDropper = getByRole('buttonEyeDropper')
      //       await userEvent.click(btnEyeDropper)
      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX - space * 2,
      //           clientY: initialDrawing.clientY,
      //         })
      //       )
      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )
      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX,
      //           clientY: initialDrawing.clientY - space * 2,
      //         })
      //       )
      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )
      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX,
      //           clientY: initialDrawing.clientY + space * 2,
      //         })
      //       )
      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).not.toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )
      //       fireEvent(
      //         layerMouse,
      //         createEvent.click(layerMouse, {
      //           clientX: initialDrawing.clientX + space * 2,
      //           clientY: initialDrawing.clientY,
      //         })
      //       )
      //       colorSelectorBox = await findByRole('ColorSelectorBox')
      //       await expect(colorSelectorBox.textContent).not.toBe(
      //         `hsla(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%, ${newColor.alpha})`
      //       )
      //     })
      //   })
      //   await step('cambiar el tamaño del rectángulo', async () => {
      //     await step('x2', async () => {})
      //     await step('x3', async () => {})
      //   })
      })
    })

    await step('configurar canvas', async () => {})
    await step('descargar el canvas en una imagen', async () => {})
    await step('mover canvas', async () => {})
    // 400 lineas como mínimo a 500 lineas como máximo
  },
}

export default meta

type Story = StoryObj<typeof JoinRoom>

export const Default: Story = {
  args: {},
}

export const Brush: Story = {}
