import { useState } from "react";
import { faPhone, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import DuotoneIcon from "./DuotoneIcon";

export default function Modal({ setOpen }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl mx-4 overflow-hidden">
        
        <div className="flex flex-col md:flex-row">
          
          {/* COLONNE 1: CONTACT INFO */}
          <div className="w-full md:w-1/2 p-6 border-r">
            <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Phone Numbers</h3>
                
                <a href="tel:+261348523479" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <DuotoneIcon icon={faPhone} size={'text-sm'} />
                  <span>+261 34 85 234 79</span>
                </a>

                <a href="tel:+261324323601" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <DuotoneIcon icon={faPhone} size={'text-sm'} />
                  <span>+261 32 43 236 01</span>
                </a>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Social Networks</h3>
                
                
                <a  href="https://www.linkedin.com/in/elie-fenohasina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50"
                >
                  <DuotoneIcon icon={faLinkedin} size={'text-sm'} />
                  <span>Elie Fenohasina</span>
                </a>

                
                <a  href="https://github.com/likwel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <DuotoneIcon icon={faGithub} size={'text-sm'} />
                  <span>likwel</span>
                </a>

                
                <a  href="mailto:eliefenohasina@gmail.com"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50"
                >
                  <DuotoneIcon icon={faEnvelope} size={'text-sm'} />
                  <span>eliefenohasina@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLONNE 2: SEND MESSAGE */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">Send Message</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Your message here..."
                  rows="5"
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-semibold flex items-center justify-center gap-2"
              >
                <DuotoneIcon icon={faPaperPlane} size={'text-sm'} backActive={false} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <div className="border-t p-4">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg w-full font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}