import React, {useState} from 'react';
import styled from 'styled-components';
import { db, storage } from './firebase';
import {useDispatch} from 'react-redux';
import {addPostFB,} from './redux/modules/Store';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";

/*COMPONENTS*/
import Header from './Header';

const Upload = (props) => {
   const navigate = useNavigate();
   const title = React.useRef(null);
   const content = React.useRef(null);
   const date = React.useRef(null);
   const file_link = React.useRef(null);
   const [imageSrc, setImageSrc] = useState('');
   const dispatch = useDispatch();


   const addPostList = () => {
      dispatch(
         addPostFB({
            title: title.current?.value,
            content: content.current?.value,
            date: date.current?.value,
            image_url: file_link.current.url,
         }) 
      ) 
         navigate('/Main');
   };

   const uploadFB = async (e) => {
      const encodeFileToBase64 = (fileBlob) => {
         const reader = new FileReader();
         reader.readAsDataURL(fileBlob);
         return new Promise((resolve) => {
            reader.onload = () => {
               setImageSrc(reader.result);
               resolve();
            };
         });
      };
      const uploaded_file = await uploadBytes(
         ref(storage, `images/${e.target.files[0].name}`),
         encodeFileToBase64(e.target.files[0])
      );
         const file_url = await getDownloadURL(uploaded_file.ref);
         file_link.current = {url: file_url};
   };
      
   

  return (
      <>
         <Header />
         <Container>
            <Card>
               <Form>
                  <ButtonUpload onClick={addPostList}>Upload</ButtonUpload>
                  <Title>Title</Title>
                  <Input ref={title} type="text" />
                  <SubTitle>Date</SubTitle>
                  <Input ref={date} type="date" />
                  <SubTitle>Choose Image</SubTitle>
                  <InputFile onChange={uploadFB} ref={file_link} type="file" />
                  <Preview>
                     {imageSrc && <img src={imageSrc} alt="preview-img" style={{width: 100}}/>}
                  </Preview>
                  <SubTitle2>Contents</SubTitle2>
                  <Textarea ref={content} type="text" />
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
   position: relative;
   top: 0px;
   margin: 20px auto;
   padding: 20px auto;
`;
const Card = styled.div`
   position: relative;
   width: 300px;
   max-height: 600px;
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
const Form = styled.div`
margin: 20px auto;
`;

const ButtonUpload = styled.button`
   display: flex;
   flex-direction: column;
   position: relative;
   left: 210px;
   bottom: 10px;
   width: 65px;
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

const Title = styled.p`
   margin: 3px auto;
   line-height: 5px;
`;
const SubTitle = styled.p`
   line-height: 5px;
`;
const SubTitle2 = styled.p`
   position: relative;
   line-height: 5px;
`;
const Input = styled.input`
   position: relative;
   bottom: 10px;
   margin: 15px 0;
   padding: 5px auto;
   width: 95%;
   max-width: 200px;
   line-height: 11px;
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
const InputFile = styled.input`
   input[type='file'] {
      display: none;
      max-width: 100px;
      background-color: whitesmoke;
      color: #282c34;
      border: none;
      border-bottom: 1px solid #282c34;

   input#file-upload-button {
      display: flex;
      flex-direction: column;
      position: relative;
      top: 7px;
      left: 200px;
      width: 65px;
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
   }
}
`;
const Preview = styled.div`

`
const Textarea = styled.textarea`
   position: relative;
   width: 80%;
   height: 60px;
   padding: 10px;
   overflow-x: hidden;
   overflow-y: auto;
   background-color: whitesmoke;
   border: solid 1px #282c34;
   border-radius: 5px;
   resize: none;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
      border: 1px solid #61dafb;
   }
`;

export default Upload;