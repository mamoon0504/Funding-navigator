import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { FundingCard } from "@/components/FundingCard";
import { AdviceReportPanel } from "@/components/AdviceReportPanel";
import { ContactDetailsDialog } from "@/components/ContactDetailsDialog";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type FundingItem = {
  name: string;
  soort?: string;
  description?: string;
  check_size: string;
  funding_stages: string[];
  funding_requirement?: string;
  sector?: string;
  industry?: string;
  location?: string;
  source_url?: string;
  investment?: { min: number; max: number } | null;
  trl?: number[] | null;
};
type FundingRecord = FundingItem & { __idx: number };

const TRL_STAGE_MAP: Record<string, string[]> = {
  "trl1-3": ["Idea", "Prototype"],
  "trl4-6": ["Early Revenue"],
  "trl7-9": ["Scaling"],
};

const TRL_PHASE_RANGE: Record<string, { min: number; max: number }> = {
  "trl1-3": { min: 1, max: 3 },
  "trl4-6": { min: 4, max: 6 },
  "trl7-9": { min: 7, max: 9 },
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

const INVESTMENT_RANGES: Record<string, { min: number; max: number }> = {
  "0-100k": { min: 0, max: 100_000 },
  "100k-500k": { min: 100_000, max: 500_000 },
  "500k-1m": { min: 500_000, max: 1_000_000 },
  "1m-5m": { min: 1_000_000, max: 5_000_000 },
  "5m-10m": { min: 5_000_000, max: 10_000_000 },
  "10m+": { min: 10_000_000, max: Number.MAX_SAFE_INTEGER },
};

const parseAmount = (value: string): number | null => {
  if (!value) return null;
  const cleaned = value.replace(/[^0-9.km]/gi, "").toLowerCase();
  const multiplier = cleaned.includes("m") ? 1_000_000 : 1_000;
  const numeric = parseFloat(cleaned.replace(/[km]/g, ""));
  if (Number.isNaN(numeric)) return null;
  return numeric * multiplier;
};

const parseCheckSizeRange = (checkSize: string): { min: number; max: number } | null => {
  if (!checkSize) return null;
  const parts = checkSize.split(/to|-/i).map((p) => p.trim());
  if (parts.length === 0) return null;
  const min = parseAmount(parts[0]);
  const max = parts[1] ? parseAmount(parts[1]) : min;
  if (min == null || max == null) return null;
  return { min, max };
};

const matchesTrl = (item: FundingItem, trlPhase?: string) => {
  if (!trlPhase) return true;
  const phaseRange = TRL_PHASE_RANGE[trlPhase];
  if (phaseRange && item.trl && item.trl.length > 0) {
    return item.trl.some((level) => level >= phaseRange.min && level <= phaseRange.max);
  }
  const targets = TRL_STAGE_MAP[trlPhase] || [];
  return targets.some((target) =>
    item.funding_stages?.some((stage) => stage.toLowerCase().includes(target.toLowerCase()))
  );
};

const detectSector = (item: FundingItem): string => {
  if (item.sector) return item.sector;
  const text = `${item.soort || ""} ${item.funding_requirement || ""}`.toLowerCase();
  for (const [sector, keywords] of Object.entries(SECTOR_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return sector;
    }
  }
  return "onbekend";
};

const matchesSector = (item: FundingItem, selected?: string) => {
  if (!selected) return true;
  const derived = detectSector(item);
  return derived === selected;
};

const detectIndustry = (item: FundingItem): string => {
  if (item.industry) return item.industry;
  const text = `${item.funding_requirement || ""}`.toLowerCase();
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return industry;
    }
  }
  return "onbekend";
};

const matchesInvestment = (item: FundingItem, selected?: string) => {
  if (!selected) return true;
  const range = INVESTMENT_RANGES[selected];
  const checkRange = item.investment || parseCheckSizeRange(item.check_size);
  if (!range || !checkRange) return false;
  return checkRange.max >= range.min && checkRange.min <= range.max;
};

const formatInvestment = (item: FundingItem) => {
  if (item.check_size) return item.check_size;
  if (item.investment) {
    const { min, max } = item.investment;
    const fmt = (n: number) =>
      n >= 1_000_000 ? `€${(n / 1_000_000).toFixed(1)}m` : `€${Math.round(n / 1_000)}k`;
    return `${fmt(min)} - ${fmt(max)}`;
  }
  return "N.v.t.";
};

