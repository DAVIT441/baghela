import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, Calendar, TrendingUp, Plus, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Garden } from '@/types';
import { getGardens, addGarden } from '@/lib/storage';
import { mockGardens } from '@/lib/mockData';
import { toast } from 'sonner';

const Rental = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rentDialogGarden, setRentDialogGarden] = useState<Garden | null>(null);

  useEffect(() => {
    const stored = getGardens();
    if (stored.length === 0) {
      setGardens(mockGardens.filter(g => g.forRent));
    } else {
      setGardens(stored.filter(g => g.forRent));
    }
  }, []);

  const handleAddGarden = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newGarden: Garden = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      area: Number(formData.get('area')),
      type: formData.get('type') as string,
      owner: formData.get('owner') as string,
      description: formData.get('description') as string,
      forRent: true,
      rentalTerms: {
        duration: formData.get('duration') as string,
        harvestType: formData.get('harvestType') as string,
        harvestShare: Number(formData.get('harvestShare')),
        conditions: formData.get('conditions') as string,
      },
    };

    addGarden(newGarden);
    setGardens([...gardens, newGarden]);
    setIsDialogOpen(false);
    toast.success('მიწა წარმატებით დაემატა!');
  };

  const handleRentRequest = () => {
    toast.success('თქვენი განაცხადი წარმატებით გაიგზავნა!');
    setRentDialogGarden(null);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute inset-0 gradient-hero opacity-10 rounded-3xl blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4">
            <Badge className="shadow-eco-sm">
              <MapPin className="h-3 w-3 mr-1" />
              მიწის გაქირავება
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              მიწის ბაზარი
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              იპოვე სასურველი მიწა ორგანული მებაღეობისთვის ან გააქირავე შენი
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 gradient-green shadow-eco-lg hover:shadow-eco-xl hover:scale-105 transition-smooth">
                <Plus className="h-5 w-5" />
                დაამატე მიწა
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>მიწის გაქირავება</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddGarden} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ბაღის სახელი*</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">მდებარეობა*</Label>
                  <Input id="location" name="location" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">ფართობი (მ²)*</Label>
                  <Input id="area" name="area" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">მიწის ტიპი*</Label>
                  <Input id="type" name="type" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">მფლობელი*</Label>
                <Input id="owner" name="owner" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">აღწერა*</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold">ქირავნობის პირობები</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">ვადის პერიოდი*</Label>
                    <Input id="duration" name="duration" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestType">მოსავლის ტიპი*</Label>
                    <Input id="harvestType" name="harvestType" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestShare">მოსავლის განაწილება (%)*</Label>
                  <Input id="harvestShare" name="harvestShare" type="number" min="0" max="100" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conditions">დამატებითი პირობები*</Label>
                  <Textarea id="conditions" name="conditions" required />
                </div>
              </div>
              <Button type="submit" className="w-full">დაამატე გაქირავება</Button>
            </form>
          </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardens.map((garden, index) => (
          <motion.div
            key={garden.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-eco-xl transition-all duration-500 group border-2 hover:border-primary/50 hover:-translate-y-2 relative overflow-hidden cursor-pointer">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Sparkle animation */}
              <motion.div
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-6 right-6 text-primary z-10"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {garden.name}
                  </CardTitle>
                  <Badge className="gradient-green shadow-eco-sm animate-pulse border-0">
                    🟢 ხელმისაწვდომია
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{garden.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Maximize2 className="h-5 w-5 text-secondary" />
                    </div>
                    <span className="font-medium text-foreground">{garden.area} მ²</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10">
                <div>
                  <Badge variant="outline" className="border-primary/30">
                    {garden.type}
                  </Badge>
                </div>
                
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {garden.description}
                </p>
                
                {garden.rentalTerms && (
                  <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/50">
                    <h4 className="font-semibold text-sm text-foreground">ქირავნობის პირობები</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>ვადა: <strong className="text-foreground">{garden.rentalTerms.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4 text-secondary" />
                        <span>მოსავლის განაწილება: <strong className="text-foreground">{garden.rentalTerms.harvestShare}%</strong></span>
                      </div>
                      <p className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                        {garden.rentalTerms.conditions}
                      </p>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full gradient-green shadow-eco-md hover:shadow-eco-lg hover:scale-105 transition-smooth"
                  onClick={() => setRentDialogGarden(garden)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  დაიქირავე ახლავე
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Rent Request Dialog */}
      <Dialog open={!!rentDialogGarden} onOpenChange={() => setRentDialogGarden(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>მიწის დაქირავება</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>გსურთ მიწის დაქირავება: <strong>{rentDialogGarden?.name}</strong>?</p>
            <div className="space-y-2">
              <Label htmlFor="renterName">თქვენი სახელი</Label>
              <Input id="renterName" placeholder="შეიყვანეთ სახელი" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="renterPhone">ტელეფონი</Label>
              <Input id="renterPhone" placeholder="+995 5XX XX XX XX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">შეტყობინება მფლობელს</Label>
              <Textarea id="message" placeholder="მოკლე შეტყობინება..." />
            </div>
            <Button className="w-full" onClick={handleRentRequest}>
              გაგზავნა
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rental;
