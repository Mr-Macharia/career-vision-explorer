
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { User, Search, BookOpen, Briefcase, ArrowRight, CheckCircle } from "lucide-react";

const QuickStartGuide = () => {
  const steps = [
    {
      icon: User,
      title: "Create Your Profile",
      description: "Set up your professional profile in under 5 minutes",
      action: "Get Started",
      link: "/signup",
      time: "5 min",
      color: "bg-blue-500",
    },
    {
      icon: Search,
      title: "Get AI-Matched Jobs",
      description: "Our AI finds the perfect opportunities based on your skills",
      action: "Browse Jobs",
      link: "/jobs",
      time: "2 min",
      color: "bg-green-500",
    },
    {
      icon: BookOpen,
      title: "Skill Assessment",
      description: "Take quick assessments to showcase your expertise",
      action: "Start Assessment",
      link: "/profile",
      time: "10 min",
      color: "bg-purple-500",
    },
    {
      icon: Briefcase,
      title: "Apply & Get Hired",
      description: "Apply with confidence using our optimized application process",
      action: "View Applications",
      link: "/profile",
      time: "Ongoing",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4">Quick Start Guide</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who've fast-tracked their careers with our proven process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {step.time}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link to={step.link} className="flex items-center justify-center space-x-2">
                      <span>{step.action}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
                
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Average time to first interview: 2 weeks</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStartGuide;
