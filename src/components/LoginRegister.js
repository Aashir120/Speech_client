import React,{useState} from "react";
import * as Styled from './Styled'
import '../styled.css'
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const logInUser = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/login',{
			method:'POST',
			body: JSON.stringify({
				email:email,
				password:password
			}),
			headers:{
				'Content-Type':'application/json',
			}
		})

		const data = await response.json();
		if(data._id){
			alert('Login Successfull')
			navigate('/dashboard')
		} else{
			alert('Login failed')
		}
		console.log(data._id);
};

async function registerUser(event) {

    event.preventDefault();
    const response = await fetch('http://localhost:5000/register',{
        method:'POST',
        body: JSON.stringify({
            username:username,
            email:email,
            password:password
        }),
        headers:{
            'Content-Type':'application/json',
        }
    })

    const data = await response.json();
		if(data._id){
			alert('SignUp SuccessFull')
			navigate('/dashboard')
		} else{
			alert('SignUp failed')
		}
		console.log(data._id);

    
}
      return(
        <div className="LoginRegister" >
          <Styled.Container  data-aos='fade-down'
          data-aos-delay='400'>
              <Styled.SignUpContainer signinIn={signIn}>
                  <Styled.Form onSubmit={registerUser}>
                      <Styled.Title>Create Account</Styled.Title>
                      <Styled.Input required value={username} onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='Name' />
                      <Styled.Input required value={email} onChange={(e)=> setEmail(e.target.value)}  type='email' placeholder='Email' />
                      <Styled.Input required value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' />
                      <Styled.Button type="submit" >Sign Up</Styled.Button>
                  </Styled.Form>
              </Styled.SignUpContainer>

              <Styled.SignInContainer signinIn={signIn}>
                   <Styled.Form onSubmit={logInUser} >
                       <Styled.Title>Sign in</Styled.Title>
                       <Styled.Input required value={email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='Email' />
                       <Styled.Input required value={password} onChange={(e)=>setPassword(e.target.value)}  type='password' placeholder='Password' />
                       <Styled.Anchor href='#'>Forgot your password?</Styled.Anchor>
                       <Styled.Button type="submit">Sign In</Styled.Button>
                   </Styled.Form>
              </Styled.SignInContainer>

              <Styled.OverlayContainer signinIn={signIn}>
                  <Styled.Overlay signinIn={signIn}>

                  <Styled.LeftOverlayPanel signinIn={signIn}>
                      <Styled.Title>Welcome Back!</Styled.Title>
                      <Styled.Paragraph>
                          To keep connected with us please login with your personal info
                      </Styled.Paragraph>
                      <Styled.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Styled.GhostButton>
                      </Styled.LeftOverlayPanel>

                      <Styled.RightOverlayPanel signinIn={signIn}>
                        <Styled.Title>Hello, Friend!</Styled.Title>
                        <Styled.Paragraph>
                            Enter Your personal details and start journey with us
                        </Styled.Paragraph>
                            <Styled.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Styled.GhostButton> 
                      </Styled.RightOverlayPanel>
  
                  </Styled.Overlay>
              </Styled.OverlayContainer>

          </Styled.Container>
          </div>
      )
 }

 export default LoginRegister;

 