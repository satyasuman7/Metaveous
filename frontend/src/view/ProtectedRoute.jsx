import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
  const token = tokenCookie ? tokenCookie.split('=')[1] : null;

  if (!token) {
    toast.warning("Please log in first!");
    return <Navigate to="/adminsignin" replace />;
  }
  return children;
}
