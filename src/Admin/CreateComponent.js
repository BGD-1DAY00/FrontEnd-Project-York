import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../Store/reduxFunctions";

export function CreateComponent() {

    let {token, createUserMessage} = useSelector(state => ({
        token: state.login.token,
        createUserMessage: state.admin.createUserMessage
    }))

    const newUser = {
        username: '',
        password: '',
        applicant: false,
        recruiter: false,
        admin: false
    }

    const [formState, setFormState] = useState(newUser)

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [checked, setChecked] = useState(false)
    // console.log(checked)
    const dispatch = useDispatch();

    function updateUsername(e){
        setFormState({
            ...formState,
            username: e.target.value
        })
    }
    function updatePassword(e){
        setFormState({
            ...formState,
            password: e.target.value
        })
    }
    function updateApplicantRole() {
        setFormState({
            ...formState,
            applicant: !formState.applicant
        })
    }
    function updateRecruiterRole() {
        setFormState({
            ...formState,
            recruiter: !formState.recruiter
        })
    }
    function updateAdminRole() {
        setFormState({
            ...formState,
            admin: !formState.admin
        })
    }
    function addUser(e) {
        e.preventDefault()
        dispatch(createUser({formState: formState, token: token}))
    }

    return (
        <>
            <form onSubmit={addUser}>
                <label>Username:
                    <input onChange={updateUsername} value={formState.username} placeholder="username" type='text' />
                </label>
                <label>Password:
                    <input onChange={updatePassword} value={formState.password} placeholder="password" type='text' />
                </label>

                <input type="checkbox" onChange={updateApplicantRole} checked={formState.applicant} /> Applicant
                <input type="checkbox" onChange={updateRecruiterRole} checked={formState.recruiter} /> Recruiter
                <input type="checkbox" onChange={updateAdminRole} checked={formState.admin} />  Admin

                <button  type='submit'>Submit</button>

                {createUserMessage && <div>{createUserMessage}</div>}
                </form>
        </>   )
}