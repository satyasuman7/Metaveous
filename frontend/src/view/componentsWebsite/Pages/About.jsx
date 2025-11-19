import React from 'react'

const About = () => {
  return (
    <>
      <div className="container py-4">
        <h3 className='text-center'>About The Company</h3>
        <p className='text-justify mt-4'>Metaveous Technologies Pvt Ltd is a leading technology company dedicated to providing innovative solutions and services to clients worldwide. We have consistently delivered cutting-edge technology products that empower businesses to achieve their goals and stay ahead in a rapidly evolving digital landscape.</p>

        {/* MISSION */}
        <div className="py-4">
          <div className="sec-title__tagline d-flex">
            <div className="left-line"></div>
            <div className="text"> <h4>Mission</h4> </div>
          </div>
          <div className="about-details__content-text1">
            <p className="text-secondary">At Metaveos Technology is to deliver innovative and reliable IT solutions that help businesses streamline operations and accelerate growth. We aim to bridge the gap between technology and real-world business challenges by providing scalable software, modern digital tools, and expert technical support. Through continuous improvement and a customer-first approach, we strive to create impactful digital experiences that drive long-term value for our clients.</p>
          </div>
        </div>

        {/* VISION */}
        <div className="pb-4">
          <div className="sec-title__tagline d-flex">
            <div className="left-line"></div>
            <div className="text"> <h4>Vision</h4> </div>
          </div>
          <div className="about-details__content-text1">
            <p className="text-secondary">To become a globally recognized technology leader that empowers organizations to embrace digital transformation with confidence. We aspire to build future-ready solutions that leverage emerging technologies, enabling businesses to stay competitive in an ever-evolving digital era. By fostering innovation and maintaining unwavering quality standards, we aim to create a positive impact on industries worldwide.</p>
          </div>
        </div>

        {/* OUR CULTURE */}
        <div className="pb-4">
          <div className="sec-title__tagline d-flex">
            <div className="left-line"></div>
            <div className="text"> <h4>Our Culture</h4> </div>
          </div>
          <div className="about-details__content-text1">
            <p className="text-secondary">Our culture is built on the pillars of innovation, collaboration, and customer-centricity. We foster an environment where creativity thrives, encouraging our team members to think outside the box and explore new ideas. Collaboration is at the heart of everything we do, as we believe that diverse perspectives lead to better solutions. We are committed to delivering exceptional value to our clients by understanding their unique needs and tailoring our services accordingly. Our culture emphasizes continuous learning, adaptability, and a passion for excellence, ensuring that we remain at the forefront of technological advancements while maintaining a strong focus on integrity and social responsibility.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;