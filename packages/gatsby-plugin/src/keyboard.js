import React from 'react'
import { useDeck } from './context'
import modes from './modes'

export default () => {
  const state = useDeck()

  React.useEffect(() => {
    const dec = n => n > 0 ? n - 1 : n
    const inc = n => n < state.slides.length - 1 ? n + 1 : n
    const handleKeyDown = e => {
      if (e.metaKey) return
      if (e.ctrlKey) return

      if (e.altKey) {
        switch (e.key) {
          case 'P':
          case 'p':
            state.toggleMode(modes.presenter)
            break
          default:
            break
        }
      } else if (e.shiftKey) {
        switch (e.key) {
          case ' ':
            state.setIndex(dec)
            break
          default:
            break
        }
      } else {
        switch (e.key) {
          case 'ArrowRight':
          case ' ':
            state.setIndex(inc)
            break
          case 'ArrowLeft':
            state.setIndex(dec)
            break
          case 'Escape':
            console.log('TODO escape')
            break
          default:
            console.log(e.key)
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [state])

  return false
}
