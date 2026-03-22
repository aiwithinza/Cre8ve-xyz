import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy – Cre8ve AI Solutions</title>
        <meta name="description" content="Privacy Policy for Cre8ve AI Solutions" />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-black text-white px-6 py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-6">Last updated: March 22, 2026</p>

        <section className="space-y-6 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>When you interact with Cre8ve AI Solutions through our website or Instagram DMs, we may collect your name, email address, project description, and preferences you share with us. We collect only what you voluntarily provide.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <p>We use the information you provide to respond to your project inquiries, schedule discovery calls, and send relevant project-related communications. We do not sell your personal data to third parties.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Instagram Messaging</h2>
            <p>If you message us via Instagram, our automated assistant (PIA) may collect your responses to qualify your project. Your Instagram user ID and conversation data are used solely to respond to your inquiry and route your project brief to our team.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Data Storage</h2>
            <p>Project inquiry data is stored securely in our internal systems (Google Sheets) and is accessible only to Cre8ve team members. We retain this data for the duration of our business relationship.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Third-Party Services</h2>
            <p>We use the following third-party services: Meta (Instagram), Google (Sheets), Resend (email), and Calendly (scheduling). Each service has its own privacy policy governing data handling.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:hello@cre8ve.xyz" className="text-blue-400 hover:underline">hello@cre8ve.xyz</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Data Deletion</h2>
            <p>To request deletion of your data, email <a href="mailto:hello@cre8ve.xyz" className="text-blue-400 hover:underline">hello@cre8ve.xyz</a> with the subject &ldquo;Data Deletion Request&rdquo;. We will process your request within 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">8. Contact</h2>
            <p>Cre8ve AI Solutions<br />Email: <a href="mailto:hello@cre8ve.xyz" className="text-blue-400 hover:underline">hello@cre8ve.xyz</a><br />Website: <a href="https://cre8ve.xyz" className="text-blue-400 hover:underline">https://cre8ve.xyz</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
