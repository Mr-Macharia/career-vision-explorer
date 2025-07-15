import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import QuickStartGuide from "@/components/home/QuickStartGuide";
import FeatureSection from "@/components/home/FeatureSection";
import JobListingSection from "@/components/home/JobListingSection";
import TestimonialSection from "@/components/home/TestimonialSection";

const Index = () => {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      salary: "$90k - $120k", 
      tags: ["Figma", "User Research", "Prototyping"]
    },
    {
      id: 3,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$130k - $160k",
      tags: ["Product Strategy", "Analytics", "Agile"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Visiondrill helped me land my dream job at a top tech company. The skill assessments were incredibly helpful!",
      author: "Sarah Johnson",
      role: "Software Engineer at Google",
      rating: 5
    },
    {
      id: 2,
      quote: "The career path guidance was exactly what I needed to transition from marketing to UX design.",
      author: "Michael Chen",
      role: "UX Designer at Airbnb",
      rating: 5
    },
    {
      id: 3,
      quote: "I love how personalized the job recommendations are. Found multiple opportunities that were perfect fits.",
      author: "Emily Rodriguez",
      role: "Product Manager at Netflix",
      rating: 5
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <HeroSection />
        <QuickStartGuide />
        <FeatureSection />
        <JobListingSection featuredJobs={featuredJobs} />
        <TestimonialSection testimonials={testimonials} />
      </div>
    </Layout>
  );
};

export default Index;
