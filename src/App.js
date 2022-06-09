import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged,} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { loadPostFB,deletePostFB } from './redux/modules/Store';
/*COMPONENTS*/
import Login from './Login';
import Home from './Home';
import Main from './Main';  
import SignUp from './SignUp';
import Upload from './Upload';
/*CSS*/
import './App.css';



function App() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = React.useState(false);
//   const initialState = [
//      {
//         title: 'Title1',
//         img: 'url()',
//         content:
//            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, dolores est officia ea nam eos!',
//         year: new Date().getFullYear(),
//         month: new Date().getMonth(),
//         day: new Date().getDay(),
//      },

   const loginCheck = async (user)=> {
      if(user) {
         setIsLogin(true); 

      } else {
         setIsLogin(false);

      }
   }
   // console.log(isLogin);

   React.useEffect(()=>{
      onAuthStateChanged(auth, loginCheck );
      dispatch(loadPostFB());
      // dispatch(deletePostFB());
      // addDoc(collection(db, 'post'), {title: 'testTitle1'});
      // const docRef = doc(db, 'post', 'TEMZUTacARsjlqWpCA3n');
      // deleteDoc(docRef);
      // updateDoc(docRef,{title: 'test3'});
      

   }, []);

 

  return (
     <div className="App">
        <Routes>
           {isLogin ? (
              <Route path="/" element={<Home />} />
           ) : (
              <Route path="/*" element={<Login />} />
           )}

           <Route path="/Login" element={<Login />} />
           <Route path="/Main" element={<Main />} />
           <Route path="/SignUp" element={<SignUp />} />
           <Route path="/Upload" element={<Upload />} />
        </Routes>
     </div>
  );
}
export default App;
