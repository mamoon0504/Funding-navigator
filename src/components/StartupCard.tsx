import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface StartupCardProps {
  id: string;
  name: string;
  stage: string;
  sector: string;
  industry: string;
  location: string;
  investment: string;
  description: string;
  metrics?: {
    employees?: string;
    growth?: string;
  };
}

export const StartupCard = ({ 
  id, 
  name, 
  stage, 
  sector, 
  industry, 
  location, 
  investment, 
  description,
  metrics 
}: StartupCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card animate-scale-in">
      <CardHeader>
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>
          <Badge variant="success">{stage}</Badge>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{sector}</Badge>
          <Badge variant="secondary">{industry}</Badge>
          <Badge variant="accent">{investment}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>

        {metrics && (
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            {metrics.employees && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{metrics.employees}</span>
              </div>
            )}
            {metrics.growth && (
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{metrics.growth}</span>
              </div>
            )}
          </div>
        )}

        <Link to={`/startup/${id}`}>
          <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
