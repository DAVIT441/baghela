import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, User, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Garden } from '@/types';
import { getGardens } from '@/lib/storage';
import { mockGardens } from '@/lib/mockData';
import heroGardenImage from '@/assets/hero-garden.jpg';

const Gardens = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const stored = getGardens();
    if (stored.length === 0) {
      setGardens(mockGardens);
    } else {
      setGardens(stored);
    }
  }, []);

  const filteredGardens = gardens.filter(garden => {
    const matchesSearch = garden.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          garden.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                          (filterType === 'forRent' && garden.forRent) ||
                          (filterType === 'notRent' && !garden.forRent);
    return matchesSearch && matchesFilter;
  });

  const types = ['all', 'forRent', 'notRent'];
  const typeLabels = { all: 'ყველა', forRent: 'გაქირავებაზე', notRent: 'დაკავებული' };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Background image with low opacity */}
        <div className="absolute inset-0">
          <img
            src={heroGardenImage}
            alt="ბაღი"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        
        <div className="relative text-center space-y-3 sm:space-y-4 py-8 sm:py-12 md:py-16 px-3 sm:px-4">
          <Badge className="shadow-eco-sm text-xs sm:text-sm">
            🌱 რეგისტრირებული ბაღები
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-700">
            ბაღების კატალოგი
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            გაეცანით რეგისტრირებულ ბაღებს და მათ შესაძლებლობებს
          </p>
        </div>
      </motion.div>

      {/* Enhanced Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            placeholder="ძიება..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base shadow-eco-sm focus:shadow-eco-md transition-shadow"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {types.map((type) => (
            <Button
              key={type}
              variant={filterType === type ? 'default' : 'outline'}
              onClick={() => setFilterType(type)}
              size="sm"
              className={`transition-smooth text-xs sm:text-sm whitespace-nowrap ${
                filterType === type 
                  ? 'shadow-eco-md gradient-green' 
                  : 'hover:shadow-eco-sm'
              }`}
            >
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {typeLabels[type as keyof typeof typeLabels]}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-2 sm:gap-4"
      >
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-eco-sm">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{gardens.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">სულ ბაღები</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 shadow-eco-sm">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">{gardens.filter(g => g.forRent).length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">გაქირავებაზე</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 shadow-eco-sm">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{gardens.filter(g => !g.forRent).length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">დაკავებული</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Gardens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredGardens.map((garden, index) => (
          <motion.div
            key={garden.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-eco-xl transition-all duration-500 group border-2 hover:border-primary/50 hover:-translate-y-2 relative overflow-hidden">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {garden.name}
                  </CardTitle>
                  {garden.forRent && (
                    <Badge className="gradient-green shadow-eco-sm animate-pulse">
                      🟢 გაქირავებაზეა
                    </Badge>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{garden.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Maximize2 className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="font-medium">{garden.area} მ²</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10">
                <div>
                  <Badge variant="outline" className="border-primary/30 hover:border-primary transition-colors">
                    {garden.type}
                  </Badge>
                </div>
                
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                  {garden.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm pt-2 border-t border-border/50">
                  <div className="p-1.5 rounded-lg bg-accent/10">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-muted-foreground">მფლობელი:</span>
                  <span className="font-medium text-foreground">{garden.owner}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredGardens.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">ბაღები ვერ მოიძებნა</h3>
          <p className="text-muted-foreground">სცადეთ სხვა საძიებო კრიტერიუმები</p>
        </motion.div>
      )}
    </div>
  );
};

export default Gardens;
