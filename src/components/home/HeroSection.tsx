
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center lg:text-left lg:col-span-7">
            <Badge className="inline-flex items-center space-x-2 mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3" />
              <span>AI-Powered Career Platform</span>
            </Badge>
            
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block text-foreground">Your Dream Career</span>
              <span className="block text-primary">Starts Here</span>
            </h1>
            
            <p className="mt-6 text-xl text-muted-foreground sm:max-w-xl sm:mx-auto lg:mx-0 leading-relaxed">
              Join thousands who've accelerated their careers with our AI-driven platform. 
              Get matched with perfect opportunities, develop in-demand skills, and land your dream job.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg" asChild>
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/jobs">
                  Browse 10,000+ Jobs
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Match Accuracy</div>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">2.5x</div>
                <div className="text-sm text-muted-foreground">Faster Hiring</div>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-card/50 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">AI Analysis in Progress</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="text-sm font-medium text-primary mb-2">Perfect Match Found!</div>
                      <div className="text-xs text-muted-foreground">Senior Frontend Developer at TechCorp</div>
                      <div className="text-xs text-muted-foreground">98% compatibility • $120K-$150K</div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Skills Gap Analysis</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>React</span>
                          <span className="text-green-600">✓ Expert</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>TypeScript</span>
                          <span className="text-blue-600">→ Improve</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