const formatStage = (item: FundingItem) => {
  if (item.funding_stages && item.funding_stages.length > 0) return item.funding_stages.join(", ");
  if (item.trl && item.trl.length > 0) {
    const min = Math.min(...item.trl);
    const max = Math.max(...item.trl);
    if (max <= 3) return "Idea / Prototype";
    if (max <= 6) return "Early Revenue";
    return "Scaling";
  }
  return "Onbekend";
};

const Results = () => {
  const location = useLocation();
  const searchCriteria = location.state || {};
  const showAdviceReport = searchCriteria.showAdviceReport || false;
  const trlPhase = searchCriteria.trlPhase as string | undefined;
  const sector = searchCriteria.sector as string | undefined;
  const investment = searchCriteria.investment as string | undefined;
  const [showAll, setShowAll] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const { data: fundingData = [], isLoading, isError } = useQuery<FundingItem[]>({
    queryKey: ["funding-data"],
    queryFn: async () => {
      const res = await fetch("/openvc_netherlands_structured.json");
      if (!res.ok) throw new Error("Kon funding data niet laden");
      return res.json();
    },
  });

  const filteredFunding: FundingRecord[] = useMemo(() => {
    const withIndex: FundingRecord[] = fundingData.map((item, idx) => ({ ...item, __idx: idx }));
    return withIndex.filter(
      (item) => matchesTrl(item, trlPhase) && matchesInvestment(item, investment) && matchesSector(item, sector)
    );
  }, [fundingData, trlPhase, investment, sector]);

  const hasCriteria = Object.keys(searchCriteria).filter((key) => key !== "showAdviceReport").length > 0;
  const sourceFunding: FundingRecord[] = hasCriteria
    ? filteredFunding
    : fundingData.map((item, idx) => ({ ...item, __idx: idx }));
  const displayedFunding = showAll ? sourceFunding : sourceFunding.slice(0, 3);

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
            {hasCriteria ? "Financierings Matches" : "Algemene Financieringsmogelijkheden"}
          </h1>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className="text-muted-foreground">
              {hasCriteria
                ? `${filteredFunding.length} financieringsmogelijkheden gevonden die passen bij jouw criteria`
                : "Vul je criteria in om gepersonaliseerde matches te zien"}
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/">
                <Filter className="w-4 h-4 mr-2" />
                {hasCriteria ? "Verfijn Zoekopdracht" : "Vul Criteria In"}
              </a>
            </Button>
          </div>
        </div>

        {/* Search Criteria Summary */}
        {hasCriteria && Object.keys(searchCriteria).filter((key) => key !== "showAdviceReport").length > 0 && (
          <div className="mb-8 p-4 bg-secondary/50 rounded-lg animate-fade-in">
            <h3 className="text-sm font-semibold text-foreground mb-2">Jouw Zoekcriteria:</h3>
            <div className="flex flex-wrap gap-2">
              {trlPhase && (
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  TRL: {trlPhase}
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
              {investment && (
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Investment: {investment}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results Layout - 2 Column: Startups Left, Advice Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Funding Cards */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {isLoading && <p className="text-muted-foreground">Data laden...</p>}
              {isError && <p className="text-destructive">Kon de funding data niet laden.</p>}

              {!isLoading && displayedFunding.length === 0 && (
                <p className="text-muted-foreground">Geen resultaten gevonden voor de gekozen criteria.</p>
              )}

              {displayedFunding.map((funding, index) => (
                <FundingCard
                  key={`${funding.name}-${funding.__idx}`}
                  id={`${funding.__idx}`}
                  name={funding.name}
                  stage={formatStage(funding)}
                  sector={detectSector(funding) || funding.soort || "Sector onbekend"}
                  industry={
                    searchCriteria.industry && searchCriteria.industry !== ""
                      ? searchCriteria.industry
                      : detectIndustry(funding)
                  }
                  location={funding.location || "Nederland"}
                  investment={formatInvestment(funding)}
                  description={funding.funding_requirement || funding.description || "Geen beschrijving beschikbaar."}
                />
              ))}
              {!showAll && sourceFunding.length > 3 && (
                <div className="flex justify-center pt-4">
                  <Button onClick={handleShowMore} variant="accent" size="lg">
                    Laat meer zien ({sourceFunding.length - 3} meer)
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
