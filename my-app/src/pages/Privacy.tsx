import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-fluke-bg pt-32 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fluke-yellow rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fluke-glow rounded-full blur-[160px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Legal & Trust
          </p>
          <h1 className="font-bebas text-6xl md:text-8xl text-fluke-text uppercase tracking-tight">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="font-sora text-fluke-muted mt-6 text-lg">
            Last Updated: April 18, 2026
          </p>
        </motion.div>

        <div className="space-y-12 font-sora text-fluke-text/90 leading-relaxed">
          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Intro</h2>
            <p>
              Fluke Games ("we", "our", or "the Studio") is committed to protecting the privacy of our visitors and collaborators. This Privacy Policy outlines how we handle the information you provide when interacting with our website, applying for positions, or contacting us for projects.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Information We Collect</h2>
            <div className="space-y-4">
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Contact Forms</h3>
                <p className="text-sm">
                  When you reach out via our contact page, we collect your **name, email address, company name**, and any details about your project or budget to better assist your enquiry.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Job Applications</h3>
                <p className="text-sm">
                  If you apply for a career or volunteer position, we collect your **full name, email, phone number, address**, professional links (LinkedIn, Portfolio), and documents such as your **Resume/CV**. This data is used solely for evaluating your application.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">How We Use Your Data</h2>
            <p className="mb-4">We use the information we collect for specific, limited purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To respond to your inquiries and project requests.</li>
              <li>To process and evaluate your application for roles at the studio.</li>
              <li>To improve our website experience and communications.</li>
              <li>To protect the studio and our users from fraudulent activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Data Protection & NDA</h2>
            <p>
              We take data security seriously. For project-related enquiries, we are happy to sign and abide by Non-Disclosure Agreements (NDAs) to protect your intellectual property. Your personal information is never sold, traded, or shared with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Legal Jurisdiction</h2>
            <p>
              Fluke Games is a registered trademark and operates as a studio based in **India**. By using our services, you acknowledge that any data processing will be subject to the laws and regulations of India.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how your data is handled, please contact us at:
              <br />
              <a href="mailto:hello@flukegames.studio" className="text-fluke-yellow hover:glow-yellow transition-all duration-300">
                hello@flukegames.studio
              </a>
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-fluke-yellow/10 text-center">
          <p className="font-orbitron text-[10px] tracking-[0.4em] text-fluke-muted uppercase">
            © 2026 Fluke Games Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
