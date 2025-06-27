// C:\Users\Jenson\Tech\Compfest\v2\sea-catering\components\Contact.tsx

import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

const Contact = () => {
  const whatsappLink = `https://wa.me/628123456789`;

  return (
    <section id="contact" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-slate-100 mb-8 max-w-xl mx-auto">
            Our team is ready to help you get started. Feel free to reach out to our manager for any inquiries.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5 w-full md:w-auto flex items-center justify-center md:justify-start space-x-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <div>
                <p className="text-sm text-slate-200">Manager</p>
                <p className="font-bold text-lg text-white">Brian</p>
              </div>
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm rounded-lg p-5 w-full md:w-auto flex items-center justify-center md:justify-start space-x-4 text-slate-800 hover:bg-white transition-all transform hover:scale-105"
            >
              {/* === Using the Next.js Image component with the local SVG === */}
              <Image
                src="/whatsapp-icon.svg"
                alt="Chat on WhatsApp"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm text-slate-500">Chat on WhatsApp</p>
                <p className="font-bold text-lg text-teal-700">08123456789</p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;