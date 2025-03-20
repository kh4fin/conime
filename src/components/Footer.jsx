import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Conime. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
