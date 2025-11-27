import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Send, TrendingUp, Target, Zap, Users } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Hoe het werkt
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Het Nederlandse en Europese aanbod aan financiering is enorm, maar vaak onoverzichtelijk. 
            Onze slimme tool koppelt jouw startup automatisch aan de meest passende financieringsmogelijkheden.
          </p>
        </div>

        {/* Main Steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">In 3 simpele stappen naar jouw funding</h2>
          <p className="text-center text-muted-foreground mb-12">Zo eenvoudig is het om de juiste financiering te vinden</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative animate-fade-in hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">Zoek Investeerders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Browse door honderden actieve investeerders met hun voorkeuren en portfolio
                </p>
              </CardContent>
            </Card>

            <Card className="relative animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">Pitch je Startup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Stuur je pitch direct naar relevante investeerders via het platform
                </p>
              </CardContent>
            </Card>

            <Card className="relative animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">Krijg Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Sluit deals en groei je startup met de juiste investeerders
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom onze tool?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Slimme Matching</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Onze AI-gedreven algoritmes matchen jouw startup automatisch met de meest relevante investeerders 
                  op basis van sector, fase, en investeringsbereik.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Tijdsbesparing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Geen eindeloos zoeken meer. Vind in minuten de investeerders die passen bij jouw startup, 
                  in plaats van weken te besteden aan research.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Uitgebreid Netwerk</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Toegang tot meer dan 10.000 financieringsmogelijkheden, van angel investors tot venture capital 
                  en subsidies in Nederland en Europa.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Bewezen Resultaten</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Meer dan 2.000 succesvolle matches hebben al geleid tot funding deals. 
                  Sluit je aan bij de groeiende community van succesvolle startups.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Klaar om te beginnen?</h2>
          <p className="text-muted-foreground mb-8">
            Start vandaag nog met het vinden van de perfecte investeerders voor jouw startup
          </p>
          <a href="/" className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start nu gratis
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
