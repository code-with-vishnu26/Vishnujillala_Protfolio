import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await emailjs.send('service_81xbaw3', 'template_5gwyuas', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'soulpaths78@gmail.com'
      }, 'HXeAdtP1KAvEAaYQB');
      toast.success(t('contact.success'));
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error(t('contact.error'));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const socialLinks = [{
    name: "GitHub",
    icon: Github,
    url: "https://github.com/code-with-vishnu26",
    color: "hover:text-gray-300"
  }, {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/vishnu-jillala-36479725a",
    color: "hover:text-blue-400"
  }, {
    name: "LeetCode",
    icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.381 1.38 1.38 0 0 0 1.38 1.381 1.38 1.38 0 0 0 1.381-1.381 1.38 1.38 0 0 0-1.381-1.381z" />
      </svg>,
    url: "https://leetcode.com/u/awF0BgtB6E/",
    color: "hover:text-yellow-400"
  }];
  return <section id="contact" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{t('contact.getInTouch')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('contact.description')}
              </p>
            </div>

            <div className="space-y-4">
              <motion.div whileHover={{
              x: 10
            }} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200">
                <Mail size={20} className="text-blue-400" />
                <span>vishnujillala02@gmail.com</span>
              </motion.div>
              
              <motion.div whileHover={{
              x: 10
            }} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200">
                <Phone size={20} className="text-green-400" />
                <span>+91 6304365128</span>
              </motion.div>
              
              <motion.div whileHover={{
              x: 10
            }} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors duration-200">
                <MapPin size={20} className="text-red-400" />
                <span>Nizamabad, Telangana, India</span>
              </motion.div>
            </div>

            <div className="pt-6">
              <h4 className="text-lg font-semibold text-white mb-4">{t('contact.followMe')}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return <motion.a key={link.name} href={link.url} whileHover={{
                  scale: 1.2,
                  y: -5
                }} className={`p-3 bg-white/5 rounded-full border border-white/10 text-gray-400 ${link.color} transition-all duration-300`}>
                      <Icon size={20} />
                    </motion.a>;
              })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.name')}
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200" placeholder={t('contact.namePlaceholder')} />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.email')}
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200" placeholder={t('contact.emailPlaceholder')} />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.message')}
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200 resize-none" placeholder={t('contact.messagePlaceholder')} />
              </div>
              
              <motion.button type="submit" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                <Send size={20} />
                <span>{t('contact.send')}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Contact;