import {useState} from "react";
import {useDispatch} from 'react-redux';
import {initiateLogin} from "../Store/reduxFunctions";
import {Button, Card, Form} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";

export function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState();

    const dispatch = useDispatch();

    function addUsername(e){
        setUsername(e.target.value);
    }
    function addPassword(e){
        setPassword(e.target.value);
    }
    function handleRole(e){
        setRole(e.target.value)
    }
    function addUser(e){
        e.preventDefault()
        // async function to the backend
        dispatch(initiateLogin({username, password, role}))
    }

    return(
        <>
            <div className={'p-5'}>
            <Card className=  {'w-50 text-center m-auto'} >
                <CardHeader style={{backgroundColor:"seagreen", color:'floralwhite'}} className={'fs-2'}>Welcome to our Website!</CardHeader>
            <Form className={'p-0'} onSubmit={addUser} style={{backgroundColor:'floralwhite'}}>
                <Form.Group className={'p-2'}>
                <Form.Label >Username:</Form.Label>
                <input required onChange={addUsername} value={username} placeholder="username" type='text' />
                </Form.Group>

                <Form.Group >
                <Form.Label>Password:</Form.Label>
                <input onChange={addPassword} value={password} placeholder="password" type='text' />
                </Form.Group>

                <input type="radio" onChange={handleRole} name="role" value="applicant" /> Applicant
                <input type="radio" onChange={handleRole} name="role" value="recruiter" /> Recruiter
                <input type="radio" onChange={handleRole} name="role" value="admin" />  Admin
                <br/>
                <Card.Footer>
                <Button variant={"outline-success"}  type='submit'>Submit</Button>
                </Card.Footer>
            </Form>
            </Card>
            </div>
        </>
    );
}