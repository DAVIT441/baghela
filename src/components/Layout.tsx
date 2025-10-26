import { Link, useLocation } from 'react-router-dom';
import { Sprout, Home, MapPin, Users, Heart, ShoppingBag, User, Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getUser } from '@/lib/storage';
import { useState } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const user = getUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'მთავარი', icon: Home },
    { path: '/gardens', label: 'ბაღები', icon: Sprout },
    { path: '/rental', label: 'გაქირავება', icon: MapPin },
    { path: '/helpers', label: 'დამხმარეები', icon: Users },
    { path: '/volunteer', label: 'მოხალისეობა', icon: Heart },
    { path: '/shop', label: 'მაღაზია', icon: ShoppingBag },
    { path: '/calendar', label: 'კალენდარი', icon: Calendar },
    { path: '/profile', label: 'პროფილი', icon: User },
  ];

  return (
    <div className="min-h-screen gradient-warm">
      {/* Enhanced Header with gradient and glow */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-eco-md">
        <nav className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all" />
                <Sprout className="h-8 w-8 sm:h-10 sm:w-10 text-primary relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent whitespace-nowrap">
                  ბაღელა
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">მწვანე მომავალი</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={`gap-2 transition-smooth relative overflow-hidden group ${
                        isActive 
                          ? 'shadow-eco-sm' 
                          : 'hover:shadow-eco-sm hover:scale-105'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 gradient-green"
                          initial={false}
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <Icon className={`h-4 w-4 relative z-10 ${isActive ? 'animate-bounce-gentle' : ''}`} />
                      <span className="relative z-10">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 border-t border-border"
              >
                <div className="grid grid-cols-2 gap-2 pt-4 pb-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant={isActive ? 'default' : 'outline'}
                          size="sm"
                          className={`w-full gap-2 justify-start h-auto py-3 ${
                            isActive 
                              ? 'shadow-eco-md gradient-green' 
                              : ''
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main content with page transitions */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Footer with gradient */}
      <footer className="relative mt-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="relative bg-card/50 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center space-y-6">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-glow" />
                  <Sprout className="h-12 w-12 text-primary relative z-10 animate-float" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  ბაღელა
                </span>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-foreground font-medium"
              >
                შენი წვლილი მწვანე მომავალში 🌿
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground max-w-md mx-auto"
              >
                ეკო-სოციალური პლატფორმა, რომელიც აკავშირებს მიწის მფლობელებს, 
                მოხალისეებს და ბუნების მოყვარულებს საქართველოში
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-2 pt-4"
              >
                {['ორგანული', 'ეკოლოგიური', 'ლოკალური', 'მდგრადი'].map((tag, i) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="shadow-eco-sm hover:shadow-eco-md transition-smooth"
                  >
                    {tag}
                  </Badge>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm text-muted-foreground pt-6 border-t border-border/50"
              >
                © 2025 ბაღელა. ყველა უფლება დაცულია
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
