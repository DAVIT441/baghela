import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coins, Package, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MarketplaceItem } from '@/types';
import { getMarketplaceItems, getUser, saveUser } from '@/lib/storage';
import { mockMarketplaceItems, mockUser } from '@/lib/mockData';
import { toast } from 'sonner';

const Shop = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const stored = getMarketplaceItems();
    setItems(stored.length === 0 ? mockMarketplaceItems : stored);
    
    let user = getUser();
    if (!user) {
      user = mockUser;
      saveUser(user);
    }
    setUserPoints(user.points);
  }, []);

  const handlePurchase = (item: MarketplaceItem) => {
    const user = getUser();
    if (!user) {
      toast.error('გთხოვთ შეხვიდეთ სისტემაში');
      return;
    }

    if (user.points < item.points) {
      toast.error('არასაკმარისი ქულები! 😔');
      setSelectedItem(null);
      return;
    }

    user.points -= item.points;
    user.purchases.push({
      id: Date.now().toString(),
      itemName: item.name,
      points: item.points,
      date: new Date().toISOString(),
    });
    saveUser(user);
    setUserPoints(user.points);
    
    toast.success(`🎉 შეძენა წარმატებით დასრულდა! დარჩენილი ქულები: ${user.points}`);
    setSelectedItem(null);
  };

  const getCategoryData = (category: string) => {
    const data = {
      seedling: { label: 'ნერგი', gradient: 'from-primary to-primary-dark', icon: '🌱' },
      seed: { label: 'თესლი', gradient: 'from-secondary to-secondary-light', icon: '🌾' },
      fertilizer: { label: 'სასუქი', gradient: 'from-accent to-primary', icon: '🧪' },
      prize: { label: 'პრიზი', gradient: 'from-primary-light to-secondary', icon: '🎁' },
    };
    return data[category as keyof typeof data] || { label: category, gradient: 'from-muted to-muted', icon: '📦' };
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute inset-0 gradient-hero opacity-10 rounded-3xl blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-4 flex-1">
            <Badge className="shadow-eco-sm text-xs sm:text-sm">
              <ShoppingBag className="h-3 w-3 mr-1" />
              ეკო-მაღაზია
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-700">
              მაღაზია
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl">
              შეიძინე ნერგები, თესლი და სასუქი დაგროვებული ქულებით
            </p>
          </div>

          {/* Points Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-full md:w-auto"
          >
            <Card className="relative overflow-hidden shadow-eco-xl border-2 border-primary/20 w-full md:min-w-[200px]">
              <div className="absolute inset-0 gradient-green opacity-10" />
              <CardContent className="p-4 sm:p-6 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-2xl bg-primary/20 animate-float flex-shrink-0">
                    <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">შენი ქულები</p>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {userPoints}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3 flex items-center gap-2 text-[10px] sm:text-xs text-primary">
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="hidden sm:inline">დააგროვე მეტი მოხალისეობით</span>
                  <span className="sm:hidden">დააგროვე ქულები</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, index) => {
          const categoryData = getCategoryData(item.category);
          const canAfford = userPoints >= item.points;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full transition-all duration-500 group relative overflow-hidden border-2 ${
                canAfford 
                  ? 'hover:shadow-eco-xl hover:border-primary/50 hover:-translate-y-2 cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}>
                {/* Image Section */}
                <CardHeader className="p-0 relative">
                  <div className="relative h-56 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          canAfford ? 'group-hover:scale-110' : ''
                        }`}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${categoryData.gradient} opacity-20 flex items-center justify-center`}>
                        <Package className="h-20 w-20 text-foreground/40" />
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 ${
                      canAfford ? 'group-hover:opacity-100' : ''
                    } transition-opacity duration-500`} />
                    
                    {/* Category Badge */}
                    <Badge 
                      className={`absolute top-3 right-3 bg-gradient-to-r ${categoryData.gradient} border-0 shadow-eco-md`}
                    >
                      {categoryData.icon} {categoryData.label}
                    </Badge>

                    {/* Stock Badge */}
                    {item.stock > 0 && item.stock < 5 && (
                      <Badge 
                        variant="destructive"
                        className="absolute top-3 left-3 shadow-eco-md animate-pulse"
                      >
                        🔥 ბოლო {item.stock}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="p-5 space-y-4 relative z-10">
                  <div className="space-y-2">
                    <CardTitle className={`text-lg leading-tight ${
                      canAfford ? 'group-hover:text-primary' : ''
                    } transition-colors`}>
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price and Stock */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Coins className={`h-5 w-5 ${canAfford ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <span className={`text-2xl font-bold ${
                        canAfford ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent' : 'text-muted-foreground'
                      }`}>
                        {item.points}
                      </span>
                    </div>
                    <Badge variant={item.stock > 0 ? 'outline' : 'destructive'} className="text-xs">
                      {item.stock > 0 ? `მარაგი: ${item.stock}` : 'გაყიდულია'}
                    </Badge>
                  </div>

                  {/* Purchase Button */}
                  <Button 
                    className={`w-full transition-smooth ${
                      canAfford && item.stock > 0
                        ? 'gradient-green shadow-eco-md hover:shadow-eco-lg hover:scale-105' 
                        : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                    disabled={item.stock === 0 || !canAfford}
                  >
                    {item.stock === 0 
                      ? '❌ არ არის მარაგში' 
                      : !canAfford 
                      ? '🔒 არასაკმარისი ქულები'
                      : '🛒 შეძენა'}
                  </Button>
                </CardContent>

                {/* Sparkle effect for affordable items */}
                {canAfford && item.stock > 0 && (
                  <motion.div
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 left-4 text-primary"
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">შეძენის დადასტურება</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedItem?.image && (
              <div className="relative h-48 rounded-xl overflow-hidden shadow-eco-lg">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-3">
              <h3 className="font-bold text-2xl text-foreground">{selectedItem?.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedItem?.description}</p>
            </div>
            
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-eco-sm">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ფასი:</span>
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="font-bold text-xl">{selectedItem?.points} ქულა</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">შენი ქულები:</span>
                  <span className="font-bold text-xl text-primary">{userPoints} ქულა</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border/30">
                  <span className="font-medium">დარჩება:</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {selectedItem && userPoints - selectedItem.points} ქულა
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12"
                onClick={() => setSelectedItem(null)}
              >
                გაუქმება
              </Button>
              <Button 
                className="flex-1 h-12 gradient-green shadow-eco-md hover:shadow-eco-lg"
                onClick={() => selectedItem && handlePurchase(selectedItem)}
              >
                ✓ დადასტურება
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;
