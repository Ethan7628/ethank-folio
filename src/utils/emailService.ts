import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, CONTACT_INFO } from '@/config/constants';
import { logger } from './logger';

export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  purpose?: string;
}) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    phone: formData.phone || 'Not provided',
    company: formData.company || 'Not provided',
    purpose: formData.purpose || 'Not specified',
    to_email: CONTACT_INFO.email,
  };

  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );
    return result;
  } catch (error) {
    logger.error('EmailJS error:', error);
    throw error;
  }
};
