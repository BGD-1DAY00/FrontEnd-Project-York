import {Quiz} from "../Quiz/Quiz.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getQuizList} from "../Store/reduxFunctions";
import {Card, Col} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";

export function QuizList() {

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getQuizList());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const quizList = useSelector(state => state.quiz.quizList)

    const ungradedQuizList = quizList.filter(quiz => quiz.finished === false)
    const gradedQuizList = quizList.filter(quiz => quiz.finished === true)

    return <>
        <div className={'row'}>
        <Col>
        <Card className={'m-2 col p-2'}>
        <CardHeader className={'h2 text-center'}>Unfinished Quizzes</CardHeader>
        <div className={'ungraded'}>

            {
                ungradedQuizList.map((quizData, idx) => {
                    return <div key={"ungraded" + idx} className={'ungradedQuizList'}>
                        <Quiz quizData={quizData}/>
                        {/*<_Quiz quiz={quizData} onEditSelect={onEditSelect} onDelete={onDelete}/>*/}
                                                    {/*questioning whether we will need this*/}
                    </div>
                })
            }
        </div>
            </Card>
        </Col>
        <Col>
        <Card className={'m-2 col p-2'}>
            <CardHeader className={'h2 text-center'}>Finished Quizzes</CardHeader>
        <div className={'graded'}>
            {
                gradedQuizList.map((quizData, idx) => {
                    return <div key={"graded" + idx} className={'gradedQuizList'}>
                        <Quiz quizData={quizData}/>
                        {/*<_Quiz quiz={quizData} onEditSelect={onEditSelect} onDelete={onDelete}/>*/}
                                                    {/*questioning whether we will need this*/}
                    </div>
                })
            }
        </div>
        </Card>
        </Col>
        </div>
    </>

}