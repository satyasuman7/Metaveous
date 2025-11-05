import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    contacts: 0,
    gallery: 0,
    careers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, galleryRes, careersRes, accountsRes] = await Promise.all([
          axios.get("http://localhost:3000/blogs"),
        //   axios.get("http://localhost:3000/contact"),
          axios.get("http://localhost:3000/gallery"),
          axios.get("http://localhost:3000/careers"),
          axios.get("http://localhost:3000/createaccount"),
        ]);

        setStats({
          blogs: blogsRes.data?.data?.length || 0,
          contacts: 0,
          gallery: galleryRes.data?.data?.length || 0,
          careers: careersRes.data?.data?.length || 0,
          accounts: accountsRes.data?.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const items = [
    { label: "Total Blogs", count: stats.blogs, bg: "rgba(76, 76, 238, 1)" },
    { label: "Total Contact", count: stats.contacts, bg: "rgba(240, 37, 71, 1)" },
    { label: "Total Gallery", count: stats.gallery, bg: "rgba(14, 155, 9, 1)" },
    { label: "Total Career", count: stats.careers, bg: "rgba(110, 30, 10, 1)" },
    { label: "Total Account", count: stats.accounts, bg: "rgba(6, 109, 112, 1)" },
  ];

  return (
    <div className="p-3">
      <h3 className="mb-4 text-secondary">Welcome Admin !!!</h3>
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-4 d-flex">
            <Card className="w-100 text-center text-white shadow border-0 rounded-4" style={{ background: item.bg }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <h4 className="mb-2 fw-bold">{item.count}</h4>
                <h4>{item.label}</h4>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
