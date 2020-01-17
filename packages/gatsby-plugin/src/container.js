/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import React from 'react'
import { Context, useDeck } from './context'
import modes from './modes'
import Header from './header'
import Footer from './footer'
import Slide from './slide'
import Clock from './clock'
import Timer from './timer'

const Main = ({
  width = '100vw',
  height = '100vh',
  preview = false,
  ...props
}) => {
  const outer = useDeck()
  const context = {
    ...outer,
    main: !preview,
  }

  return (
    <Context.Provider value={context}>
      <div
        sx={{
          width,
          height,
          position: 'relative',
          overflow: 'hidden',
        }}>
        {props.header && (
          <Header>
            {props.header}
          </Header>
        )}
        {props.children}
        {props.footer && (
          <Footer>
            {props.footer}
          </Footer>
        )}
      </div>
    </Context.Provider>
  )
}

const Presenter = props => {
  const next = props.slides[props.index + 1]

  return (
    <div
      sx={{
        display: 'flex',
        height: '100vh',
        bg: 'backdrop',
      }}>
      <div
        sx={{
          width: '60%',
          height: '100vh',
          padding: 3,
        }}>
        <Main
          {...props}
          width='100%'
          height='100%'>
          <Slide>
            {props.slide}
          </Slide>
        </Main>
      </div>
      <Flex
        sx={{
          flexDirection: 'column',
          width: '40%',
          height: '100vh',
          py: 3,
          pr: 3,
          overflowY: 'auto',
        }}>
        <Slide
          width='100%'
          height='100vh'
          zoom={1/2}
          sx={{
          }}>
          {next}
        </Slide>
        <div
          sx={{
            py: 3,
            flex: '1 1 auto',
          }}>
          {props.notes}
        </div>
        <Flex
          sx={{
            fontFamily: '"Roboto Mono", Menlo, monospace',
          }}>
          <Box>
            {props.index} / {props.slides.length - 1}
          </Box>
          <Box mx='auto' />
          <Box>
            <Timer />
            {' '}
            <Clock />
          </Box>
        </Flex>
      </Flex>
    </div>
  )
}

const Overview = props => {
  return (
    <div
      sx={{
        display: 'flex',
        height: '100vh',
      }}>
      <div
        sx={{
          width: '25%',
          height: '100vh',
          overflowY: 'auto',
          paddingRight: 3,
          outline: '2px solid red',
        }}>
        {props.slides.map((slide, i) => (
          <Slide key={i}
            sx={{
              outline: '2px solid cyan',
            }}
            width='100%'
            height='25%'
            zoom={1/4}>
            {slide}
          </Slide>
        ))}
      </div>
      <div
        sx={{
          width: '75%',
        }}>
        <Main
          {...props}
          width='75vw'
          height='100vh'>
          <Slide zoom={3/4}>
            {props.slide}
          </Slide>
        </Main>
      </div>
    </div>
  )
}

export default props => {
  const context = useDeck()

  switch (context.mode) {
    case modes.presenter:
      return <Presenter {...props} {...context} />
    case modes.overview:
      return <Overview {...props} {...context} />
    case modes.default:
    default:
      return <Main {...props} {...context} />
  }
}
