import { Navigation } from "@/components/Navigation";
import { StartupCard } from "@/components/StartupCard";
import { AdviceReportPanel } from "@/components/AdviceReportPanel";
import { useLocation } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContactDetailsDialog } from "@/components/ContactDetailsDialog";

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
  const showAdviceReport = searchCriteria.showAdviceReport || false;
  const [showAll, setShowAll] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  // Check if we have any search criteria
  const hasCriteria = Object.keys(searchCriteria).filter(key => key !== 'showAdviceReport').length > 0;
  
  // Show general funding options if no criteria
  const displayedStartups = !hasCriteria 
    ? mockStartups.slice(0, 3) 
    : showAll ? mockStartups : mockStartups.slice(0, 3);

  const handleShowMore = () => {
    setContactDialogOpen(true);
  };

  const handleContactSubmit = (details: { name: string; email: string; phone: string }) => {
    console.log("Contact details submitted:", details);
    setShowAll(true);
    setContactDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {hasCriteria ? "Startup Matches" : "Algemene Financieringsmogelijkheden"}
          </h1>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-muted-foreground">
              {hasCriteria 
                ? `Found ${mockStartups.length} startups matching your criteria`
                : "Vul je criteria in om gepersonaliseerde matches te zien"}
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/">
                <Filter className="w-4 h-4 mr-2" />
                {hasCriteria ? "Refine Search" : "Vul Criteria In"}
              </a>
            </Button>
          </div>
        </div>

        {/* Search Criteria Summary */}
        {hasCriteria && Object.keys(searchCriteria).filter(key => key !== 'showAdviceReport').length > 0 && (
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

        {/* Results Layout - 2 Column: Startups Left, Advice Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Startup Cards */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {displayedStartups.map((startup, index) => (
                <StartupCard key={index} {...startup} />
              ))}
              {!showAll && mockStartups.length > 3 && (
                <div className="flex justify-center pt-4">
                  <Button onClick={handleShowMore} variant="accent" size="lg">
                    Laat meer zien ({mockStartups.length - 3} meer)
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Advice Report Panel */}
          <div className="lg:col-span-1">
            <AdviceReportPanel searchCriteria={searchCriteria} />
          </div>
        </div>
      </div>

      <ContactDetailsDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        onSubmit={handleContactSubmit}
        title="Contactgegevens vereist"
        description="Vul je gegevens in om meer matches te zien."
      />
    </div>
  );
};

export default Results;
