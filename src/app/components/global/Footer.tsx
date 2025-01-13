import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 relative z-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Top Companies */}
        <div>
          <h4 className="text-lg font-bold mb-4">Top Companies</h4>
          <ul className="space-y-2">
            {[
              "Cybersecurity Jobs In Microsoft",
              "Cybersecurity Jobs In Capgemini",
              "Cybersecurity Jobs In Zscaler",
              "Cybersecurity Jobs In SAP",
              "Cybersecurity Jobs In Aujas",
              "Cybersecurity Jobs In Citi",
              "Cybersecurity Jobs In IBM",
              "Cybersecurity Jobs In Bosch",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">➤</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Job Roles */}
        <div>
          <h4 className="text-lg font-bold mb-4">Job Roles</h4>
          <ul className="space-y-2">
            {[
              "Cloud Security Jobs",
              "DevSecOps Jobs",
              "GRC Profile Jobs",
              "Penetration Testing Jobs",
              "Security Engineering Jobs",
              "Security Support Jobs",
              "Security Sales Jobs",
              "SOC Operations",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">➤</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-lg font-bold mb-4">Experience</h4>
          <ul className="space-y-2">
            {[
              "Freshers Jobs",
              "1-3 Years Jobs",
              "4-6 Years Jobs",
              "7-9 Years Jobs",
              "10-14 Years Jobs",
              "15+ Years Jobs",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">➤</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2">📍</span> 412, Tower A, Bestech Business Tower, Sector 66, Mohali
            </li>
            <li className="flex items-center">
              <span className="mr-2">📧 contact@cyberjobhunt.in</span> 
            </li>
          </ul>
         
          <div className="mt-4">
          <iframe  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14409.396532408677!2d78.53201005!3d25.460014899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1735465373368!5m2!1sen!2sin" width="200" height="150"   loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p>© 2025 shiv infosec.in.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#about" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
