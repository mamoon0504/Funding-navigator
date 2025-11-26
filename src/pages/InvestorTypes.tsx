import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InvestorTypes = () => {
  const investorTypes = [
    {
      title: "Eigen vermogen",
      description: "Je gebruikt je eigen spaargeld of inkomsten van de eerste klanten om te investeren en te groeien.",
      advantages: "Het voordeel hiervan is dat je de volledige controle hebt en je bent geen aandelen kwijt.",
      disadvantages: "Het nadeel hiervan is dat de groei traag kan zijn door beperkte middelen."
    },
    {
      title: "Friends & Family",
      description: "Investeren van vrienden en familie is vaak de eerste stap voor veel ondernemers. Het biedt snelle en toegankelijke financiering zonder de lange procedures van formele investeringen.",
      disadvantages: "Echter, het brengt ook emotionele risico's met zich mee. Als het bedrijf niet succesvol is, kunnen persoonlijke relaties onder druk komen te staan. Dit kan leiden tot spanningen en conflicten die verder gaan dan de financiële implicaties."
    },
    {
      title: "Angel-investeerders",
      description: "Angel-investeerders zijn individuen die hun eigen geld investeren in startups of vroege fase bedrijven in ruil voor aandelen. Ze zijn vaak bereid om meer risico te nemen dan traditionele investeerders, omdat ze geloven in het groeipotentieel.",
      note: "Dit type investering kan hoge rendementen opleveren, maar het is ook belangrijk om te weten dat niet alle startups succesvol zijn. Angel-investeerders bieden vaak meer dan alleen geld; ze kunnen ook waardevolle ervaring en netwerken meebrengen."
    },
    {
      title: "Venture Capital (VC)",
      description: "Venture Capital is een vorm van investering die gericht is op snelgroeiende bedrijven. VC-firma's investeren meestal grotere bedragen in ruil voor een aanzienlijk aandelenbelang.",
      note: "Hoewel deze investeringen veel groeikapitaal kunnen bieden, komen ze vaak met strenge voorwaarden, zoals het verlagen van de bedrijfseigenaar's controle over het bedrijf, het stellen van specifieke prestatiedoelen en het eisen van een exitstrategie."
    },
    {
      title: "Private Equity (PE)",
      description: "Private equity-investeerders kopen een meerderheid of volledige aandelen van gevestigde bedrijven. Ze zijn gericht op groei en verbetering van deze bedrijven, vaak door middel van herstructurering of uitbreiding.",
      note: "Private equity vereist vaak een aanzienlijke investering en kan langetermijncommitment met zich meebrengen. Zoals bij VC, kunnen er ook aanzienlijke voorwaarden en invoeringen zijn, maar de focus ligt meer op stabiele, gevestigde bedrijven."
    },
    {
      title: "Regionale Ontwikkelingsmaatschappijen (ROM's)",
      description: "ROM's zijn organisaties die lokale ondernemers ondersteunen door financiering en advies te bieden. Ze richten zich vaak op regionale ontwikkeling en economische groei, met het doel om de werkgelegenheid en lokale startups te stimuleren.",
      note: "ROM's kunnen zowel financiële als niet-financiële ondersteuning bieden, en ze hebben meestal een goed begrip van de specifieke behoeften en uitdagingen van lokale ondernemers."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Soorten investeerders
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Ontdek welke type investeerder het beste bij jouw startup past
          </p>

          <div className="space-y-6">
            {investorTypes.map((investor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{investor.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {investor.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {investor.advantages && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                        Voordelen:
                      </p>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        {investor.advantages}
                      </p>
                    </div>
                  )}
                  {investor.disadvantages && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                      <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-1">
                        Nadelen:
                      </p>
                      <p className="text-sm text-orange-800 dark:text-orange-200">
                        {investor.disadvantages}
                      </p>
                    </div>
                  )}
                  {investor.note && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {investor.note}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorTypes;