import { useState } from "react";
import { faPhone, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import DuotoneIcon from "./DuotoneIcon";
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

export default function Modal({ setOpen }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Envoyer l'email via EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          senderName: formData.from_name,
          senderEmail: formData.from_email,
          subject: formData.subject,
          senderMsg: formData.message,
          to_email: 'eliefenohasina@gmail.com' // Votre email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      setSubmitted(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ from_name: "", from_email: "", subject: "", message: "" });
      }, 3000);

    } catch (err) {
      console.error('Email error:', err);
      setError(t('emailError') || 'Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-0 md:p-4">
      <div className="relative pt-4 bg-white w-full h-full md:h-auto md:rounded-lg shadow-xl md:max-w-5xl overflow-y-auto">
        
        <div className="flex flex-col lg:flex-row min-h-full">
          
          {/* COLONNE 1: CONTACT INFO */}
          <div className="w-full lg:w-1/2 p-4 md:p-8 lg:border-r border-b lg:border-b-0">
            <h2 className="text-2xl font-bold mb-4">{t('contactInfo')}</h2>

            <div className="space-y-4">
              <div className="space-y-2 flex flex-col gap-2 items-start">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{t('phoneNumbers')}</h3>
                
                <a href="tel:+261348523479" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-all hover:shadow-md hover:scale-105">
                  <DuotoneIcon icon={faPhone} size={'text-sm'} />
                  <span>+261 34 85 234 79</span>
                </a>

                <a href="tel:+261324323601" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-all hover:shadow-md hover:scale-105">
                  <DuotoneIcon icon={faPhone} size={'text-sm'} />
                  <span>+261 32 43 236 01</span>
                </a>
              </div>

              <div className="space-y-2b flex flex-col gap-2 items-start">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{t('socialNetworks')}</h3>
                
                <a href="https://www.linkedin.com/in/elie-fenohasina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 transition-all hover:shadow-md hover:scale-105"
                >
                  <DuotoneIcon icon={faLinkedin} size={'text-sm'} />
                  <span>Elie Fenohasina ANDRIATSITOHAINA</span>
                </a>

                <a href="https://github.com/likwel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-all hover:shadow-md hover:scale-105"
                >
                  <DuotoneIcon icon={faGithub} size={'text-sm'} />
                  <span>https://github.com/likwel</span>
                </a>

                <a href="mailto:eliefenohasina@gmail.com"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 transition-all hover:shadow-md hover:scale-105"
                >
                  <DuotoneIcon icon={faEnvelope} size={'text-sm'} />
                  <span className="break-all">eliefenohasina@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLONNE 2: SEND MESSAGE */}
          <div className="w-full lg:w-1/2 p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-4">{t('sendMessage')}</h2>
            
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 animate-pulse">
                {t('messageSent')}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-2">
              <div className="flex flex-col items-start mt-0">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('yourName')}
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col items-start mt-0">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('yourEmail')}
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col items-start mt-0">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('subjectPlaceholder')}
                  required
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col items-start mt-0">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('messagePlaceholder')}
                  rows="3"
                  required
                  className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg w-full font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t('sending') || 'Sending...'}
                  </>
                ) : (
                  <>
                    <DuotoneIcon icon={faPaperPlane} size={'text-sm'} backActive={false} fgColor={'text-white'}/>
                    {t('sendMessageBtn')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:shadow-md active:scale-95"
        >
          ✕
        </button>
      </div>
    </div>
  );
}