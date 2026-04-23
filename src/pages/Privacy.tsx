export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 text-gray-900 selection:bg-brand-primary selection:text-gray-900">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-4 text-brand-green">Privacy Policy</h1>
        <p className="text-gray-500 font-medium text-lg">Last updated: April 2026</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8 font-medium leading-relaxed text-gray-700">
        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">1. Information We Collect</h2>
          <p>We collect information to provide better services to our users. This includes basic account info like your name, phone number, and email. We may also request location permissions to help you find nearby chefs.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">2. How We Use Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services. Specifically, your contact information is shared *only* with the chefs you explicitly decide to book securely via our mail/booking protocols.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">3. Information Sharing</h2>
          <p>We do not share your personal information with companies, organizations, or individuals outside of TBAKH except when you secure a booking or for legal compliance reasons.</p>
        </section>
      </div>
    </div>
  );
}
