import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[90%] max-w-lg rounded-2xl bg-black/70 border border-white/10 shadow-2xl p-8 text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-transform hover:rotate-90"
            >
              {/* <X size={28} /> */}
              <CloseIcon />
            </button>

            {/* Header */}
            <h2 className="text-3xl font-bold text-center mb-2">
              Get in Touch
            </h2>
            <p className="text-center text-gray-300 mb-8">
              We'd love to hear from you. Send us a message!
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              {/* Email */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                href="mailto:info@indikaara.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500 transition"
              >
                <EmailIcon style={{ color: "#FF5722", fontSize: 28 }} />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-300 text-sm">info@indikaara.com</p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                href="tel:+919179219231"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500 transition"
              >
                {/* <Phone className="text-green-400" size={28} />
                 */}
                <PhoneIcon style={{ color: "#4CAF50", fontSize: 28 }} />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-300 text-sm">+91 9179219231</p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500 transition"
              >
                <div className="flex items-center gap-4">
                  {/* <MessageCircle className="text-green-500" size={28} /> */}
                  <WhatsAppIcon style={{ color: "#25D366", fontSize: 28 }} />
                  <h3 className="font-semibold">WhatsApp</h3>
                </div>
                <a
                  href="https://wa.me/919179219231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white text-sm font-medium shadow-lg"
                >
                  Chat with us
                </a>
              </motion.div>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-400 text-sm mt-6">
              We typically respond within 24 hours
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
