import { Habit } from './components/Habit'

import './styles/global.css'

export function App() {
  return (
    <>
      <Habit completed={5} />
      <Habit completed={3} />
      <Habit completed={0} />
      <Habit completed={2} />
      <Habit completed={1} />
      <Habit completed={4} />
      <Habit completed={8} />
    </>
  )
}

