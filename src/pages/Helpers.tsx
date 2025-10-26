import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Phone, Briefcase, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Helper } from '@/types';
import { getHelpers } from '@/lib/storage';
import { mockHelpers } from '@/lib/mockData';
import { toast } from 'sonner';

const Helpers = () => {
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [filteredHelpers, setFilteredHelpers] = useState<Helper[]>([]);
  const [skillFilter, setSkillFilter] = useState<string>('ყველა');
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null);

  const allSkills = [
    'ყველა',
    'ბაღის გაწმენდა',
    'ხეების გასხვლა',
    'ყურძნის კრეფა',
    'ფორთოხლის კრეფა',
    'თხილის კრეფა',
    'მორწყვა',
    'ბოსტნეულის დარგვა',
  ];

  useEffect(() => {
    const stored = getHelpers();
    const data = stored.length === 0 ? mockHelpers : stored;
    setHelpers(data);
    setFilteredHelpers(data);
  }, []);

  useEffect(() => {
    if (skillFilter === 'ყველა') {
      setFilteredHelpers(helpers);
    } else {
      setFilteredHelpers(
        helpers.filter(helper => helper.skills.includes(skillFilter))
      );
    }
  }, [skillFilter, helpers]);

  const handleContact = () => {
    toast.success('დამხმარეს გაეგზავნა შეტყობინება!');
    setSelectedHelper(null);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">დამხმარეები</h1>
        <p className="text-muted-foreground">
          დაუკავშირდი გამოცდილ აგრო-სპეციალისტებს
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">სამუშაო ტიპი:</span>
        <Select value={skillFilter} onValueChange={setSkillFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allSkills.map(skill => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Helpers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHelpers.map((helper, index) => (
          <motion.div
            key={helper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{helper.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold">{helper.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({helper.completedJobs} სამუშაო)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Briefcase className="h-4 w-4" />
                    გამოცდილება: {helper.experience}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">უნარები:</p>
                  <div className="flex flex-wrap gap-2">
                    {helper.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {helper.badges.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Award className="h-4 w-4 text-secondary" />
                      ბეჯები:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {helper.badges.map((badge, i) => (
                        <Badge key={i} className="bg-secondary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full gap-2" 
                  onClick={() => setSelectedHelper(helper)}
                >
                  <Phone className="h-4 w-4" />
                  დაუკავშირდი
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contact Dialog */}
      <Dialog open={!!selectedHelper} onOpenChange={() => setSelectedHelper(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>დაკავშირება - {selectedHelper?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedHelper?.phone && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">ტელეფონი:</p>
                <p className="font-semibold text-lg">{selectedHelper.phone}</p>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm">
                <strong>გამოცდილება:</strong> {selectedHelper?.experience}
              </p>
              <p className="text-sm">
                <strong>შეფასება:</strong> ⭐ {selectedHelper?.rating}/5.0
              </p>
              <p className="text-sm">
                <strong>დასრულებული სამუშაოები:</strong> {selectedHelper?.completedJobs}
              </p>
            </div>
            <Button className="w-full" onClick={handleContact}>
              დაუკავშირდი ახლა
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Helpers;
