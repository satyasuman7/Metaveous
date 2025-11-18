import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// DARK MODE
import { DarkLightModeProvider } from './view/componentsWebsite/DarkLightMode.jsx'

//ADMIN PAGES
import Sidebar from './view/Sidebar.jsx';
import Dashboard from './view/componentsAdmin/Dashboard.jsx';
import CreateAccount from './view/componentsAdmin/CreateAccount.jsx';
import Gallery from './view/componentsAdmin/Gallery.jsx';
import Blogs from './view/componentsAdmin/Blogs.jsx';
import Careers from './view/componentsAdmin/Careers.jsx';
import ContactView from './view/componentsAdmin/ContactView.jsx';
import AdminSignin from './view/componentsAdmin/AdminSignin.jsx';
import ProtectedRoute from './view/ProtectedRoute.jsx';

//WEBSITE PAGES
import Common from './view/componentsWebsite/Common.jsx';
import Home from './view/componentsWebsite/Pages/Home.jsx';
import About from './view/componentsWebsite/Pages/About.jsx';
import Services from './view/componentsWebsite/Pages/Services.jsx';
import Contact from './view/componentsWebsite/Pages/Contact.jsx';
import Blogsw from './view/componentsWebsite/Pages/Blogs.jsx';
import Careersw from './view/componentsWebsite/Pages/Careers.jsx';
import Galleryw from './view/componentsWebsite/Pages/Gallery.jsx';

const menuData = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Blogs", path: "/blogs" },
  { label: "Careers", path: "/careers" },
  { label: "Gallery", path: "/gallery" },
  { title: "Contact", path: "/contact" },
];

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DarkLightModeProvider>
      <Routes>
        {/* ADMIN PANEL */}
        <Route path='/adminsignin' element={<AdminSignin />} />
        <Route path='/admin' element={<ProtectedRoute><Sidebar /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='/admin/createaccount' element={<CreateAccount />} />
          <Route path='/admin/gallery' element={<Gallery />} />
          <Route path='/admin/blogs' element={<Blogs />} />
          <Route path='/admin/careers' element={<Careers />} />
          <Route path='/admin/contactview' element={<ContactView />} />
        </Route>

        {/* WEBSITE PANEL */}
        <Route path='/' element={<Common menu={menuData} />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blogs' element={<Blogsw />} />
          <Route path='/careers' element={<Careersw />} />
          <Route path='/gallery' element={<Galleryw />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
      <ToastContainer />
    </DarkLightModeProvider>
  </BrowserRouter>

  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
