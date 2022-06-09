import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/configStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
   <BrowserRouter>
         <App />
   </BrowserRouter>
   </Provider>
);
reportWebVitals();

/*Provider: react-redux 라이브러리에 내장되어있는,
리액트 앱에 store를 손쉽게 연동 할 수 있도록 도와주는 컴포넌트
이 컴포넌트를 불러온 후 연동 할 컴포넌트를 감싸준다음에 
Provider컴포넌트의 props로 store값을 설정해주면 됨*/