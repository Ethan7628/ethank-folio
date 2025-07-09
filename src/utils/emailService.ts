
import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_your_id'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_your_id'; // Replace with your template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Replace with your public key

export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'kusasirakweethan31@gmail.com',
  };

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    return result;
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
};
