import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { questions} from '../questions'

function Quiz() {

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(questions[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] =useState(0)
    let [result,setResult] =useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let optionArray = [Option1,Option2,Option3,Option4];

    const checkAnswer = (e,ans)=>{
        if(lock === false){
            if(question.ans===ans){
                e.target.classList.add("Correct");
                setLock(true);
                setScore(prev=>prev+1)
            }else{
                e.target.classList.add("Wrong");
                setLock(true);
                optionArray[question.ans-1].current.classList.add("Correct");
            }
        }
    }

    const next = () =>{
        if(lock===true){
            if (index===questions.length-1) {
                setResult(true)
                return 0

            }
            setIndex(++index)
            setQuestion(questions[index])
            setLock(false)
            optionArray.map((option)=>{
                option.current.classList.remove("Wrong")
                option.current.classList.remove("Correct")
                return null
            })
        }
    }

    const resetButton = ()=>{
        setIndex(0)
        setQuestion(questions[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

  return (
    <>
       <div className='dd' style={{height: '100vh', border: '',backgroundImage: 'url("https://t3.ftcdn.net/jpg/02/53/98/62/360_F_253986268_I3wMfXKQvcjNVcRSLDTMfKtkvbmpAj1J.jpg")',backgroundRepeat: 'no-repeat',backgroundSize: '100% 110% '}}>
        <h2 className=' d-flex justify-content-center'>Quiz Master 2K24</h2>
            <div className='quizbox container mt-5' style={{height: '70vh',width: '130vh'}}>
                {result?<></>
                :
                <>
                <Row>
                    <Col className='ms-2 mt-4 ' >
                        <div className='index fw-bolder'>{index+1} of {questions.length} questions</div>
                        <h4 className='mt-2'>{index+1}. {question.question}</h4>
                    </Col>
                    <Col className='ms-3 mt-4'>
                        <ul>
                            <li ref={Option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
                            <li ref={Option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.option2}</li>
                            <li ref={Option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
                            <li ref={Option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
                        </ul> 
                        <div className='float-end'><button onClick={next} className='btn btn-success border rounded btn1'>Next</button></div>
                    </Col>
                </Row>
                </>
                }
                {result?
                <>
                    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
                        <h2 className='mt-5'>You Scored {score} out of {questions.length}</h2>
                        <div><button onClick={resetButton} className='btn btn-danger border rounded d-flex justify-content-center align-items-center'>Play again?</button></div>
                    </div>
                </>
                :
                <></>
                }
            </div>
        </div>
    </>
  )
}

export default Quiz
 