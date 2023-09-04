import React from 'react'
import css from './BarDocument.module.css'
interface BarDocumentProps {}

const Edit = {
  name: 'Edit',
  option: [
    {
      name: 'undo',
      action: (e: React.MouseEvent<HTMLLIElement>) => {
      },
    },
    {
      name: 'redo',
      action: (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(e)
      },
    },
  ],
}

const menu = [
  {
    name: 'File',
    option: [
      {
        name: 'new',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
      {
        name: 'open',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
      {
        name: 'save',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
      {
        name: 'export',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
      {
        name: 'close',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
      {
        name: 'import',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
      {
        name: 'exit',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
    ],
  },
  Edit,
  {
    name: 'View',
    option: [
      {
        name: '',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
    ],
  },
  {
    name: 'Help',
    option: [
      {
        name: '',
        action: (e: React.MouseEvent<HTMLLIElement>) => {
          console.log(e)
        },
      },
    ],
  },
]

function OptionBar({
  option,
}: {
  option: { name: string; action: (e: React.MouseEvent<HTMLLIElement>) => void }
}) {
  return <li onClick={option.action}>{option.name}</li>
}

function ListBarMenu({ item }: { item: (typeof menu)[0] }) {
  return (
    <ul className={css.listOption}>
      {item.option.map((option, key) => (
        <OptionBar key={key} option={option} />
      ))}
    </ul>
  )
}

export default function BarDocument({}: BarDocumentProps) {
  return (
    <ul className={css.menuDocument}>
      {menu.map((item, key) => (
        <li key={key} className={css.optionMenu}>
          {item.name}
          <ListBarMenu item={item} />
        </li>
      ))}
    </ul>
  )
}
