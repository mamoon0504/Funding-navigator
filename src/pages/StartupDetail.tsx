import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Globe } from "lucide-react";

type FundingItem = {
  name: string;
  soort?: string;
  check_size: string;
  funding_stages: string[];
  funding_requirement?: string;
};

const SECTOR_KEYWORDS: Record<string, string[]> = {
  technology: ["tech", "software", "ai", "machine learning", "data", "digital"],
  healthcare: ["health", "zorg", "medical", "medisch", "care"],
  finance: ["fintech", "finance", "financial", "bank", "payment"],
  education: ["edtech", "education", "onderwijs", "learning"],
  retail: ["retail", "e-commerce", "commerce", "shopping"],
  energy: ["energy", "energie", "sustainability", "duurzaam", "climate", "cleantech"],
  manufacturing: ["industry", "manufacturing", "productie", "industrial"],
};

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  ai: ["ai", "machine learning", "ml", "artificial intelligence"],
  fintech: ["fintech", "payment", "bank", "financial"],
  healthtech: ["healthtech", "health", "zorg", "medical", "medisch"],
  cleantech: ["cleantech", "duurzaam", "sustainability", "climate", "energy", "energie"],
  edtech: ["edtech", "education", "onderwijs", "learning"],
  ecommerce: ["e-commerce", "commerce", "shopping", "retail"],
};

const detectSector = (item: FundingItem): string => {
  const text = `${item.soort || ""} ${item.funding_requirement || ""}`.toLowerCase();
  for (const [sector, keywords] of Object.entries(SECTOR_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return sector;
    }
  }
  return "onbekend";
};

const detectIndustry = (item: FundingItem): string => {
  const text = `${item.funding_requirement || ""}`.toLowerCase();
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return industry;
    }
  }
  return "onbekend";
};

const StartupDetail = () => {
  const { id } = useParams();
  const numericId = Number(id);

  const { data: fundingData = [], isLoading, isError } = useQuery<FundingItem[]>({
    queryKey: ["funding-data"],
    queryFn: async () => {
      const res = await fetch("/openvc_netherlands_all_pages.json");
      if (!res.ok) throw new Error("Kon funding data niet laden");
      return res.json();
    },
  });

  const funding = useMemo(() => {
    if (Number.isNaN(numericId)) return null;
    return fundingData[numericId] || null;
  }, [fundingData, numericId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground">Data laden...</p>
        </div>
      </div>
    );
  }

  if (isError || !funding) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-destructive">Kon de details niet laden.</p>
          <Link to="/results">
            <Button variant="ghost" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar resultaten
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const sector = detectSector(funding);
  const industry = detectIndustry(funding);
  const stage = funding.funding_stages?.join(", ") || "Onbekend";
  const investment = funding.check_size || "N.v.t.";
  const description = funding.funding_requirement || "Geen beschrijving beschikbaar.";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/results">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug naar resultaten
          </Button>
        </Link>

        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3">{funding.name}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Nederland</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">{stage}</Badge>
                <Badge variant="secondary">{sector}</Badge>
                <Badge variant="secondary">{industry}</Badge>
                <Badge variant="accent">{investment}</Badge>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Over {funding.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-scale-in sticky top-20">
              <CardHeader>
                <CardTitle>Basis Informatie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Opgericht</p>
                    <p className="font-medium text-foreground">N.v.t.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="font-medium text-foreground">N.v.t.</p>
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
