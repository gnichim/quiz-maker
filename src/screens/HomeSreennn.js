import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Form, Dropdown, Button } from 'react-bootstrap'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const [quizzSelected, setQuizzSelected] = useState([])

  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let { data } = await axios.get('https://opentdb.com/api_category.php')
        setData(data.trivia_categories)
      } catch (error) {
        console.error(error.message)
      }
      setLoading(false)
    }

    const concatenated_array = async () => {
      for await (const element of quizzSelected) {
        console.log('element: ', element)
        const all_answers = [
          ...element.incorrect_answers,
          element.correct_answer,
        ]
        setAnswers(all_answers)
        console.log('answers: ', answers)
      }
    }

    fetchData()

    if (quizzSelected) {
      concatenated_array()
    }

    // concatenated_array()

    // fetch('https://opentdb.com/api_category.php')
    //   .then((response) => response.json())
    //   .then((data) => setData(data.trivia_categories))
    // eslint-disable-next-line no-use-before-define
  }, [answers, quizzSelected])

  //   console.log('data: ', data)

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
    console.log('selectHandler')
    try {
      setLoading(true)
      console.log('categoryId: ', categoryId)
      console.log('difficulty: ', difficulty)
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      )
      setQuizzSelected(data.results)
      console.log('quizzSelected:*** ', quizzSelected)
      // Concatenating arrays of correct and incorrect answers
      // quizzSelected.forEach( (element) => {
      //   // console.log('element: ', element)
      //   let all_answers =  [
      //     ...element.incorrect_answers,
      //     element.correct_answer,
      //   ]
      //    setAnswers(all_answers)
      //   console.log('answers: ', answers)
      // })

      // for await (const element of quizzSelected) {
      //   console.log('element: ', element)
      //   const all_answers = [
      //     ...element.incorrect_answers,
      //     element.correct_answer,
      //   ]
      //   setAnswers(all_answers)
      //   console.log('answers: ', answers)
      // }
      // setLoading(false)
    } catch (error) {
      console.error(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <h1>QUIZ MAKER</h1>
      {/* <Row>
        {data.map((category) => (
          <Col>
            <h3>{category.name}</h3>
          </Col>
        ))}
      </Row> */}
      {/* <ListGroup.Item className='pt-5'> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className='pt-5'>
            {/* <Col>
            <Form.Control
              as='select'
              // value={qty}
              // onChange={(e) => setQty(e.target.value)}
            >
              {data.map((x) => (
                <option key={x.id - 9}>{x.name}</option>
              ))}
            </Form.Control>
          </Col> */}
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
            {quizzSelected?.map((res, index) => (
              <div key={index}>
                <p>{res.question}</p>
                {answers.map((inc, index) => (
                  <button key={index}>{inc}</button>
                ))}

                {/* {answers?.map((answer, index) => (
              <Button
                //   onClick={selectHandler}
                //   id='createBtn'
                variant='light'
                type='button'
                key={index}
              >
                {answer}
              </Button>
            ))} */}
              </div>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
