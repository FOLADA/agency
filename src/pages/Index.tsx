import { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Users, Zap, Target, BarChart3, Globe, CheckCircle, Quote, ChevronDown, Sparkles, Award, TrendingUp, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import CustomCursor from '@/components/CustomCursor';
import PortfolioSection from '@/components/Portfolio';
import ServicesSection from '@/components/Services';
import AboutSection from '@/components/About';
import PricingSection from '@/components/Pricing';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const Index = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500%', label: t('stats.roi'), icon: <TrendingUp className="w-5 h-5" /> },
    { number: '36', label: t('stats.identities'), icon: <Globe className="w-5 h-5" /> },
    { number: '24', label: t('stats.campaigns'), icon: <Zap className="w-5 h-5" /> },
    { number: '99.2%', label: t('stats.satisfaction'), icon: <Award className="w-5 h-5" /> }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Load testimonials from translations
  const testimonials = t('testimonials.testimonialsList', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    role: string;
    website: string;
    rating: number;
  }>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white overflow-x-hidden cursor-none">
      <CustomCursor mousePosition={mousePosition} />
      
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            {t('brand')}
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              {t('nav.portfolio')}
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              {t('nav.about')}
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              {t('nav.pricing')}
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 cursor-pointer font-medium">
                  {t('nav.get_started')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    {t('contact.schedule_consultation')}
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Minimalist Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Geometric Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10 hover:opacity-20 transition-opacity duration-1000"
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${20 + (i * 8)}%`,
                transform: `translateY(${Math.sin(scrollY * 0.002 + i) * 30}px) rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${i % 2 === 0 ? 'from-amber-400 to-orange-500' : 'from-violet-400 to-purple-500'} ${i % 3 === 0 ? 'rounded-full' : 'rounded-lg'} shadow-xl`} />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full border border-amber-400/20 mb-12 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
              <span className="text-sm font-medium">{t('hero.subtitle')}</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-light mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-extralight">
                {t('hero.title1')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent font-bold">
                {t('hero.title2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-12 py-4 text-lg group cursor-pointer font-medium">
                    {t('hero.btn_start')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {t('contact.schedule_consultation')}
                    </DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-12 py-4 text-lg group cursor-pointer font-medium">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {t('hero.btn_explore')}
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="flex items-center justify-center mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-light bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-amber-400/60" />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('social_proof.heading')}</h2>
            <p className="text-slate-400 text-lg">{t('social_proof.description')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {['EnergoSun', 'PhotographySF', 'Tergi', 'Coolstack', 'PrimeDrive'].map((brand, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-white/40 hover:text-white/60 transition-colors cursor-pointer">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection/>
      <PortfolioSection/>
      <AboutSection/>
      <PricingSection/>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('testimonials.heading')}</h2>
            <p className="text-slate-400 text-lg">{t('testimonials.description')}</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl rounded-2xl p-1">
                      <CardContent className="p-10 flex flex-col items-center text-center">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Quote className="w-10 h-10 text-blue-400 mb-4" />
                        <p className="text-slate-200 mb-6 text-xl italic font-light">{testimonial.quote}</p>
                        <div>
                          <div className="font-bold text-white text-lg">{testimonial.author}</div>
                          <div className="text-slate-400">{testimonial.role}</div>
                          <div className="text-blue-400 text-sm mt-1">{testimonial.website}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 top-1/2 -translate-y-1/2" />
              <CarouselNext className="-right-6 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            {t('cta.heading')}
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg cursor-pointer">
                  {t('cta.btn_strategy')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {t('contact.schedule_consultation')}
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg cursor-pointer" onClick={() => scrollToSection('portfolio')}>
              {t('cta.btn_portfolio')}
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              {t('cta.benefits.presence')}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              {t('cta.benefits.contracts')}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              {t('cta.benefits.guarantee')}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  {t('brand')}
                </div>
                <div className="ml-4 w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-600"></div>
              </div>
              <p className="text-slate-400 mb-6 max-w-md text-lg">
                {t('footer.description')}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-5">
                {['twitter', 'linkedin', 'dribbble', 'github'].map((platform) => (
                  <a 
                    key={platform}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
                  >
                    <div className="bg-gray-300 border-2 border-dashed rounded-xl w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 pb-2 border-b border-slate-800/50 text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-amber-400" />
                {t('contactfoot.schedule_consultation')}
              </h4>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{t('contactfoot.email_label')}</p>
                    <a href="mailto:contact@folada.com" className="text-white hover:text-amber-400 transition-colors">
                      {t('contactfoot.email')}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{t('contactfoot.location_label')}</p>
                    <p className="text-white">{t('contactfoot.location')}</p>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:text-white transition-all">
                      {t('contactfoot.schedule_call')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        {t('contact.schedule_consultation')}
                      </DialogTitle>
                    </DialogHeader>
                    <ContactForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-slate-800/50 my-10"></div>
          
          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                {t('policy.privacy')}
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                {t('policy.terms')}
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                {t('policy.cookies')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;