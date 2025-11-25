import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdviceReportPanelProps {
  searchCriteria: {
    stage?: string;
    sector?: string;
    industry?: string;
    investment?: string;
  };
}

export const AdviceReportPanel = ({ searchCriteria }: AdviceReportPanelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string>("");

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-advice-report', {
        body: { searchCriteria }
      });

      if (error) throw error;

      setReport(data.report);
      toast.success("Advies rapport gegenereerd!");
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error("Er ging iets mis bij het genereren van het rapport");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="sticky top-4 h-fit animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Advies Rapport
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Genereer een gepersonaliseerd adviesrapport op basis van jouw zoekcriteria met behulp van AI.
        </p>

        {searchCriteria && Object.keys(searchCriteria).length > 0 && (
          <div className="p-3 bg-secondary/30 rounded-lg space-y-2">
            <p className="text-sm font-medium">Jouw criteria:</p>
            <div className="flex flex-wrap gap-2">
              {searchCriteria.stage && (
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  Stage: {searchCriteria.stage}
                </span>
              )}
              {searchCriteria.sector && (
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  Sector: {searchCriteria.sector}
                </span>
              )}
              {searchCriteria.industry && (
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  Industry: {searchCriteria.industry}
                </span>
              )}
              {searchCriteria.investment && (
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  Investment: {searchCriteria.investment}
                </span>
              )}
            </div>
          </div>
        )}

        <Button 
          onClick={generateReport} 
          disabled={isGenerating}
          className="w-full"
          variant="accent"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Genereren...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Genereer Rapport
            </>
          )}
        </Button>

        {report && (
          <div className="mt-4 p-4 bg-secondary/20 rounded-lg space-y-3">
            <h4 className="font-semibold flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4" />
              Jouw Adviesrapport
            </h4>
            <div className="prose prose-sm max-w-none text-foreground">
              <div className="whitespace-pre-wrap text-sm">{report}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
