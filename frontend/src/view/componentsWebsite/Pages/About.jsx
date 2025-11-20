import { Link } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const About = () => {
  const sections = [
    {
      title: "Mission",
      text: "At Metaveos Technology is to deliver innovative and reliable IT solutions that help businesses streamline operations and accelerate growth. We aim to bridge the gap between technology and real-world business challenges by providing scalable software, modern digital tools, and expert technical support. Through continuous improvement and a customer-first approach, we strive to create impactful digital experiences that drive long-term value for our clients.",
    },
    {
      title: "Vision",
      text: "To become a globally recognized technology leader that empowers organizations to embrace digital transformation with confidence. We aspire to build future-ready solutions that leverage emerging technologies, enabling businesses to stay competitive in an ever-evolving digital era. By fostering innovation and maintaining unwavering quality standards, we aim to create a positive impact on industries worldwide.",
    },
    {
      title: "Our Culture",
      text: "We cultivate a culture of innovation, collaboration, and customer-focused excellence. Our team thrives in an open environment that encourages creativity, continuous learning, and a passion for delivering high-quality technological solutions with integrity.",
    },
  ];

  const team = [
    {
      name: "Chaitanya Panda",
      role: "CEO",
      img: "./about/team-1.jpg",
      desc: "Leading with vision, he drives impactful initiatives that inspire meaningful change.",
    },
    {
      name: "Priyanka Senapati",
      role: "Manager",
      img: "./about/team-2.jpg",
      desc: "Dedicated to efficient planning and execution for successful project outcomes.",
    },
    {
      name: "Surendra Kumar Behera",
      role: "Designer",
      img: "./about/team-3.jpg",
      desc: "A creative mind who transforms ideas into visually impactful designs.",
    },
    {
      name: "Rohit Rajput",
      role: "CEO",
      img: "./about/team-4.jpg",
      desc: "A visionary leader focused on building solutions that create meaningful impact.",
    },
  ];

  return (
    <div className="container py-4">
      <h3 className="text-center">About The Company</h3>
      <p className="mt-4 pb-3 text-secondary">
        Metaveous Technologies Pvt Ltd is a leading technology company committed to delivering modern, powerful, and scalable digital solutions. We help businesses stay ahead in today’s fast-evolving digital world.
      </p>

      {/* DYNAMIC SECTIONS */}
      {sections.map((sec, index) => (
        <div className="pb-3" key={index}>
          <div className="sec-title__tagline d-flex">
            <div className="left-line"></div>
            <h4 className="m-0">{sec.title}</h4>
          </div>
          <p className="text-secondary">{sec.text}</p>
        </div>
      ))}

      {/* TEAM SECTION */}
      <div className="teams-area py-5">
        <div className="text-center mb-4">
          <h2>Our Team</h2>
          <p className="mt-4 text-secondary"> Our team is the backbone of our journey — passionate, skilled, and dedicated to building meaningful digital experiences.</p>
        </div>

        <div className="row">
          {team.map((member, index) => (
            <div className="col-lg-3 col-md-6 mt-4" key={index}>
              <div className="single-team-item overlay-hover">
                <div className="volunter-image overlay-effect">
                  <Link to="#">
                    <img src={member.img} alt={member.name} />
                  </Link>
                  <div className="follow-links text-white">
                    <Link to="#"><FaFacebookF size={23} /></Link>
                    <Link to="#"><FaXTwitter size={23} /></Link>
                    <Link to="#"><FiInstagram size={23} /></Link>
                    <Link to="#"><FaLinkedinIn size={23} /></Link>
                  </div>
                </div>

                <div className="team-text">
                  <div className="team-title text-uppercase">
                    <h6>{member.name}</h6>
                    <span>{member.role}</span>
                  </div>
                  <p>{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;