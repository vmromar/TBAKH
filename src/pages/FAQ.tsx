import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    { q: "How do I book a chef?", a: "Simply browse our list of verified professionals, review their specialties and pricing, and click the 'Book Now' button to propose an offer directly." },
    { q: "Are the prices negotiable?", a: "Yes! We employ a flexible negotiation tool allowing you to propose an offer based on the chef's established price range, similar to ride-sharing apps." },
    { q: "How do I pay?", a: "To ensure trust and simplicity, payment is handled securely via 'Cash on Service' directly with the chef once your event is completed." },
    { q: "Can I join as a chef?", a: "Absolutely. Click 'Join as Chef' during registration, complete your profile, and identity verification to let clients find you." }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 text-gray-900 selection:bg-brand-primary selection:text-gray-900">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-brand-primary/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 text-brand-green">Frequently Asked Questions</h1>
        <p className="text-gray-500 font-medium text-lg">Everything you need to know about how TBAKH works.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                <h3 className="text-xl font-black tracking-tight text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
            </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <span className="text-gray-500 font-medium">Still have questions? </span>
        <a href="mailto:omaaaaagh@gmail.com" className="text-brand-green font-bold hover:underline">Contact Support</a>
      </div>
    </div>
  );
}
