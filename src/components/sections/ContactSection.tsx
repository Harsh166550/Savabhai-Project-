import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { siteConfig, contactDetails } from '../../data/siteConfig';
import { ContactFormData } from '../../types';

interface ContactSectionProps {
  initialService?: string;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, onShowToast }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service: initialService || 'Brand Identity & Systems',
    budget: '$25k – $50k',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Brand Identity & Systems',
    'UI/UX & Digital Product Design',
    'Full-Stack Web Engineering',
    '3D & Spatial WebGL Experience',
    'Interior & Spatial Architecture',
    'Complete End-to-End Commission'
  ];

  const budgetOptions = [
    'Under $25k',
    '$25k – $50k',
    '$50k – $100k',
    '$100k+'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopiedEmail(true);
    onShowToast('Studio email copied to clipboard.');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Project Overview).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast('Inquiry received. A principal partner will be in touch within 24 hours.');
    }, 800);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-white border-t border-[#DDE1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#767E8C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
            <span>Initiate Collaboration</span>
            <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
            <span>Studio Inquiries</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#6E260E] tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed">
            Tell us what you're building, where you want to go, and how we can help get you there.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8 p-5 sm:p-8 md:p-12 rounded-3xl bg-[#F6F7F9] border border-[#DDE1E6] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#8E3514] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-[#D49B28]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#6E260E]">
                    Message Received, {formData.name}.
                  </h3>
                  <p className="text-sm sm:text-base text-[#767E8C] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to SD Design Studio. We will review your brief and follow up via <span className="font-semibold text-[#8E3514]">{formData.email}</span>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      service: 'Brand Identity & Systems',
                      budget: '$25k – $50k',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-[#8E3514] border border-[#DDE1E6] hover:bg-white rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-[#FDF2EC] border border-[#A6441C] text-xs text-[#8E3514] font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#6E260E]">
                      Your Name <span className="text-[#8E3514]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#DDE1E6] text-sm text-[#6E260E] placeholder:text-[#767E8C] focus:outline-hidden focus:border-[#8E3514] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#6E260E]">
                      Email Address <span className="text-[#8E3514]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#DDE1E6] text-sm text-[#6E260E] placeholder:text-[#767E8C] focus:outline-hidden focus:border-[#8E3514] transition-colors"
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E260E]">
                    Primary Practice / Capability
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((srv) => {
                      const isSelected = formData.service === srv;
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv })}
                          className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#8E3514] text-white border-[#8E3514] shadow-xs'
                              : 'bg-white text-[#6E260E] border-[#DDE1E6] hover:border-[#8E3514] hover:bg-[#ECEEF2]'
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E260E]">
                    Expected Investment
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: opt })}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                          formData.budget === opt
                            ? 'bg-[#8E3514] text-white border-[#8E3514] shadow-xs'
                            : 'bg-white text-[#6E260E] border-[#DDE1E6] hover:bg-[#ECEEF2]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E260E]">
                    Project Overview <span className="text-[#8E3514]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the project goals, timeline, and key requirements..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#DDE1E6] text-sm text-[#6E260E] placeholder:text-[#767E8C] focus:outline-hidden focus:border-[#8E3514] transition-colors resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-widest text-white bg-[#8E3514] hover:bg-[#6E260E] disabled:bg-[#DDE1E6] rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-3.5 h-3.5 text-[#D49B28]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Studio Contact Information Column */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F6F7F9] border border-[#DDE1E6] space-y-6 shadow-xs">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">
                  SD DESIGN STUDIO
                </p>
                <h3 className="font-display font-bold text-xl text-[#6E260E]">
                  Direct Inquiries
                </h3>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#8E3514] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-[#767E8C] uppercase">Email</p>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="font-medium text-[#6E260E] hover:text-[#8E3514] transition-colors block"
                    >
                      {contactDetails.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#8E3514] hover:text-[#D49B28] underline mt-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#8E3514] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-[#767E8C] uppercase">Phone & WhatsApp</p>
                    <a
                      href={`tel:${contactDetails.phoneClean}`}
                      className="font-medium text-[#6E260E] hover:text-[#8E3514] transition-colors block font-mono"
                    >
                      {contactDetails.phone}
                    </a>
                    <a
                      href={contactDetails.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#8E3514] hover:text-[#D49B28] underline mt-1"
                    >
                      <span>Direct WhatsApp Chat →</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8E3514] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-[#767E8C] uppercase">Studio Location</p>
                    <p className="font-medium text-[#6E260E] leading-relaxed">
                      {contactDetails.address}
                    </p>
                    <a
                      href={contactDetails.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#8E3514] hover:text-[#D49B28] underline mt-1"
                    >
                      <span>View on Google Maps →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Availability Notice */}
            <div className="p-6 rounded-2xl bg-white border border-[#DDE1E6] space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D49B28] animate-pulse" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6E260E]">
                  Studio Status
                </span>
              </div>
              <p className="text-xs text-[#767E8C] leading-relaxed">
                {siteConfig.contact.availability}. We review every project inquiry carefully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
