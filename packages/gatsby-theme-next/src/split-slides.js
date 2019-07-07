import React from 'react'

export default props => {
  const arr = React.Children.toArray(props.children)
  const splits = []
  const slides = []
  arr.forEach((child, i) => {
    if (child.props.mdxType === 'hr') splits.push(i)
  })
  let previousSplit = 0
  splits.forEach(i => {
    const children = [...arr.slice(previousSplit, i)]
    slides.push(children)
    previousSplit = i + 1
  })
  slides.push([...arr.slice(previousSplit)])
  return slides
}
