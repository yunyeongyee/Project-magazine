import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
/*COMPONENTS*/
import Header from './Header';

const SignUp = () => {
   const navigate = useNavigate();
   const id_ref = React.useRef(null);
   const name_ref = React.useRef(null);
   const pw_ref = React.useRef(null);
   

   const signUpFB = async () =>{
      const user = await createUserWithEmailAndPassword(
         auth,
         id_ref.current.value,
         pw_ref.current.value
      );

      const user_doc = await addDoc(collection(db, 'users'), {
         user_id: user.user?.email, 
         name: name_ref.current?.value
      })

      alert('Registration Completed');
      navigate('/Login');
   }

   return (
      <>
         <Header />
         <Container>
            <Card>
               <Title>Sign Up</Title>
               <Form>
                  <SubTitle>User Name</SubTitle>
                  <Input type="text" ref={name_ref} />
                  <SubTitle>Email Address</SubTitle>
                  <Input type="email" ref={id_ref} />
                  <SubTitle>Password</SubTitle>
                  <Input type="password" ref={pw_ref} autoComplete="off" />
                  <ButtonLogIn onClick={signUpFB}>Sign Up</ButtonLogIn>
               </Form>
            </Card>
         </Container>
      </>
   );
}

const Container = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   align-items: center;
   justify-content: center;
`;
const Card = styled.div`
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
`;

const Form = styled.div`
   position: relative;
   top: 30px;
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
   bottom: 20px;
   left: 105px;
   width: 75px;
   height: 27px;
   margin: 20px 10px;
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

export default SignUp;