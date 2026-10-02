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
          <h1 className="font-bebas heading-page text-fluke-text uppercase tracking-tight">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="font-sora text-fluke-muted mt-6 text-lg">
            Last Updated: August 8, 2026
          </p>
        </motion.div>

        <div className="space-y-12 font-sora text-fluke-text/90 leading-relaxed">
          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Intro</h2>
            <p>
              Fluke Games ("we", "our", or "the Studio") is committed to protecting the privacy of our visitors, applicants, and collaborators. This Privacy Policy outlines how we handle information you provide when interacting with our website, applying for positions, completing our AI-guided interview, connecting a third-party account, or contacting us for projects.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Information We Collect</h2>
            <div className="space-y-4">
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Contact Forms</h3>
                <p className="text-sm">
                  When you reach out via our contact page, we collect your name, email address, company name, and any details about your project or budget to better assist your enquiry.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Job Applications & AI Voice Interview</h3>
                <p className="text-sm">
                  If you apply for a career or volunteer position, we collect your full name, email, phone number, address, professional links (LinkedIn, portfolio), and documents such as your resume/CV. If you complete our AI-guided voice interview, we also record the audio transcript of your responses. This data is used solely for evaluating your application and is reviewed by our hiring team.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Third-Party Integrations & Connected Accounts</h2>
            <p className="mb-4">
              Fluke Games' internal tools (used by employees and, where noted, by applicants) connect to the following third-party services. We only request the minimum access each integration needs, and none of this data is sold or used for advertising.
            </p>
            <div className="space-y-4">
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">LinkedIn</h3>
                <p className="text-sm">
                  When you connect LinkedIn (during onboarding, or by adding a profile link to an application), we access your basic profile information — name, email, and profile identifier — via LinkedIn's OAuth sign-in. This is used only to verify your professional identity and keep employee/applicant profiles consistent. We do not post to LinkedIn on your behalf or access your connections.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Discord</h3>
                <p className="text-sm">
                  Connecting Discord links your Discord username, user ID, and avatar to your internal profile, and allows our systems to send you notifications (approvals, updates, reminders) through Discord. We do not read your private messages or access servers you belong to beyond what's needed to deliver these notifications.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Atlassian (Jira)</h3>
                <p className="text-sm">
                  Connecting Jira uses Atlassian's OAuth 2.0 flow with the following scopes: reading your Jira user profile, reading Jira project/work data, creating and updating Jira work items on your behalf, and maintaining a refresh token so you don't have to reconnect repeatedly. This is used exclusively to sync project workflow tickets tied to your work at the Studio, within our own Jira instance.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Meta / WhatsApp</h3>
                <p className="text-sm">
                  Where you've provided a phone number, we may send operational notifications (e.g. update reminders, status alerts) via the WhatsApp Business API. These messages are processed by Meta as our messaging provider, subject to Meta's own privacy policy. You can opt out of WhatsApp notifications at any time by contacting us.
                </p>
              </div>
              <div className="glass rounded-xl p-6 border-fluke-yellow/10">
                <h3 className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2">Amazon Web Services (AWS)</h3>
                <p className="text-sm">
                  Our website, internal tools, and all data described in this policy are hosted on Amazon Web Services infrastructure, including managed database, storage, and email-delivery services. AWS acts as our infrastructure provider and sub-processor — it does not use your data for its own purposes. Data is encrypted in transit and at rest using AWS-managed encryption.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">The Fluke Games Commitment Program</h2>
            <p className="mb-4">
              Fluke Games runs an internal commitment-and-vesting program for contributors: a starting "commitment" amount is recorded as a frozen balance, which is gradually released over time based on continued participation (e.g. weekly updates). Because this involves financial information, we want to be explicit about what's collected and how it's used:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We record the commitment amount, transaction reference, and the resulting wallet ledger entries (frozen and released balances) tied to your account.</li>
              <li>This data is used only to operate the commitment/vesting program itself — calculating weekly releases, spendable balances, and program completion — and to answer your questions about your own balance.</li>
              <li>The actual commitment payment is only ever collected after you've been hired, during onboarding — never during an interview or application stage.</li>
              <li>Wallet and commitment data is never sold, shared with advertisers, or used outside of operating this internal program.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">How We Use Your Data</h2>
            <p className="mb-4">We use the information we collect for specific, limited purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To respond to your inquiries and project requests.</li>
              <li>To process and evaluate your application for roles at the studio, including AI-guided interview transcripts.</li>
              <li>To operate connected-account features (LinkedIn, Discord, Jira, WhatsApp) you've explicitly opted into.</li>
              <li>To operate the commitment/vesting program for contributors, as described above.</li>
              <li>To improve our website experience and communications.</li>
              <li>To protect the studio and our users from fraudulent activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-fluke-yellow mb-4 tracking-wider uppercase">Your Rights & Data Retention</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data, and may disconnect any third-party integration (LinkedIn, Discord, Jira, WhatsApp) at any time. We retain application and interview data for as long as reasonably needed to evaluate your candidacy and for a limited period afterward for record-keeping, after which it is deleted or anonymized.
            </p>
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
              Fluke Games is a registered trademark and operates as a studio based in India. By using our services, you acknowledge that any data processing will be subject to the laws and regulations of India.
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
