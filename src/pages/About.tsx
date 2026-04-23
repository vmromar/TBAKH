import { Link } from "react-router-dom";
import { Info } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 text-gray-900 selection:bg-brand-primary selection:text-gray-900">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-brand-primary/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-4 text-brand-green">About TBAKH</h1>
        <p className="text-gray-500 font-medium text-lg">Bringing the best culinary talent directly to your events.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8 font-medium leading-relaxed text-gray-700">
        <p>
          Welcome to <strong className="text-gray-900 font-black">TBAKH</strong>, the premier marketplace platform connecting discerning clients with professional chefs specializing in weddings, corporate events, and private gatherings across Morocco.
        </p>

        <h2 className="text-2xl font-black text-gray-900 tracking-tight pt-4">Our Mission</h2>
        <p>
          We believe that exceptional food is the cornerstone of any memorable event. Our mission is to democratize access to high-end culinary talent, removing the friction from hiring professional chefs. Whether you are hosting an intimate dinner party or a grand wedding, we ensure that every meal is crafted with passion and expertise.
        </p>

        <h2 className="text-2xl font-black text-gray-900 tracking-tight pt-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
            <li><strong>Verified Talent:</strong> Every chef on our platform undergoes a rigorous vetting process to guarantee quality and professionalism.</li>
            <li><strong>Transparent Pricing:</strong> We believe in clear, upfront pricing with our unique negotiation tools to fit your budget.</li>
            <li><strong>Seamless Experience:</strong> From browsing to booking, our platform is designed to be intuitive and stress-free.</li>
        </ul>

        <div className="pt-8">
            <Link to="/" className="inline-block bg-gray-900 text-white font-black px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
              Discover Chefs Today
            </Link>
        </div>
      </div>
    </div>
  );
}
