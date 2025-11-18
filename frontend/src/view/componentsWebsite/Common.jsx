import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import './websitestyle.css';
import BreadCrumb from './BreadCrumb';

export default function Common({ menu }) {
  const location = useLocation();
  const currentItem = menu.find(item => item.path === location.pathname);
  const currentTitle = currentItem ? currentItem.label || currentItem.title : 'Page';
  return (
    <>
      <Header />
      {currentTitle !== "Home" && ( <BreadCrumb title={currentTitle} />)}
      <Outlet />
      <Footer />
    </>
  )
}
