import { Navigation } from "@/components/Navigation";
import { SearchForm } from "@/components/SearchForm";
import { TrendingUp, Target, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Find Your Perfect
              <span className="block text-primary">Startup Match</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with startups that align with your investment goals, sector preferences, and growth objectives. 
              Discover opportunities tailored to your criteria.
            </p>
          </div>

          {/* Search Form */}
          <div className="mt-12 md:mt-16">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
                Enter Your Criteria
              </h2>
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose StartupMatch?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines the startup discovery process with advanced matching algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Precise Matching</h3>
              <p className="text-muted-foreground">
                Advanced algorithms match you with startups that meet your exact criteria and investment goals
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Growth Insights</h3>
              <p className="text-muted-foreground">
                Access detailed growth metrics, funding history, and future projections for informed decisions
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Fast Connections</h3>
              <p className="text-muted-foreground">
                Connect directly with founders and decision-makers to accelerate your investment process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-hero rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Discover Your Next Investment?
            </h2>
            <p className="text-lg opacity-90">
              Join hundreds of investors finding their perfect startup matches
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
