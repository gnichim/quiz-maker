import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import HomeScreen from './screens/HomeScreen'
import ResultsQuizz from './screens/ResultsQuizz'

const App = () => {
  const [dataFromHome, setDataFromHome] = useState([])

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/quiz-maker'
            element={<HomeScreen onSubmit={setDataFromHome} />}
            exact
          />
          <Route
            path='/results'
            element={<ResultsQuizz data={dataFromHome} />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
