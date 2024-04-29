import React from 'react';
import ReactDOM from 'react-dom/client';
import SignInCompoment from './Compoment/SignIn/SignInCompoment';
import HomeLayout from './Layout/HomeLayout/HomeLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux'
import { store } from './Redux/configStore';
import DashBoardCompoment from './Compoment/DashBoardCompoment/DashBoardCompoment';
import StudentListCompoment from './Compoment/StudentList/StudentListCompoment';
import SearchCompoment from './Compoment/SearchCompoment/SearchCompoment';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="signin" element={<SignInCompoment></SignInCompoment>}></Route>
                <Route path="" element={<HomeLayout></HomeLayout>}>
                    <Route path="" element={<DashBoardCompoment></DashBoardCompoment>}></Route>
                    <Route path="Home" element={<DashBoardCompoment></DashBoardCompoment>}></Route>
                    <Route path="StudentList" element={<StudentListCompoment></StudentListCompoment>}></Route>
                    <Route path="searchlist">
                        <Route path=":searchname" element={<SearchCompoment></SearchCompoment>}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
);

