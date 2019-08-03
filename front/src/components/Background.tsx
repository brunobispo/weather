import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import background from '../assets/background.mp4'

const Video = styled(animated.video)`
  position: absolute;
  z-index: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
`

function Background() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current) ref.current!.playbackRate = 0.7
  })

  const props = useSpring({ from: { opacity: 0 }, opacity: 1, delay: 400 })

  return (
    <Video ref={ref} autoPlay loop style={props}>
      <source src={background} type='video/mp4' />
    </Video>
  )
}

export default Background
