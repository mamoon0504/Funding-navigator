import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { toast } from "sonner";

export const SearchForm = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("");
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [investment, setInvestment] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stage && !sector && !industry && !investment) {
      toast.error("Please select at least one criteria");
      return;
    }

    toast.success("Searching for matches...");
    navigate("/results", { 
      state: { stage, sector, industry, investment } 
    });
  };

  const handleAdviceReport = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!stage && !sector && !industry && !investment) {
      toast.error("Please select at least one criteria");
      return;
    }

    toast.success("Preparing advice report...");
    navigate("/results", { 
      state: { stage, sector, industry, investment, showAdviceReport: true } 
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stage Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Stage</label>
          <Select value={stage} onValueChange={setStage}>
            <SelectTrigger>
              <SelectValue placeholder="Select startup stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="startup">Startup</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="scaleup">Scale-up</SelectItem>
              <SelectItem value="mature">Mature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sector Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Sector</label>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Industry Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Industry</label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="ai">AI/ML</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="healthtech">HealthTech</SelectItem>
              <SelectItem value="edtech">EdTech</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="biotech">BioTech</SelectItem>
              <SelectItem value="cleantech">CleanTech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Investment Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Investment Range</label>
          <Select value={investment} onValueChange={setInvestment}>
            <SelectTrigger>
              <SelectValue placeholder="Select investment range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-100k">$0 - $100K</SelectItem>
              <SelectItem value="100k-500k">$100K - $500K</SelectItem>
              <SelectItem value="500k-1m">$500K - $1M</SelectItem>
              <SelectItem value="1m-5m">$1M - $5M</SelectItem>
              <SelectItem value="5m-10m">$5M - $10M</SelectItem>
              <SelectItem value="10m+">$10M+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Buttons */}
      <div className="flex justify-center gap-4 pt-4 flex-wrap">
        <Button type="submit" variant="accent" size="lg" className="min-w-[200px]">
          <Search className="w-5 h-5 mr-2" />
          Find Matches
        </Button>
        <Button type="button" onClick={handleAdviceReport} variant="secondary" size="lg" className="min-w-[200px]">
          <Search className="w-5 h-5 mr-2" />
          Advies Rapport
        </Button>
      </div>
    </form>
  );
};
