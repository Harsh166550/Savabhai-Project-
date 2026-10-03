import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { siteConfig, contactDetails } from '../../data/siteConfig';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onClose }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#6E260E]/70 backdrop-blur-md flex justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#DDE1E6]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#DDE1E6] bg-[#F6F7F9]">
          <div className="flex items-center gap-2.5">
            {isPrivacy ? <Shield className="w-5 h-5 text-[#8E3514]" /> : <FileText className="w-5 h-5 text-[#8E3514]" />}
            <span className="font-display font-bold text-lg text-[#6E260E]">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#767E8C] hover:text-[#8E3514] hover:bg-[#ECEEF2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Prose */}
        <div className="p-6 sm:p-10 md:p-12 space-y-8 text-[#6E260E] text-sm leading-relaxed max-h-[75vh] overflow-y-auto">
          <div className="space-y-2">
            <p className="text-xs font-mono text-[#767E8C] uppercase">
              Last Revised: March 2026 · SD Design Studio
            </p>
            <h2 className="font-display font-bold text-2xl text-[#6E260E]">
              {isPrivacy ? 'Client Data & Privacy Architecture' : 'Terms of Studio Engagement'}
            </h2>
          </div>

          {isPrivacy ? (
            <>
              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">1. Information Collection</h3>
                <p className="text-[#767E8C]">
                  SD Design Studio collects client inquiry information submitted through our contact form solely to evaluate project compatibility, provide estimates, and conduct contractual business discussions. We do not sell, rent, or distribute client contact records or confidential design briefs to external brokers.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">2. Non-Disclosure & Intellectual Property</h3>
                <p className="text-[#767E8C]">
                  Any proprietary schematics, trade secrets, business concepts, or architectural briefs shared during project scoping are safeguarded under mutual confidentiality obligations. We enter formal bilateral Non-Disclosure Agreements prior to accessing sensitive client materials.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">3. Analytics & Device Telemetry</h3>
                <p className="text-[#767E8C]">
                  Our website does not deploy third-party advertising tracking pixels or invasive fingerprinting scripts. We utilize strictly anonymous performance metrics to optimize WebGL canvas frame rates and browser compatibility across canonical viewports.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">4. Contact & Inquiries</h3>
                <p className="text-[#767E8C]">
                  For questions concerning your personal records or data removal, please contact our legal compliance desk at <a href={`mailto:${contactDetails.email}`} className="font-medium text-[#8E3514] underline">{contactDetails.email}</a>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">1. Scope of Work & Deliverables</h3>
                <p className="text-[#767E8C]">
                  All architectural spatial designs, 3D WebGL scenes, visual identities, and software applications are executed pursuant to an executed Statement of Work (SOW) defining milestones, acceptance criteria, and revision cycles.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">2. Commission Payments & Retainers</h3>
                <p className="text-[#767E8C]">
                  Client projects commence following confirmation of initial discovery retainers. Phased milestone disbursements are invoiced as outlined in the bilateral engagement schedule.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">3. Intellectual Property Rights</h3>
                <p className="text-[#767E8C]">
                  Upon settlement of final deliverables, clients receive unconditional commercial ownership of all production visual assets, custom code repositories, and brand identity marks created specifically for the commission.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-display font-bold text-base text-[#6E260E]">4. Studio Attribution</h3>
                <p className="text-[#767E8C]">
                  SD Design Studio reserves the customary privilege to showcase non-confidential project imagery and case study retrospectives in our promotional monographs and web archives.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
