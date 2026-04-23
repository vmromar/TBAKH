export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 text-gray-900 selection:bg-brand-primary selection:text-gray-900">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-4 text-brand-green">Terms of Service</h1>
        <p className="text-gray-500 font-medium text-lg">Last updated: April 2026</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8 font-medium leading-relaxed text-gray-700">
        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using TBAKH, you accept and agree to be bound by the terms and provision of this agreement. Furthermore, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">2. Provision of Services</h2>
          <p>TBAKH acts purely as an intermediary platform connecting independent professional chefs with clients. We do not employ the chefs directly and are not responsible for the food preparation standards, though we enforce strict vetting during onboarding.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">3. Payments and Booking</h2>
          <p>Clients agree to pay the agreed-upon negotiated price directly to the Chef via the "Cash on Service" model, unless otherwise stipulated via private agreement. TBAKH is not liable for defaulted payments.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">4. User Conduct</h2>
          <p>Users agree to communicate professionally and respectfully. Any harassment, spamming, or fraudulent bookings will result in immediate termination of account access.</p>
        </section>
      </div>
    </div>
  );
}
