import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Form, Dropdown, Button } from 'react-bootstrap'

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const [quizzSelected, setQuizzSelected] = useState([])
  const [allAnswers, setAllAnswers] = useState([])
  const [arr, setArr] = useState([])

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

  //   console.log('data: ', data)

  const handleCategory = (e) => {
    Object.values(data).forEach((val) => {
      //   console.log(val.name)

      // Get the name by selected id
      // eslint-disable-next-line no-undef
      if (e === val.name) {
        setCategoryId(data.indexOf(val) + 9)
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
      console.log('categoryId: ', categoryId)
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      )
      setQuizzSelected(data.results)
      console.log('quizzSelected:*** ', quizzSelected)

      // loop through every single object
      for (let i = 0; i < quizzSelected.length; i++) {
        let object = quizzSelected[i]
        console.log('object: ', object)

        // Convert incorrect_answers to an array of objects
        const inc_answers = object.incorrect_answers.map((str, index) => ({
          value: str,
          id: index,
        }))

        // Convert correct answer to an object
        const corr_answer_to_object = JSON.parse(
          JSON.stringify({
            value: object.correct_answer,
            id: 3,
          })
        )
        // console.log('corr_answer_to_object: ', corr_answer_to_object)

        // Concatenate all answers (Note that the last element is always the correct answer)
        const concatenatedArrays = [
          ...inc_answers,
          // quizzSelected[i].correct_answer,
          corr_answer_to_object,
        ]

        console.log('all_answers_of_single_object: ', concatenatedArrays)
        // for (let i = 0; i < concatenatedArrays.length; i++) {
        //   const concatenated_answers = []
        //   let res = []
        //   let res_1 = []
        //   concatenated_answers.push(concatenatedArrays[i])
        //   console.log('concatenated_answers!!!: ', concatenated_answers)
        //   // extract value from property
        //   const answers_single_question = concatenated_answers.map((item) => {
        //     console.log('item???: ', item)
        //     // for (let i = 0; i < concatenated_answers.length; i++) {
        //     //   res.push(concatenated_answers[i])
        //     // }
        //     // res.push(item)
        //     res = [item, item, item, item]
        //     return item
        //   })
        //   // for (let i = 0; i < concatenated_answers.length; i++) {
        //   //   res = [
        //   //     answers_single_question[0],
        //   //     answers_single_question[0],
        //   //     answers_single_question[0],
        //   //     answers_single_question[0],
        //   //   ]
        //   //   // res.push(answers_single_question[0])
        //   //   console.log('res: ', res)
        //   // }
        //   console.log('res***: ', res)
        //   setArr(res)
        //   console.log('answers_single_question---: ', answers_single_question)

        //   // ***

        //   // for (let i = 0; i < 4; i++) {
        //   //   res.push(concatenated_answers[i])
        //   // }
        //   // console.log('res---: ', res)

        //   // concatenated_answers.forEach((element) => {
        //   //   res.push(element[0])
        //   // })
        // }
        // console.log('resresres: ', arr)
        setAllAnswers(concatenatedArrays)
      }
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
        {quizzSelected.map((res, index) => (
          <div key={index}>
            <p>{res.question}</p>
          </div>
        ))}
        {allAnswers?.map((answer, index) => (
          <Button
            //   onClick={selectHandler}
            //   id='createBtn'
            key={index}
            variant='light'
            type='button'
          >
            {answer.value}
          </Button>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
