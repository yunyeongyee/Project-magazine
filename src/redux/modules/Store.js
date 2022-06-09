import { db } from '../../firebase';
import {collection, doc, getDocs, addDoc, deleteDoc, updateDoc, getState} from 'firebase/firestore';

/*ACTIONS*/
const LOAD = 'Store/LOAD';
const CREATE = 'Store/CREATE';
const UPDATE = 'Store/UPDATE';
const DELETE = 'Store/DELETE';

/*INITIALSTATE*/
const initialState = {
   list: []
};


/*ACTION CREATORS*/
export function loadPost(post_list) {
    return { type: LOAD, post_list };
}

export function createPost(post) {
    return { type: CREATE, post: post };
}

// export function updatePost(post_index) {
//    return { type: UPDATE, post_index };
// }

export function deletePost(post_index) {
   return { type: DELETE, post_index };
}


/*MIDDLEWARES*/
export const loadPostFB = () => {
   return async function (dispatch) {
      const post_data = await getDocs(collection(db, 'post'));
         let post_list = [];
         post_data.forEach((onlyOnePost) => {
            post_list.push({ id: onlyOnePost.id, ...onlyOnePost.data() });
         });
         dispatch(loadPost(post_list));
   }
}

export const addPostFB = (addOnePostData) => {

   return async function(dispatch){
      const docRef = await addDoc(collection(db, 'post'), addOnePostData);
      const onePostData = {id: docRef.id, ...addOnePostData};
      dispatch(createPost(onePostData));
   } 
}


// export const updatePostFB = (post_id) => {
//    return async function (dispatch, getState) {
//       const docRef = doc (db, 'post', post_id);
//       await updateDoc(docRef, post_id);
//       console.log(getState.post);
//       const _post_list = getState().post.list;
//       const post_index = _post_list.findIndex((p) => {
//          return p.post_id === post_id;
//       })
//    }
// }

export const deletePostFB = (post_id) => {
   return async function(dispatch, getState) {
      if(!post_id){
         window.alert('NO Post ID');
         return;
      }
      const docRef = doc(db, 'post', post_id);
      await deleteDoc(docRef);

      const _post_list = getState().Store.list;
      const post_index = _post_list.findIndex((p) => {
         return p.id === post_id;
      })
      dispatch(deletePost(post_index));
   }
}

/*REDUCER*/
export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // do reducer stuff
      case 'Store/LOAD': {
         return { list: action.post_list };
      }

      case 'Store/CREATE': {
         const new_post_list = [...state.list, action.post];
         console.log(state.list, action.post)
         return { list: new_post_list };
      }

      case 'Store/DELETE': {
         const new_post_list = state.list.filter((l, idx) => {
            return parseInt(action.post_index) !== idx;
         });
         return { list: new_post_list };
      }

      default:
         return state;
   }
}