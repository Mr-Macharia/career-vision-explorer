import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import QuickStartGuide from "@/components/home/QuickStartGuide";
import FeatureSection from "@/components/home/FeatureSection";
import JobListingSection from "@/components/home/JobListingSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <HeroSection />
        <QuickStartGuide />
        <FeatureSection />
        <JobListingSection />
        <TestimonialSection />
        <FAQSection />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Index;
