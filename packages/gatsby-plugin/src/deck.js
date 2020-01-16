import React from 'react'
import { navigate } from '@reach/router'
import { Helmet } from 'react-helmet'
import { ThemeProvider, merge } from 'theme-ui'
import split from './split-slides'
import { Context } from './context'
import Keyboard from './keyboard'
import modes from './modes'
import Storage from './storage'
import Container from './container'
import Slide from './slide'
import baseTheme from './theme'

/**
 * TODO
 *  - [x] local storage
 *  - [x] slide styles
 *  - [x] header/footer styles
 *  - [x] print mode
 *  - [x] /print pathname
 *  - [x] presenter mode
 *  - [x] overview mode
 *  - [ ] presenter styles
 *  - [ ] overview styles
 *  - [ ] timer/clock
 *  - [ ] Ditch layouts?
 *    - [x] Image
 *    - [x] Invert
 *    - [-] FullScreenCode
 *    - [ ] Split
 *    - [ ] SplitRight
 *    - [ ] Horizontal
 *  - [ ] themes
 *  - [ ] merge themes
 *  - [ ] theme.components
 *  - [ ] base theme
 *  - [ ] test local images
 */

const getIndex = props => {
  if (!props.location) return 0
  const paths = props.location.pathname.split('/')
  const n = Number(paths[paths.length - 1]) || 0
  return n
}

const setIndex = ({ index }) => fn => {
  const n = typeof fn === 'function' ? fn(index) : fn
  navigate('/' + n)
}

export default props => {
  const slides = split(props)
  const index = getIndex(props)
  const { slug } = props.pageContext || {}
  const slide = slides[index]

  const [mode, setMode] = React.useState(modes.default)
  const toggleMode = next => setMode(current =>
    current === next ? modes.default : next
  )

  const [step, setStep] = React.useState(0)
  const [steps, setSteps] = React.useState(0)

  const lastIndex = React.useRef()
  const direction = index - lastIndex.current

  React.useEffect(() => {
    lastIndex.current = index
  },[index])

  const context = {
    slides,
    slug,
    index,
    length: slides.length,
    slide,
    mode,
    setMode,
    toggleMode,
    location: props.location,
    step,
    setStep,
    steps,
    notes: slide.notes,
    header: slides.header,
    footer: slides.footer,
  }

  context.clearSteps = () => {
    console.log('clearSteps')
    setSteps(0)
    setStep(0)
  }

  context.setSteps = l => {
    console.log('setSteps', l)
    setSteps(l)
    if (direction < 0) setStep(l)
  }

  context.setIndex = setIndex(context)

  context.previous = () => {
    if (steps && step > 0) {
      setStep(n => n - 1)
    } else {
      context.setIndex(n => n > 0 ? n - 1 : n)
      if (!!steps) context.clearSteps()
    }
  }

  context.next = () => {
    if (steps && step < steps) {
      setStep(n => n + 1)
    } else {
      context.setIndex(n => n < slides.length - 1 ? n + 1 : n)
      if (!!steps) context.clearSteps()
    }
  }

  React.useEffect(() => {
    console.log('slide change')
    // setStep(0)
    // setSteps(0)
  }, [index])

  /*
  React.useEffect(() => {
    if (props.location.pathname === '/print') {
      setMode(modes.print)
    }
  }, [])
  */

  const theme = merge(baseTheme, props.theme)
  // console.log({ step, steps, context })

  return (
    <Context.Provider value={context}>
      <Keyboard />
      <Storage />
      <Helmet>
        {slides.head.children}
      </Helmet>
      <ThemeProvider theme={theme}>
        <Container>
          <Slide>
            {slide}
          </Slide>
        </Container>
      </ThemeProvider>
    </Context.Provider>
  )
}
