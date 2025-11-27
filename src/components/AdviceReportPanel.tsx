import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContactDetailsDialog } from "./ContactDetailsDialog";

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
  const [showPreview, setShowPreview] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [hasSubmittedContact, setHasSubmittedContact] = useState(false);

  const handleGenerateClick = async () => {
    // Generate preview first
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-advice-report', {
        body: { searchCriteria }
      });

      if (error) throw error;

      setReport(data.report);
      setShowPreview(true);
      toast.success("Preview gegenereerd!");
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error("Er ging iets mis bij het genereren van het rapport");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReadMore = () => {
    if (!hasSubmittedContact) {
      setContactDialogOpen(true);
    }
  };

  const handleContactSubmit = (details: { name: string; email: string; phone: string }) => {
    console.log("Contact details submitted:", details);
    setHasSubmittedContact(true);
    setContactDialogOpen(false);
    toast.success("Volledig rapport is nu beschikbaar!");
  };

  // Get preview text (first 200 characters)
  const previewText = report ? report.substring(0, 200) + "..." : "";

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
          onClick={handleGenerateClick} 
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

        {showPreview && !hasSubmittedContact && (
          <div className="mt-4 p-4 bg-secondary/20 rounded-lg space-y-3">
            <h4 className="font-semibold flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4" />
              Preview Adviesrapport
            </h4>
            <div className="prose prose-sm max-w-none text-foreground">
              <div className="whitespace-pre-wrap text-sm">{previewText}</div>
            </div>
            <Button onClick={handleReadMore} variant="accent" className="w-full">
              Lees meer - Ontvang volledig rapport
            </Button>
          </div>
        )}

        {hasSubmittedContact && report && (
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

      <ContactDetailsDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        onSubmit={handleContactSubmit}
        title="Ontvang volledig rapport"
        description="Vul je gegevens in om het volledige adviesrapport te ontvangen."
      />
    </Card>
  );
};
