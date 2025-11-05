import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './index.css'
import { ToastContainer } from 'react-toastify';

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

//PAGES
import Sidebar from './view/Sidebar.jsx'
import Dashboard from './view/componentsAdmin/Dashboard.jsx'
import CreateAccount from './view/componentsAdmin/CreateAccount.jsx'
import Gallery from './view/componentsAdmin/Gallery.jsx'
import Blogs from './view/componentsAdmin/Blogs.jsx'
import Careers from './view/componentsAdmin/Careers.jsx'
import ContactView from './view/componentsAdmin/ContactView.jsx'
import TableData from './view/TableData.jsx';
import AdminSignin from './view/componentsAdmin/AdminSignin.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/adminsignin' element={<AdminSignin />} />
      <Route path='/admin' element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path='/admin/createaccount' element={<CreateAccount />} />
        <Route path='/admin/gallery' element={<Gallery />} />
        <Route path='/admin/blogs' element={<Blogs />} />
        <Route path='/admin/careers' element={<Careers />} />
        <Route path='/admin/contactview' element={<ContactView />} />
      </Route>
    </Routes>
    <ToastContainer />
  </BrowserRouter>

  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
