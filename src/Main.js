import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {updatePostFB, deletePostFB,} from './redux/modules/Store';
import { useNavigate } from 'react-router-dom';
/*COMPONENTS*/
import Header from './Header';
import Footer from './Footer';


const Main = () => {
   const navigate = useNavigate();
   const DataList = useSelector((state) => state.Store.list);
   const dispatch = useDispatch();
   const params = useParams();
   const post_index = params.index;
   const [like, setLike] = useState(0);
 

   return (
      <>
         <Header/>
         <Container>
           
            {DataList.map((data, index) => {
               console.log(data)
               return (
                  <Card key={index}>
                     <FavoriteBorderIcon 
                      style= {{ float: 'right', margin: 2}}
                      onClick= {()=> {
                        setLike(like +1);
                        navigate('./Main');
                      }}
                     />
                     <DeleteIcon
                        style={{ float: 'right', margin: 2 }}
                        onClick={() => {
                        //    dispatch(deletePostFB(DataList[post_index].id));
                        //    navigate('/Main');
                        }}
                     />
                     <EditIcon
                        style={{ float: 'right', margin: 2 }}
                        onClick={() => {
                           // dispatch(updatePostFB(DataList[post_index]).id);
                           // navigate('./Main');
                        }}
                     />

                     <Form>
                        <Title>{data.title}</Title>
                        <Date>
                           {data.date}</Date>
                        <Img src={data.image_url} />
                        <Content >{data.content}</Content>
                     </Form>
                  </Card>
               );
            })}
         </Container>
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
   max-height:500px;
   height: 95%;
   padding: 1em;
   margin: 1em;
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

export default Main;