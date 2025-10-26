import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout, MapPin, Users, Heart, ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-garden.jpg';
import volunteersImage from '@/assets/volunteers.jpg';

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'მიწის გაქირავება',
      description: 'იპოვე ან გააქირავე მიწა ორგანული მოსავლისთვის',
      link: '/rental',
      gradient: 'from-primary to-primary-dark',
      badge: 'ახალი'
    },
    {
      icon: Users,
      title: 'დამხმარეები',
      description: 'დაუკავშირდი გამოცდილ აგრო-სპეციალისტებს',
      link: '/helpers',
      gradient: 'from-secondary to-secondary-light',
      badge: 'პოპულარული'
    },
    {
      icon: Heart,
      title: 'მოხალისეობა',
      description: 'გახდი მოხალისე და დააგროვე ქულები',
      link: '/volunteer',
      gradient: 'from-accent to-primary',
      badge: 'აქტიური'
    },
    {
      icon: Sprout,
      title: 'მაღაზია',
      description: 'შეიძინე ნერგები, თესლი და სასუქი ქულებით',
      link: '/shop',
      gradient: 'from-primary-light to-secondary',
      badge: 'ტოპ'
    },
  ];

  const stats = [
    { label: 'აქტიური ბაღი', value: '150+', icon: Sprout, color: 'text-primary' },
    { label: 'მოხალისე', value: '500+', icon: Users, color: 'text-secondary' },
    { label: 'დამთავრებული პროექტი', value: '80+', icon: Award, color: 'text-accent' },
    { label: 'გაქირავებული მიწა', value: '30+', icon: TrendingUp, color: 'text-primary-dark' },
  ];

  return (
    <div className="space-y-24">
      {/* Enhanced Hero Section with particles effect */}
      <section className="relative -mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden h-[500px] md:h-[650px] shadow-eco-xl"
        >
          <img
            src={heroImage}
            alt="ქართული ბაღი - ორგანული მოსავალი"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent" />
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 text-primary/30"
          >
            <Sparkles className="h-16 w-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-16 text-secondary/30"
          >
            <Sprout className="h-20 w-20" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Badge className="shadow-glow animate-pulse bg-gradient-to-r from-primary to-secondary border-0 text-xs sm:text-sm">
                  🌱 ახალი პლატფორმა საქართველოში
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl leading-tight px-2"
              >
                მოგესალმებით ბაღელაში
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-lg max-w-3xl mx-auto font-medium px-4"
              >
                შენი წვლილი მწვანე მომავალში 🌿
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto px-4"
              >
                დაუკავშირდი ადგილობრივ მებაღეებს, იპოვე მიწა გასაქირავებლად და გახდი 
                ეკოლოგიური მოძრაობის ნაწილი
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              >
                <Link to="/rental" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto gap-2 shadow-eco-lg hover:shadow-eco-xl transition-smooth group text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 gradient-green hover:scale-105"
                  >
                    დაიწყე ახლა
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/volunteer" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-white/95 hover:bg-white border-2 border-white/50 backdrop-blur-sm shadow-eco-lg hover:shadow-eco-xl transition-smooth hover:scale-105 text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6"
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    გაერთე ბუნებასთან
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Features Grid with hover effects */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="secondary" className="shadow-eco-sm">
            ✨ ფუნქციები
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            რას გთავაზობთ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ყველაფერი რაც გჭირდება მდგრადი მებაღეობისთვის
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={feature.link}>
                <Card className="h-full hover:shadow-eco-xl transition-all duration-500 cursor-pointer group relative overflow-hidden border-2 hover:border-primary/50 hover:-translate-y-2">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <CardContent className="p-8 space-y-5 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-eco-md group-hover:shadow-eco-lg group-hover:scale-110 transition-all duration-500`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs shadow-eco-sm">
                        {feature.badge}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all pt-2">
                      <span>გაიგე მეტი</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Volunteer CTA */}
      <section className="relative rounded-3xl overflow-hidden shadow-eco-xl">
        <img
          src={volunteersImage}
          alt="მოხალისეები ბაღში"
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-secondary/90 to-primary/95" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 px-4 max-w-3xl"
          >
            <Badge className="bg-white/20 text-white border-white/30 shadow-eco-lg">
              🌿 შემოგვიერთდი
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              გაერთე ბუნებასთან —<br/>
              გახდი მოხალისე
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              მონაწილეობა მიიღე საზოგადოებრივ პროექტებში, დააგროვე ქულები 
              და მიიღე საჩუქრები ადგილობრივი მწარმოებლებისგან
            </p>
            
            <Link to="/volunteer">
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2 shadow-eco-xl hover:shadow-glow transition-smooth hover:scale-110 text-lg px-8 py-6 group"
              >
                ნახე პროექტები
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <Card className="relative overflow-hidden group hover:shadow-eco-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30">
                  <div className="absolute inset-0 gradient-warm opacity-50" />
                  <CardContent className="p-8 text-center relative z-10 space-y-4">
                    <Icon className={`h-10 w-10 ${stat.color} mx-auto group-hover:scale-125 transition-transform duration-500`} />
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
