import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button, Container } from 'react-bootstrap'

const ResultsQuizz = ({ data }) => {
  const navigate = useNavigate()

  console.log('data***: ', data)
  const handleSubmit = () => {
    navigate('/quiz-maker')
  }

  const detectColor = (question, res) => {
    console.log('res: ', res)
    if (res === question.correct_answer) {
      return 'success'
    } else if (res === question.value && res !== question.correct_answer) {
      return 'danger'
    } else {
      return 'light'
    }
  }

  const getScore = () => {
    let count = 0
    data.forEach((element) => {
      if (element.value === element.correct_answer) {
        count++
      }
    })
    console.log('count')
    if (count < 2) {
      return (
        <Row style={{ background: 'red' }}>You Scored {count} out of 5</Row>
      )
    } else if (count < 4) {
      return (
        <Row style={{ background: 'yellow' }}>You Scored {count} out of 5</Row>
      )
    } else {
      return (
        <Row style={{ background: 'green' }}>You Scored {count} out of 5</Row>
      )
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <h1>Results</h1>

            <Row className='pt-5'>
              {data?.map((question, index) => (
                <div key={index}>
                  <p>
                    {/* {question.question} */}
                    {/* {question.question.replace(/&quot;/g, '"')} */}
                    <div
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    ></div>
                    <br />
                    {question.incorrect_answers?.map((res) => (
                      <Button
                        key={res}
                        // onClick={() => clickAnswer(index, res)}
                        variant={detectColor(question, res)}
                        type='button'
                      >
                        {/* {res} */}
                        <div dangerouslySetInnerHTML={{ __html: res }}></div>
                      </Button>
                    ))}
                  </p>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
        <Row>{getScore()}</Row>
        <Row>
          <Button variant='info' type='button' onClick={handleSubmit}>
            Create a new quizz
          </Button>
        </Row>
      </Container>
    </>
  )
}

export default ResultsQuizz
