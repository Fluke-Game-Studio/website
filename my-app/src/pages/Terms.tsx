import { motion } from "framer-motion";

export default function TermsPage() {
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
          <h1 className="font-bebas heading-page text-fluke-text uppercase tracking-tight">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="font-sora text-fluke-muted mt-6 text-lg">
            Last Updated: August 8, 2026
          </p>
        </motion.div>

        <div className="space-y-12 font-sora text-fluke-text/90 leading-relaxed">
          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Fluke Games website, our AI-guided application and interview process, our internal contributor tools, and any related services (together, the "Services"), operated by Fluke Games ("we", "our", "the Studio"). By using the Services, you agree to these Terms. If you don't agree, please don't use the Services. For how we handle your data, see our <a href="/privacy" className="text-fluke-yellow hover:glow-yellow transition-all duration-300">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Eligibility</h2>
            <p>
              You must be legally able to enter into a binding agreement in your jurisdiction to use the Services. If you're applying for a role, you confirm that the information you provide — including anything shared during our AI-guided voice interview — is accurate and given voluntarily.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Applications & the AI Interview Process</h2>
            <div className="space-y-4">
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Consent to Recording</h3>
                <p className="text-sm">
                  If you complete our AI-guided voice interview, you consent to your responses being recorded, transcribed, and reviewed by our hiring team and AI systems as part of evaluating your application. This is used only for that purpose.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">No Guarantee of Outcome</h3>
                <p className="text-sm">
                  Submitting an application, completing an interview, or connecting a third-party account (LinkedIn, Discord, Jira) does not guarantee an offer of employment, engagement, or any specific outcome. Decisions are made at the Studio's discretion.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">The Fluke Games Commitment Program</h2>
            <p className="mb-4">
              Contributors may participate in our commitment-and-vesting program. By participating, you agree to the following:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Any commitment payment is only ever collected after you've been formally hired, during onboarding — never during an application or interview.</li>
              <li>Commitment funds are recorded as a starting frozen balance and released over time based on continued, diligent participation (e.g. weekly updates), according to the release schedule communicated to you at onboarding.</li>
              <li>Released ("Spendable") balances may be used within the Fluke Store subject to its own availability and item terms; frozen balances remain locked until vested or released under program completion rules.</li>
              <li>The commitment program is an internal incentive structure, not a financial investment, security, or deposit account, and carries no guarantee of return, interest, or continued employment.</li>
              <li>Program terms, release percentages, and schedules may be updated prospectively; you'll be notified of material changes affecting your existing balance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Connected Third-Party Accounts</h2>
            <p>
              You may choose to connect LinkedIn, Discord, Atlassian (Jira), or WhatsApp to your account to enable specific features (identity verification, notifications, project workflow sync). Your use of those platforms remains subject to their own terms of service, and you can disconnect any integration at any time. Details of what data each integration accesses are in our <a href="/privacy" className="text-fluke-yellow hover:glow-yellow transition-all duration-300">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Intellectual Property</h2>
            <p>
              All content on this site — including our games, branding, artwork, and written content — is owned by Fluke Games or its licensors and protected by applicable intellectual property law. You may not reproduce, distribute, or create derivative works from it without our written permission.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Acceptable Use</h2>
            <p className="mb-4">When using the Services, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide false or misleading information in an application or interview.</li>
              <li>Attempt to disrupt, reverse-engineer, or gain unauthorized access to our website, tools, or AI systems.</li>
              <li>Use the Services for any unlawful purpose or in violation of any third-party platform's terms (LinkedIn, Discord, Atlassian, Meta/WhatsApp, AWS).</li>
              <li>Misrepresent your identity or impersonate another person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Disclaimers & Limitation of Liability</h2>
            <p>
              The Services are provided "as is" without warranties of any kind, express or implied. To the fullest extent permitted by law, Fluke Games is not liable for any indirect, incidental, or consequential damages arising from your use of the Services, including reliance on AI-generated responses during the interview process, which may occasionally be inaccurate.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Termination</h2>
            <p>
              We may suspend or terminate your access to the Services at any time, with or without notice, for conduct that violates these Terms or is otherwise harmful to the Studio or other users.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be reflected by updating the "Last Updated" date above. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Governing Law</h2>
            <p>
              Fluke Games is a registered trademark and operates as a studio based in India. These Terms are governed by the laws of India, and any disputes will be subject to the exclusive jurisdiction of the courts located there.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Contact Us</h2>
            <p>
              Questions about these Terms? Reach out to us at:
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
