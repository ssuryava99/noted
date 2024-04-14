import '../App.css';
import { signInWithNotion } from '../Notion';

function Login() {
    return (
        <div className='App'>
            <h2 className="noted-header">Noted.</h2>
            <button 
            onClick={signInWithNotion}
            style={{
                fontSize: "24px",
                padding: "0.5em",
                borderRadius: "20px",
            }}
            >Login With Notion</button>
        </div>
    )
}

export default Login;