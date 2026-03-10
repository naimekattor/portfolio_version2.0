
import { BusinessValue } from '../components/business-value';
import { Communication } from '../components/communication';
import { CTA } from '../components/cta';
import { FeaturedProjects } from '../components/featured-projects';
import { Footer } from '../components/footer';
import { Hero } from '../components/hero';
import { Navbar } from '../components/navbar';
import { ProblemSolving } from '../components/problem-solving';
import { ProductionSystems } from '../components/production-systems';
import { Testimonials } from '../components/testimonials';
import  ChatBot  from '../components/ChatBot';
import TechnicalExpertise from '../components/technical-expertise';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <ProblemSolving />
      <ProductionSystems />
      <FeaturedProjects />
      <TechnicalExpertise />
      <Communication />
      <BusinessValue />
      <Testimonials />
      <CTA />
      <Footer />
      <ChatBot />
    </main>
  );
}
