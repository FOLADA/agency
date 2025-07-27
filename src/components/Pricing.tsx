import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export default function PricingSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const pricing = t('pricingSection', { returnObjects: true }) as any;
  const packages = pricing && pricing.packages ? pricing.packages : {};
  const buttons = pricing && pricing.buttons ? pricing.buttons : {};

  // Helper to get the correct button label for each package
  function getButtonLabel(pkgKey: string) {
    if (!buttons) return '';
    switch (pkgKey) {
      case 'webElite': return buttons.getPremiumWebsite;
      case 'appElite': return buttons.getPremiumApp;
      case 'smmElite': return buttons.getPremiumSMM;
      case 'identityElite': return buttons.getPremiumBrandIdentity;
      case 'contentElite': return buttons.getPremiumContentStrategy;
      case 'digitalGrowthSuite': return buttons.getUnitedPackage;
      case 'brandDominator': return buttons.getBrandDominator;
      case 'allInOne': return buttons.getAllInOne;
      default: return buttons.getStarted || '';
    }
  }

  // List of package keys in display order
  const packageOrder = [
    'webStarter', 'webPremium', 'webElite',
    'appStarter', 'appPremium', 'appElite',
    'smmStarter', 'smmPremium', 'smmElite',
    'identityStarter', 'identityPremium', 'identityElite',
    'contentStarter', 'contentPremium', 'contentElite',
    'digitalGrowthSuite', 'brandDominator', 'allInOne'
  ];

  // Fallback if translations are missing
  if (!pricing || !pricing.heading || !pricing.subtitle || !pricing.included || !packages || !buttons) {
    return (
      <section id="pricing" className="py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container mx-auto px-6 text-center text-red-400">
          <h2 className="text-3xl font-bold mb-4">Pricing translations not found</h2>
          <p>Please check your translation files for the 'pricingSection' key.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {pricing.heading}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            {pricing.subtitle}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {packageOrder.map((pkgKey) => {
            const pkg = packages[pkgKey];
            if (!pkg) return null;
            return (
            <div
                key={pkgKey}
              className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden ${
    pkg.badge ? "border-amber-500/50 bg-amber-900/20" : ""
                } ${pkgKey === 'digitalGrowthSuite' || pkgKey === 'brandDominator' || pkgKey === 'allInOne' ? "xl:col-span-3" : ""}`}
            >
              {pkg.badge && (
                <div className="absolute mt-7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  {pkg.badge}
                </div>
              )}

              <div className="p-8 pt-14 xl:pt-10">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    {pkg.price || ''}
                </div>
                <p className="text-slate-400 mt-4 mb-6 min-h-[56px]">
                    {pkg.note}
                </p>

                <h4 className="font-bold text-lg text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
                    {pricing.included}
                </h4>
                <ul className="space-y-3 mb-8">
                    {pkg.features && pkg.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                {pkg.note && (
                  <div className={`p-4 rounded-lg mb-6 ${
                      pkgKey.startsWith('smm') ? "bg-amber-900/20 text-amber-200" : "bg-slate-800/50 text-slate-400 italic"
  }`}>
                    {pkg.note}
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                        {getButtonLabel(pkgKey)}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                          {pkg.name} {pkg.price ? `- ${pkg.price}` : ''}
                      </DialogTitle>
                    </DialogHeader>
                    <ContactForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            {/* You may want to add a translation key for this custom offer text as well */}
            Need something even more customised?
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-amber-400 mx-1 hover:text-orange-400 underline cursor-pointer">
                  {t('contactfoot.email_label')}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    {t('contactfoot.email_label')} Folada
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
            {/* You may want to add a translation key for this part too */}
            and we'll appoint a meeting to tailor a plan just for you.
          </p>
        </div>
      </div>
    </section>
  );
}
