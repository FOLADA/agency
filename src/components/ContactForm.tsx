import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: '3D Website'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const serviceId = 'service_r6b880u';
      const templateId = 'template_a992h1c';
      const publicKey = '6phxnlcUaWnx1TlYO';

      await emailjs.send(
        serviceId, 
        templateId, 
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          message: formData.message
        }, 
        publicKey
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        projectType: '3D Website'
      });
    } catch (err) {
      setError(t('contact.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">{t('contact.thank_you')}</h3>
        <p className="text-slate-400">{t('contact.reply_soon')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-md p-3 text-red-300 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-white">{t('contact.name')}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-slate-800 border-slate-600 text-white mt-1"
            placeholder={t('contact.placeholder_name')}
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-white">{t('contact.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-slate-800 border-slate-600 text-white mt-1"
            placeholder={t('contact.placeholder_email')}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="company" className="text-white">{t('contact.company')}</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="bg-slate-800 border-slate-600 text-white mt-1"
          placeholder={t('contact.placeholder_company')}
        />
      </div>

      <div>
        <Label htmlFor="projectType" className="text-white">{t('contact.project_type')}</Label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="3D Website">{t('contact.project_types.3d_website')}</option>
          <option value="Modern Website">{t('contact.project_types.modern_website')}</option>
          <option value="E-commerce">{t('contact.project_types.e_commerce')}</option>
          <option value="Custom Development">{t('contact.project_types.custom_development')}</option>
          <option value="Redesign">{t('contact.project_types.redesign')}</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="text-white">{t('contact.details')}</Label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={t('contact.placeholder_details')}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 text-lg group"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t('contact.sending')}
          </>
        ) : (
          <>
            {t('contact.submit')}
            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>

      <p className="text-xs text-slate-400 text-center">
        {t('contact.policy')}
      </p>
    </form>
  );
};

export default ContactForm;
