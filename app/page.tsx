
import { BusinessValue } from '../components/business-value';
import { CTA } from '../components/cta';
import { FeaturedProjects } from '../components/featured-projects';
import { Footer } from '../components/footer';
import { Hero } from '../components/hero';
import { Navbar } from '../components/navbar';
import { ProblemSolving } from '../components/problem-solving';
import { ServicesSection } from '../components/services-section';
import { ProductionSystems } from '../components/production-systems';
import { Testimonials } from '../components/testimonials';
import ChatContainer from '../components/ai-chat/chat-container';
import TechnicalExpertise from '../components/technical-expertise';
import Communication from '@/components/communication';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <ProblemSolving />
      <ServicesSection />
      <ProductionSystems />
      <FeaturedProjects />
      <TechnicalExpertise />
      <Communication />
      <BusinessValue />
      <Testimonials />
      <CTA />
      <Footer />
      <ChatContainer />
    </main>
  );
}
