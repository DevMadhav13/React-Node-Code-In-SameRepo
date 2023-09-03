import AddCourses from './AddCourses';
import AllCourses from './AllCourses';

import Appbar from './Appbar'

import Signin from './Signin'
import Signup from './Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './Course';
import { RecoilRoot} from 'recoil';
import React from 'react';

function App() {
    return (
    < div style={{width :"100vw" , height : "100vh", backgroundColor:'#eeeeee'}}>
      <RecoilRoot>
        <Router>
          <Appbar />
              <Routes>
                  <Route path="/Course/:courseId" element={<Course />} />
                  <Route path="/AllCourses" element={<AllCourses />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/Signin" element={<Signin />} /> 
                  <Route path="/AddCourses" element={<AddCourses />} />
              </Routes>
          </Router>
        </RecoilRoot>    
    </div>
  )
}


export default App
