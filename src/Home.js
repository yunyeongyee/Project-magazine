import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {  updatePost, updatePostFB,deletePost, deletePostFB,
} from './redux/modules/Store';
import { auth, db } from './firebase';
import {
   createUserWithEmailAndPassword,
   onAuthStateChanged,
} from 'firebase/auth';
/*COMPONENTS*/
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const Home = () => {
   const DataList = useSelector((state) => state.Store.list);
   const dispatch = useDispatch();
   const params = useParams();
   const post_index = params.index;
   const [state, setState] = useState(0);


   const like = () => {
       setState(state + 1);
       alert('like +1')
   }
   return (
      <>
        <Header />
          <Main />
         <Footer />
      </>
   );
};

const Container = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, 420px);
   gap: 3em;
   width: 100%;
   justify-content: center;
   align-items: center;
   margin: 20px auto;
   padding: auto;
   position: relative;
   top: 100px;
   z-index: -1;
`;
const Card = styled.div`
   max-width: 350px;
   width: 95%;
   max-height: 500px;
   height: 95%;
   padding: 2em;
   margin: 2em;
   border: 1px solid #61dafb;
   border-radius: 5px;
   background: transparent;
`;

const Form = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   position: relative;
   left: 27px;
   margin: 10px auto;
`;
const Title = styled.h2`
   position: relative;
   bottom: 10px;
`;
const Date = styled.p`
   position: relative;
   bottom: 40px;
`;

const Img = styled.img`
   display: grid;
   grid-template-columns: repeat(200px, 1fr);
   gap: 1em;
   max-width: 15rem;
   height: 15rem;
   margin: 5px auto;
   position: relative;
   bottom: 40px;
`;

const Content = styled.p`
   margin: 5px auto;
   position: relative;
   bottom: 30px;
`;
export default Home;
