import {useEffect, useState} from "react";
import {findSpecificUser, getQuizList, getUserList, answerQuiz} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {GO_HOME} from "../Store/actions";
import {Card} from "react-bootstrap";

export function Applicant(){

    const dispatch =useDispatch()
    const quizList =useSelector(state=>state.quiz.quizList)
    //filter the quizlist through the current User
    const currentUser = useSelector(state=>state.login.currentUser)
    const filteredList = quizList.filter(s=>s.applicant === currentUser)
    //user
    useEffect(() => {
        dispatch(getUserList())
        dispatch(getQuizList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [formState, setFormState] = useState('')

    // takes in the applicant's quiz id to send to be passed into a redux function
    function Answer(s) {
        // dispatches function with the user's answer and quiz id
        dispatch(answerQuiz(formState.toString(), s))
        setFormState('')
    }

    function onAnswerChange(e) {
        setFormState(e.target.value)
    }

    return(
        <>
            <div>
                <h2>Quiz to take</h2>
            </div>

            {/*filters the unfinished quizzes from the user's assigned quizzes*/}
            {/*we then map over that new array, returning the user's quiz information*/}
            {filteredList.filter(s => s.finished === false).map((p)=>{
                return <div key={p.id} style={{marginBottom: '1rem'}}>
                    <div style={{margin: '1rem', display:'inline'}}>{p.quizQuestion}</div>
                    {/*//this is part of the onsubmit functionality*/}
                    <input onChange={onAnswerChange} type={'text'}/>
                    {/*the code below is passing the quiz id OR p.id into our answer function*/}
                    <button onClick = {() => Answer(p.id)} type={"button"}>Submit</button> <br />
                    </div>
            })}
             <h2>Completed Quiz</h2>
            {filteredList.filter(s =>s.finished === true ).map((s)=>{
                return <div key = {s.id}>
                    <Card style={{backgroundColor: '#E7DFC6', color: '#607744'}}
                          className={'d-flex float-start w-25 p-2 m-1'}
                          border={'secondary'}>

                        <span className={'text-decoration-underline'}>Quiz for: </span>{s.applicant}
                        <span className={'text-decoration-underline'}> Quiz Question: </span> {s.quizQuestion}
                        <span className={'text-decoration-underline'}> Quiz Answer: </span> {s.quizAnswer}
                        {/*might have to change this - its reading as function*/}
                        <span className={'text-decoration-underline'}> Quiz Grade: </span>{s.grade}
                        {/*<span>{quizData.applicant}</span>*/}
                        <span> {s.finished? "finished" : "incomplete"}</span>
                    </Card>

                </div>
            })}
        </>
    )
}