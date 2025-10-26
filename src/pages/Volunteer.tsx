import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VolunteerProject } from '@/types';
import { getProjects, updateUserPoints } from '@/lib/storage';
import { mockProjects } from '@/lib/mockData';
import { toast } from 'sonner';
import volunteersImage from '@/assets/volunteers.jpg';

const Volunteer = () => {
  const [projects, setProjects] = useState<VolunteerProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<VolunteerProject | null>(null);

  useEffect(() => {
    const stored = getProjects();
    setProjects(stored.length === 0 ? mockProjects : stored);
  }, []);

  const handleJoinProject = (project: VolunteerProject) => {
    updateUserPoints(project.points);
    toast.success(`მადლობა მონაწილეობისთვის! თქვენ მიიღეთ +${project.points} ქულა 🎉`);
    setSelectedProject(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'მოსავალი':
        return 'bg-primary';
      case 'გამწვანება':
        return 'bg-secondary';
      case 'დასუფთავება':
        return 'bg-accent';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <img
          src={volunteersImage}
          alt="მოხალისეები"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-4xl md:text-5xl font-bold">მოხალისეობრივი პროექტები</h1>
            <p className="text-lg md:text-xl">
              გახდი ნაწილი ბუნების დაცვის საქმეში 🌿
            </p>
          </div>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Trophy, title: 'დააგროვე ქულები', desc: 'მონაწილეობისთვის' },
          { icon: Users, title: 'ახალი ადამიანები', desc: 'გაიცნო თანამოაზრეები' },
          { icon: Calendar, title: 'მოქნილი გრაფიკი', desc: 'შეარჩიე შენთვის სასურველი' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <item.icon className="h-12 w-12 text-primary mx-auto" />
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">აქტიური პროექტები</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const progress = (project.participants / project.maxParticipants) * 100;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg leading-tight">
                        {project.title}
                      </CardTitle>
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{project.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(project.date).toLocaleDateString('ka-GE')}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="font-medium text-foreground">
                          {project.organizer}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">მონაწილეები</span>
                        <span className="font-medium">
                          {project.participants}/{project.maxParticipants}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-secondary" />
                        <span className="font-bold text-lg">+{project.points} ქულა</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => setSelectedProject(project)}
                      disabled={progress >= 100}
                    >
                      {progress >= 100 ? 'სავსეა' : 'მონაწილეობა'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Join Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>პროექტში მონაწილეობა</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-bold mb-2">{selectedProject?.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedProject?.description}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>თარიღი:</strong>{' '}
                {selectedProject && new Date(selectedProject.date).toLocaleDateString('ka-GE')}
              </p>
              <p>
                <strong>ლოკაცია:</strong> {selectedProject?.location}
              </p>
              <p>
                <strong>ორგანიზატორი:</strong> {selectedProject?.organizer}
              </p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg flex items-center gap-3">
              <Trophy className="h-8 w-8 text-secondary" />
              <div>
                <p className="font-semibold">ანაზღაურება</p>
                <p className="text-2xl font-bold text-secondary">
                  +{selectedProject?.points} ქულა
                </p>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={() => selectedProject && handleJoinProject(selectedProject)}
            >
              დადასტურება
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Volunteer;
