import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Scissors, Sprout, Droplets, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Calendar = () => {
  const seasonalTasks = [
    {
      months: 'იანვარი-თებერვალი',
      season: 'ზამთარი',
      icon: Scissors,
      color: 'bg-primary',
      tasks: [
        'თოვლის მოცილება',
        'ხეების გასხვლა',
        'იარაღების მომზადება'
      ]
    },
    {
      months: 'მარტი-აპრილი',
      season: 'გაზაფხული',
      icon: Sprout,
      color: 'bg-secondary',
      tasks: [
        'თესვის დაწყება',
        'ნიადაგის მოსამზადებელი',
        'ნერგების დარგვა'
      ]
    },
    {
      months: 'მაისი-ივნისი',
      season: 'გაზაფხული-ზაფხული',
      icon: Sprout,
      color: 'bg-primary',
      tasks: [
        'სარწყავი სისტემის დამონტაჟება',
        'მცენარეების მოვლა'
      ]
    },
    {
      months: 'ივლისი-აგვისტო',
      season: 'ზაფხული',
      icon: Droplets,
      color: 'bg-secondary',
      tasks: [
        'მორწყვა',
        'მოსავლის დაწყება'
      ]
    },
    {
      months: 'სექტემბერი-ოქტომბერი',
      season: 'შემოდგომა',
      icon: Package,
      color: 'bg-primary',
      tasks: [
        'მთავარი მოსავლის აღება',
        'კონსერვაციის დაწყება',
        'შემოდგომის თესვა'
      ]
    },
    {
      months: 'ნოემბერი-დეკემბერი',
      season: 'შემოდგომა-ზამთარი',
      icon: Scissors,
      color: 'bg-secondary',
      tasks: [
        'ბაღის მომზადება ზამთრისთვის',
        'ხეების მოვლა',
        'კომპოსტის შექმნა'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
          სეზონური კალენდარი
          <CalendarIcon className="h-10 w-10 text-primary" />
        </h1>
        <p className="text-lg text-muted-foreground">
          წლის განმავლობაში ბაღში სამუშაოების დაგეგმვა
        </p>
      </motion.div>

      {/* Seasonal Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seasonalTasks.map((task, index) => {
          const Icon = task.icon;
          return (
            <motion.div
              key={task.months}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`${task.color} rounded-2xl p-3 flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {task.months}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {task.season}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {task.tasks.map((taskItem) => (
                          <li key={taskItem} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{taskItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
