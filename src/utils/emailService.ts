
import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_psyuf78'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_qir7o1t'; // Replace with your template ID  
const EMAILJS_PUBLIC_KEY = 'JW0WYbjtgCqoOB_Js'; // Replace with your public key

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
