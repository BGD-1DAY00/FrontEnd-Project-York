import {CREATE_USER_FAILED, CREATE_USER_SUCCESS, GET_QUIZ_LIST, GET_USERLIST, LOGIN_SUCCESS, CREATE_QUIZ} from "./actions";


const initLogin = {
    role: null,
    token: null
}
export function login(state = initLogin, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                role: action.role
            }
        default:
            return{
                ...state
            }
    }
}

const initCreateUser = {
    createUserMessage: ''
}

export function admin(state = initCreateUser, action) {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserMessage: 'You successfully added a user',
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                createUserMessage: 'User already exists'
            }
        default:
            return{
                ...state
            }
    }
}

const initUser = {
    userList: [],
}

export function user(state = initUser, action) {
    switch(action.type) {
        case GET_USERLIST:
            return {
                ...state,
                userList: action.userList
            }
        default:
            return {
                ...state
            }
    }
}

const initQuiz = {
    quizList: [],
}

export function quiz(state = initQuiz, action) {
    switch(action.type) {
        case GET_QUIZ_LIST:
            return {
                ...state,
                quizList: action.quizList
            }
        case CREATE_QUIZ:
            return{
                ...state,
                quizList: [...state.quizList, action.quiz]
            }
        default:
            return {
                ...state
            }
    }
}