import React from 'react';
import Navbar from '../components/Navbar';
import img from '../assets/images/hos.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">



      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in-down">
            About Hospital Management System
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto animate-fade-in-up">
            Transforming healthcare delivery through innovative technology and compassionate care
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are dedicated to revolutionizing healthcare management by providing a state-of-the-art system that enhances efficiency, improves patient care, and streamlines hospital operations. Our goal is to empower healthcare professionals with the tools they need to save lives and make a difference.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through cutting-edge technology and a patient-centric approach, we aim to create a seamless experience for both medical staff and patients alike.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={img} 
                alt="Hospital staff" 
                className="rounded-lg shadow-lg w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Patient Management",
                description: "Efficiently manage patient records, appointments, and medical history",
                icon: "M12 14l9-5-9-5-9 5 9 5z"
              },
              {
                title: "Staff Coordination",
                description: "Streamline staff scheduling and communication",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              },
              {
                title: "Resource Tracking",
                description: "Monitor equipment, supplies, and facility resources",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg 
                  className="w-12 h-12 text-blue-600 mb-4 mx-auto" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Johnson", role: "Chief Medical Officer" },
              { name: "Mike Anderson", role: "Tech Lead" },
              { name: "Emily Chen", role: "Operations Director" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/150?img=${index + 1}`} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;