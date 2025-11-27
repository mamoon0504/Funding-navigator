import { Navigation } from "@/components/Navigation";
import { AdviceReportPanel } from "@/components/AdviceReportPanel";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdviceReport = () => {
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [investment, setInvestment] = useState("");
  const [trlPhase, setTrlPhase] = useState("");
  const [searchCriteria, setSearchCriteria] = useState<any>({});

  const handleGenerateWithCriteria = () => {
    const criteria = {
      sector,
      industry,
      investment,
      trlPhase,
    };
    setSearchCriteria(criteria);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advies Rapport Generator
            </h1>
            <p className="text-muted-foreground">
              Vul je criteria in om een gepersonaliseerd adviesrapport te genereren
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Criteria Form */}
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Select value={sector} onValueChange={setSector}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Energy">Energy</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industrie</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies industrie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="CleanTech">CleanTech</SelectItem>
                        <SelectItem value="EdTech">EdTech</SelectItem>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment">Investment Range</Label>
                    <Select value={investment} onValueChange={setInvestment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$100K - $500K">$100K - $500K</SelectItem>
                        <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                        <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                        <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trlPhase">TRL-fase</Label>
                    <Select value={trlPhase} onValueChange={setTrlPhase}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kies TRL-fase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TRL 1-3">TRL 1-3: Basis onderzoek</SelectItem>
                        <SelectItem value="TRL 4-6">TRL 4-6: Ontwikkeling</SelectItem>
                        <SelectItem value="TRL 7-9">TRL 7-9: Commercialisatie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleGenerateWithCriteria} 
                    variant="accent"
                    className="w-full"
                  >
                    Update Criteria
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Advice Report Panel */}
            <div>
              <AdviceReportPanel searchCriteria={searchCriteria} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceReport;
