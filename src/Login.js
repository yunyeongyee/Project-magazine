import React  from 'react';
import styled from 'styled-components';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, where, query, collection } from 'firebase/firestore';
/*COMPONENTS*/
import Header from './Header';

const Login = (props) => {
   const id_ref = React.useRef(null);
   const pw_ref = React.useRef(null);

  const loginFB = async() => {
     
   signInWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value)

      .then((userCredential) => {
            const user = userCredential.user;
            window.location.href="/Main"
      })
      .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
      });
   }

   const signUp = () => {
   window.location.replace('/SignUp');
};

   return (
      <>
         <Header />
         <Container>
            <Card>
               <Title>Sign In</Title>
               <Form>
                  <SubTitle>Email Address</SubTitle>
                  <Input type="email" ref={id_ref} />
                  <SubTitle>Password</SubTitle>
                  <Input type="password" ref={pw_ref} />
                  <ButtonLogIn onClick={loginFB}>Sign In</ButtonLogIn>
                  <p>New to MAGAZINE?</p>
                  <SignUpTxt onClick={signUp}>
                     Create an account.
                  </SignUpTxt>
               </Form>
            </Card>
         </Container>
      </>
   );
};

const Container = styled.div`
   display: flex;
   width: 100%;
   max-height: 100vh;
   height: 100vh;
   align-items: center;
   justify-content: center;
   position: relative;
   top: 0;
`;
   // z-index: 1000;
   // background: rgba(0, 0, 0, 0.05);
   // filter: blur(10px);
   // -webkit-filter: blur(10px);

const Card = styled.div`
   position: relative;
   width: 300px;
   height: 400px;
   margin: auto;
   background: transparent;
   border: 1px solid #282c34;
   border-radius: 5px;
   overflow: hidden;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
      border: 1px solid #61dafb;
   }
`;
const Title = styled.h1`
   margin: 25px 0;
`

const Form = styled.div`
   position: relative;
   top: 50px;
`;
const SubTitle = styled.p`
   margin: 15px;
   line-height: 5px;
`;
const Input = styled.input`
   position: relative;
   bottom: 10px;
   margin: 10px 0;
   width: 95%;
   max-width: 200px;
   background-color: whitesmoke;
   color: #282c34;
   border: none;
   border-bottom: 1px solid #282c34;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
      border-bottom: 1px solid #61dafb;
      transform: scale(1.1);
   }
`;

const ButtonLogIn = styled.button`
   display: flex;
   flex-direction: column;
   position: relative;
   bottom: 10px;
   left: 105px;
   width: 70px;
   height: 27px;
   margin: 5px 10px;
   padding: 5px;
   align-items: center;
   justify-content: center;
   background-color: transparent;
   border: 1px solid #61dafb;
   border-radius: 5px;
   color: #61dafb;
   @keyframes push {
      50% {
         transform: scale(0.85);
      }
      100% {
         transform: scale(1);
      }
   }
   &:hover,
   &:active,
   &:focus {
      cursor: pointer;
      animation-name: push;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
   }
`;

const SignUpTxt = styled.p`
   font-weight: bold;
   line-height: 1px;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
      color: #61dafb;
   }
`;

export default Login;
