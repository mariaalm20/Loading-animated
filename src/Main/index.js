
import * as React from 'react';
import Progress from '../ProgressCircle'
import {Container} from './styles'

const data = [
  {
  percentage: 100,
  color: '#0F7EC0',
  max: 100
}]

export default function Main() {
  return (
    <Container>
        {data.map((item, index) => {
          return <Progress key={index} percentage={item.percentage} color={item.color} delay={800 + 100 * index} max={item.max}/>
        })}
    </Container>
  );
}
