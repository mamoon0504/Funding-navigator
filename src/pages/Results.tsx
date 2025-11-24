import { Navigation } from "@/components/Navigation";
import { StartupCard } from "@/components/StartupCard";
import { useLocation } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - in a real app this would come from an API
const mockStartups = [
  {
    id: "1",
    name: "TechVision AI",
    stage: "Growth",
    sector: "Technology",
    industry: "AI/ML",
    location: "San Francisco, CA",
    investment: "$1M - $5M",
    description: "Revolutionary AI platform transforming customer service with natural language processing and automated response systems. Our solution reduces support costs by 60% while improving customer satisfaction.",
    metrics: {
      employees: "45 employees",
      growth: "120% YoY",
    },
  },
  {
    id: "2",
    name: "HealthFlow",
    stage: "Startup",
    sector: "Healthcare",
    industry: "HealthTech",
    location: "Boston, MA",
    investment: "$500K - $1M",
    description: "Digital health platform connecting patients with healthcare providers through seamless telemedicine solutions. HIPAA compliant with 50K+ active users.",
    metrics: {
      employees: "28 employees",
      growth: "95% YoY",
    },
  },
  {
    id: "3",
    name: "GreenEnergy Solutions",
    stage: "Scale-up",
    sector: "Energy",
    industry: "CleanTech",
    location: "Austin, TX",
    investment: "$5M - $10M",
    description: "Innovative solar energy storage solutions for residential and commercial applications. Patent-pending technology increases efficiency by 40%.",
    metrics: {
      employees: "120 employees",
      growth: "200% YoY",
    },
  },
  {
    id: "4",
    name: "EduLearn Pro",
    stage: "Startup",
    sector: "Education",
    industry: "EdTech",
    location: "New York, NY",
    investment: "$500K - $1M",
    description: "Adaptive learning platform using AI to personalize education experiences for K-12 students. Currently serving 200+ schools across 15 states.",
    metrics: {
      employees: "32 employees",
      growth: "150% YoY",
    },
  },
  {
    id: "5",
    name: "FinSecure",
    stage: "Growth",
    sector: "Finance",
    industry: "FinTech",
    location: "London, UK",
    investment: "$1M - $5M",
    description: "Next-generation fraud detection platform for financial institutions. Real-time analysis prevents 99.9% of fraudulent transactions.",
    metrics: {
      employees: "65 employees",
      growth: "180% YoY",
    },
  },
  {
    id: "6",
    name: "RetailConnect",
    stage: "MVP",
    sector: "Retail",
    industry: "E-commerce",
    location: "Seattle, WA",
    investment: "$100K - $500K",
    description: "Omnichannel retail platform helping small businesses compete with major retailers. Unified inventory and sales management.",
    metrics: {
      employees: "12 employees",
      growth: "75% YoY",
    },
  },
];

const Results = () => {
  const location = useLocation();
  const searchCriteria = location.state || {};

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Startup Matches
          </h1>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-muted-foreground">
              Found {mockStartups.length} startups matching your criteria
            </p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Refine Search
            </Button>
          </div>
        </div>

        {/* Search Criteria Summary */}
        {Object.keys(searchCriteria).length > 0 && (
          <div className="mb-8 p-4 bg-secondary/50 rounded-lg animate-fade-in">
            <h3 className="text-sm font-semibold text-foreground mb-2">Your Search Criteria:</h3>
            <div className="flex flex-wrap gap-2">
              {searchCriteria.stage && (
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Stage: {searchCriteria.stage}
                </span>
              )}
              {searchCriteria.sector && (
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Sector: {searchCriteria.sector}
                </span>
              )}
              {searchCriteria.industry && (
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Industry: {searchCriteria.industry}
                </span>
              )}
              {searchCriteria.investment && (
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Investment: {searchCriteria.investment}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStartups.map((startup, index) => (
            <div
              key={startup.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StartupCard {...startup} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
