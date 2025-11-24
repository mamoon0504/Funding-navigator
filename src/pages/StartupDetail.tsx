import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, TrendingUp, Calendar, Globe, Mail, Phone, Target, DollarSign } from "lucide-react";

// Mock data - in a real app this would come from an API
const mockStartupData: Record<string, any> = {
  "1": {
    name: "TechVision AI",
    stage: "Growth",
    sector: "Technology",
    industry: "AI/ML",
    location: "San Francisco, CA",
    investment: "$1M - $5M",
    founded: "2019",
    website: "techvision-ai.com",
    email: "invest@techvision-ai.com",
    phone: "+1 (555) 123-4567",
    description: "Revolutionary AI platform transforming customer service with natural language processing and automated response systems. Our solution reduces support costs by 60% while improving customer satisfaction scores significantly.",
    fullDescription: `TechVision AI is at the forefront of artificial intelligence innovation, developing cutting-edge solutions that transform how businesses interact with their customers. Our platform leverages advanced natural language processing and machine learning algorithms to provide automated, yet highly personalized customer service experiences.

Founded in 2019, we've grown from a small team of AI researchers to a thriving company serving Fortune 500 clients across multiple industries. Our technology has processed over 10 million customer interactions, maintaining a 95% satisfaction rate while reducing operational costs by an average of 60%.`,
    metrics: {
      employees: "45",
      growth: "120% YoY",
      revenue: "$3.2M ARR",
      customers: "150+ Enterprise",
    },
    goals: [
      "Expand to European markets in Q2 2025",
      "Launch new multilingual support capabilities",
      "Grow team to 80 employees by year-end",
      "Achieve $10M ARR by end of 2025",
    ],
    highlights: [
      "Featured in TechCrunch and Forbes",
      "Partnership with Microsoft Azure",
      "98% customer retention rate",
      "5 granted patents in AI/ML",
    ],
  },
  // Add more mock data for other startups...
};

const StartupDetail = () => {
  const { id } = useParams();
  const startup = mockStartupData[id || "1"] || mockStartupData["1"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/results">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3">{startup.name}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{startup.location}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">{startup.stage}</Badge>
                <Badge variant="secondary">{startup.sector}</Badge>
                <Badge variant="secondary">{startup.industry}</Badge>
                <Badge variant="accent">{startup.investment}</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="accent" size="lg">
                Request Meeting
              </Button>
              <Button variant="outline">
                Download Pitch Deck
              </Button>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">{startup.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>About {startup.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {startup.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">Team Size</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{startup.metrics.employees}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm">Growth Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{startup.metrics.growth}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">Annual Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{startup.metrics.revenue}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Target className="w-4 h-4 mr-2" />
                      <span className="text-sm">Customers</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{startup.metrics.customers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Objectives */}
            <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle>Growth Plans & Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {startup.goals.map((goal: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Key Highlights */}
            <Card className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle>Key Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {startup.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="animate-scale-in sticky top-20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="font-medium text-foreground">{startup.founded}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a href={`https://${startup.website}`} className="font-medium text-primary hover:underline">
                      {startup.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${startup.email}`} className="font-medium text-primary hover:underline">
                      {startup.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${startup.phone}`} className="font-medium text-primary hover:underline">
                      {startup.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
