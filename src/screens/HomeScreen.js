import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Col,
  Row,
  ListGroup,
  Dropdown,
  Button,
  Container,
} from 'react-bootstrap'

const HomeScreen = ({ onSubmit }) => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const [allAnswers, setAllAnswers] = useState([])

  const [countClickedAnswers, setCountClickedAnswers] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState([])

  const [quizzSelected, setQuizzSelected] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //   setLoading(true)
      try {
        let { data } = await axios.get('https://opentdb.com/api_category.php')
        setData(data.trivia_categories)
      } catch (error) {
        console.error(error.message)
      }
      //   setLoading(false)
    }

    fetchData()

    // fetch('https://opentdb.com/api_category.php')
    //   .then((response) => response.json())
    //   .then((data) => setData(data.trivia_categories))
  }, [])

  // console.log('data: ', data)

  const handleCategory = (e) => {
    Object.values(data).forEach((val) => {
      //   console.log(val.name)

      // Get the name by selected id
      // eslint-disable-next-line no-undef
      if (e === val.name) {
        setCategoryId(data.indexOf(val) + 9)
        // console.log('name: ', e)
        // console.log('indexxxx: ', data.indexOf(val) + 9)
        // console.log('categoryId: ', categoryId)
      }
    })

    setCategoryName(e)
  }

  const handleDifficulty = (e) => {
    setDifficulty(e)
  }

  const selectHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      )
      setQuizzSelected(data.results)
      // loop through every single object
      for (let i = 0; i < data.results.length; i++) {
        const object = data.results[i]
        console.log('object: ', object)
        data.results[i].incorrect_answers = [
          ...data.results[i].incorrect_answers,
          data.results[i].correct_answer,
        ]

        // setAllAnswers(all_answers)
        // console.log('all_answers: ', all_answers)

        // for (let i = 0; i < allAnswers.length; i++) {
        //   console.log('allAnswers[i]: ', allAnswers[i])
        //   arr.push(allAnswers[i])
        //   setA(arr)
        //   // console.log('a---: ', arr)
        // }
        // answers.forEach((ans) => {
        //   a.push(ans)
        // })
      }
    } catch (error) {
      console.error(error.message)
    }
    setLoading(false)
  }
  console.log('quizzSelected:*** ', quizzSelected)

  const clickAnswer = (
    id,
    value,
    question,
    incorrect_answers,
    correct_answer
  ) => {
    const foundedElement = selectedAnswer.find((elem) => elem.id === id)
    // setSelectedAnswer([...selectedAnswer, { id, value: res }])

    if (foundedElement) {
      if (foundedElement.value === value) {
        setSelectedAnswer([...selectedAnswer.filter((elem) => elem.id !== id)])
      } else {
        setSelectedAnswer([
          ...selectedAnswer.filter((elem) => elem.id !== id),
          { id, value, question, incorrect_answers, correct_answer },
        ])
      }
    } else {
      setSelectedAnswer([
        ...selectedAnswer,
        { id, value, question, incorrect_answers, correct_answer },
      ])
    }

    // console.log('selectedAnswer: ', selectedAnswer)

    setCountClickedAnswers(countClickedAnswers + 1)
    // console.log('countClickedAnswers: ', countClickedAnswers)
  }

  const handleSubmit = () => {
    onSubmit(selectedAnswer)
    navigate('/results')
  }

  return (
    <>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <h1>QUIZ MAKER</h1>

            <Row className='pt-5'>
              <Col>
                <Dropdown onSelect={handleCategory}>
                  <Dropdown.Toggle variant='success' id='categorySelect'>
                    {categoryName ? categoryName : 'Select a category'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {data.map((res) => (
                      <Dropdown.Item key={res.id - 9} eventKey={res.name}>
                        {res.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown onSelect={handleDifficulty}>
                  <Dropdown.Toggle variant='success' id='difficultySelect'>
                    {difficulty ? difficulty : 'Select a difficulty'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey='easy'>Easy</Dropdown.Item>
                    <Dropdown.Item eventKey='medium'>Medium</Dropdown.Item>
                    <Dropdown.Item eventKey='hard'>Hard</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <ListGroup.Item>
                  <Button
                    onClick={selectHandler}
                    id='createBtn'
                    className='btn-block'
                    type='button'
                  >
                    Create
                  </Button>
                </ListGroup.Item>
              </Col>
            </Row>
            {/* </ListGroup.Item> */}
            <Row className='pt-5'>
              {quizzSelected?.map((quizz, index) => (
                <div key={index}>
                  <p>
                    {/* {quizz.question} */}
                    {/* {quizz.question.replace(/&quot;/g, '"')} */}
                    <div
                      dangerouslySetInnerHTML={{ __html: quizz.question }}
                    ></div>

                    <br />
                    {quizz.incorrect_answers?.map((inc_ans) => (
                      <Button
                        key={inc_ans}
                        onClick={() =>
                          clickAnswer(
                            index,
                            inc_ans,
                            quizz.question,
                            quizz.incorrect_answers,
                            quizz.correct_answer
                          )
                        }
                        variant={
                          selectedAnswer.find(
                            (elem) =>
                              elem.id === index && elem.value === inc_ans
                          )
                            ? 'success'
                            : 'light'
                        }
                        type='button'
                      >
                        {/* {inc_ans} */}
                        <div
                          dangerouslySetInnerHTML={{ __html: inc_ans }}
                        ></div>
                      </Button>
                    ))}
                  </p>
                </div>
              ))}
              {selectedAnswer.length === quizzSelected.length &&
                quizzSelected.length > 0 && (
                  <Button variant='info' type='button' onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen
