import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0f1b3d] text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* CTA */}
          <div className="space-y-3">
            <p className="text-sm text-white/80">Blijf op de hoogte</p>
            <h2 className="text-3xl font-bold leading-tight">
              Kom in contact met ons team.
            </h2>
            <p className="text-white/70 text-sm max-w-xl">
              Stel je vraag, plan een demo of ontvang persoonlijk advies over je funding- en subsidieaanpak.
            </p>
            <Button asChild variant="secondary" className="bg-white text-[#0f1b3d] hover:bg-white/90">
              <Link to="/contact">Kom in contact</Link>
            </Button>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:col-span-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Platform</h3>
              <div className="flex flex-col space-y-1 text-white/80 text-sm">
                <Link to="/">Home</Link>
                <Link to="/results">Investor finder</Link>
                <Link to="/subsidie-finder">Subsidie finder</Link>
                <Link to="/advies-rapport">Advies rapport</Link>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Informatie</h3>
              <div className="flex flex-col space-y-1 text-white/80 text-sm">
                <Link to="/hoe-werkt-het">Hoe werkt het</Link>
                <Link to="/mijn-trl-fase">Mijn TRL-fase</Link>
                <Link to="/soorten-investeerders">Soorten investeerders</Link>
                <Link to="/wat-zijn-subsidies">Wat zijn subsidies</Link>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Support</h3>
              <div className="flex flex-col space-y-1 text-white/80 text-sm">
                <Link to="/contact">Contact</Link>
                <Link to="/results">Funding matches</Link>
              </div>
              <div className="flex gap-3 pt-2">
                <a href="https://facebook.com" aria-label="Facebook" className="text-white/70 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="text-white/70 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="text-white/70 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
