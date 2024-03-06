import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Renderer } from './core/renderer'
import { fooScene } from './core/t'

const renderer = new Renderer(fooScene);


export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}
