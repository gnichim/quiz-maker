import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <HomeScreen />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
