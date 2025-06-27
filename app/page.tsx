// C:\Users\Jenson\Tech\Compfest\v2\sea-catering\app\page.tsx

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks'; // Import HowItWorks
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ'; // Import FAQ
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks /> {/* Add the new section here */}
      <FAQ />        {/* And the FAQ section here */}
      <Testimonials />
      <Contact />
    </main>
  );
}