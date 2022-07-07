

// Drop down - applicant - who's being assigned the quiz
// Input - Question? (title like)
// Buttons - Create quiz/template

import {getUserlist} from "../Store/reduxFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

export function QuizInput(props) {

    const {newQuiz = {
        question: "",
        grade: "",
        finished: false,
        applicant: ""
    }} = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserlist())
    }, [])

    let userList = useSelector(state => state.user.userList)

    const [formState, setFormState] = useState(newQuiz)

    function onFormSubmit(e) {
        e.preventDefault()
        //dispatch
    }

    function onQuestionChange(e) {
        setFormState({
            ...formState,
            question: e.target.value
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

    return<>
        <form onSubmit={onFormSubmit}>
            <label>
                Question:
                <input onChange={onQuestionChange} value={formState.question} type={'text'} placeholder={"Question"}/>
            </label>
            <label>
                Grade:
                <input onChange={onGradeChange} value={formState.grade} type={'text'} placeholder={"Grade"}/>
            </label>

            <label>
                Finished:
                <input onChange={onFinishedChange} checked={formState.finished} type={'checkbox'}/>
            </label>

            <label>
                Applicant:
                <select onChange={onApplicantChange} defaultValue={"Applicant"}>
                <option key={"applicant"} value={"applicant"} disabled>
                    Applicant
                </option>
                    {
                        userList.map((user, idx) => {
                            if(user.applicant) {
                                return <option key={"quizInput" + idx} value={user.username}>
                                    {user.username}
                                </option>
                            }
                        })
                    }
                </select>
            </label>

            <button>Submit</button>
        </form>
    </>
}