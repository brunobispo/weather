import React from 'react'
import styled from 'styled-components'
import { useTrail, animated, config } from 'react-spring'

const Container = styled.div`
  display: flex;
  color: #fff;
  filter: drop-shadow(2px 2px 2px #00000033);
`

const Text = styled.span`
  display: flex;
  font-family: Quicksand;
  line-height: 1em;
  font-size: 13em;
  font-weight: bold;
  letter-spacing: -10px;
`

const Unit = styled(animated.span)`
  font-size: 2.6em;
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
  padding: 30px 10px;
`

export interface TemperatureProps {
  children: string
  unit: 'F' | 'C'
}

function Temperature({ children, unit }: TemperatureProps) {
  const items = children.split('')
  const transitions = useTrail(items.length + 1, {
    trail: 1,
    from: { transform: 'translateY(-50px)', opacity: 0 },
    transform: 'translateY(0)',
    opacity: 1,
    ...config.molasses
  })

  if (!items.length) return null

  return (
    <Container>
      <Text>
        {items.map((item, key) => (
          <animated.div style={transitions[key]} key={item}>
            {items[key]}
          </animated.div>
        ))}
      </Text>
      <Unit key={children} style={transitions[items.length]}>
        &deg;{unit}
      </Unit>
    </Container>
  )
}

export default Temperature
