

// Drop down - applicant - who's being assigned the quiz
// Input - Question? (title like)
// Buttons - Create quiz/template

import {editQuiz, getQuizList, getUserList, initiateCreateQuiz} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, useRef} from "react";
import {Button, Card, Dropdown, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";

export function QuizInput() {

    let newQuiz = {
            quizQuestion: "",
            quizAnswer: "",
            grade: "",
            finished: false,
            applicant: ""
        }

    const dropdown = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserList())
    }, [])

    let {userList, quizEditing, selectedQuiz} = useSelector(state => ({
        userList: state.user.userList,
        quizEditing: state.quiz.quizEditing,
        selectedQuiz: state.quiz.selectedQuiz
    }) )


    const [formState, setFormState] = useState(newQuiz)
    useEffect(() => {
        if (selectedQuiz) {
            setFormState(selectedQuiz[0])
        } else {
            setFormState(newQuiz)
        }
    }, [selectedQuiz,])  // we may want to think about adding a dependency for the dropdown (user.username) changing. This may fix our bug.

    function onFormSubmit(e) {
        e.preventDefault()
        if(formState.quizQuestion === "") {
            return
        }
        if (formState.applicant === "" || formState.applicant === "Applicant") {
            return
        }
        //dispatch
        // dispatch(initiateCreateQuiz(formState.quizQuestion, formState.applicant, formState.finished, formState.grade))
        if(!quizEditing) {
            dispatch(initiateCreateQuiz(formState))
            dropdown.current.value = "Applicant"
        }
        else {
            dispatch(editQuiz(formState, selectedQuiz[0].id))
        }
        dispatch(getQuizList())
        setFormState(newQuiz)
    }


    function onQuestionChange(e) {
        setFormState({
            ...formState,
            quizQuestion: e.target.value
        })
    }

    function onAnswerChange(e) {
        setFormState({
            ...formState,
            quizAnswer: e.target.value
        })
    }

    function onGradeChange(e) {
        setFormState({
            ...formState,
            grade: e.target.value
        })
    }

    function onFinishedChange(e) {
        setFormState({
            ...formState,
            finished: e.target.checked
        })
    }

    function onApplicantChange(e) {
        setFormState({
            ...formState,
            applicant: e.target.value
        })
    }

    console.log(selectedQuiz, quizEditing)

    return<>
        <Card style={{backgroundColor:'#607744', color:'#E7DFC6'}} className={'m-auto border-secondary row w-65'}>
            <CardHeader className={'h3 float-start text-center'}>Quiz Template</CardHeader>

        <form onSubmit={onFormSubmit}>

            <FormGroup>
            <FormLabel style={{backgroundColor:'#607744', color:'#E7DFC6'}}  >
                Question:
            </FormLabel>
                <FormControl required onChange={onQuestionChange}
                             value={formState.quizQuestion}
                             type={'text'}
                             // placeholder={"Question"}
                />
            </FormGroup>
            <br/>
            <FormGroup>
                <FormLabel style={{backgroundColor:'#607744', color:'#E7DFC6'}}  >
                    Answer:
                </FormLabel>
                <FormControl onChange={onAnswerChange}
                             value={formState.quizAnswer}
                             type={'text'}
                />
            </FormGroup>
            <br/>
            <FormGroup>
            <Dropdown >
                <h4>
                    Applicant must be selected.
                </h4>
                <FormLabel>
                Applicant:
                </FormLabel>
                <select ref={dropdown} onChange={onApplicantChange} defaultValue={quizEditing ? selectedQuiz[0].applicant ? dropdown.current.value = selectedQuiz[0].applicant : "Applicant" : "Applicant"}>
                    <option key={"applicant"} value={"Applicant"}>
                        Applicant
                    </option>
                    {
                        userList.map((user, idx) => {
                            if (user.applicant) {
                                return <option key={"quizInput" + idx} value={user.username}>
                                    {user.username}
                                </option>
                            }
                        })
                    }
                </select>
            </Dropdown>
            </FormGroup>

            <FormGroup>
                <FormLabel className={'mt-3 input-group-sm'}>
                    Grade:
                    <FormControl onChange={onGradeChange}
                                 value={formState.grade}
                                 type={'text'}
                                 // placeholder={"Grade"}
                    />
                </FormLabel>
            </FormGroup>
            <Card.Footer>
            <FormGroup className={'text-center'}>
                <FormLabel className={''}>
                    Finished:
                    <input onChange={onFinishedChange} checked={formState.finished} type={'checkbox'} className={'m-1'}/>
                </FormLabel>


            <Button onClick={onFormSubmit} className={'m-1'} variant={'primary'}>Submit</Button>
            </FormGroup>
            </Card.Footer>
        </form>
        </Card>
    </>
}