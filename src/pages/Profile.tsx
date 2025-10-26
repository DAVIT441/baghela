import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Trophy, Calendar, ShoppingBag, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile } from '@/types';
import { getUser, saveUser } from '@/lib/storage';
import { mockUser } from '@/lib/mockData';

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    let userData = getUser();
    if (!userData) {
      userData = mockUser;
      saveUser(userData);
    }
    setUser(userData);
  }, []);

  if (!user) return null;

  const stats = [
    { icon: Trophy, label: 'ქულები', value: user.points },
    { icon: Award, label: 'დონე', value: user.level },
    { icon: ShoppingBag, label: 'შეძენები', value: user.purchases.length },
    { icon: Heart, label: 'აქტივობები', value: user.activities.length },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {user.badges.map((badge, i) => (
                    <Badge key={i} className="bg-secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                  <Calendar className="h-4 w-4" />
                  რეგისტრაცია: {new Date(user.joinedDate).toLocaleDateString('ka-GE')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <stat.icon className="h-8 w-8 text-primary mx-auto" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>ჩემი აქტივობა</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="purchases">
              <TabsList className="w-full">
                <TabsTrigger value="purchases" className="flex-1">
                  შეძენები
                </TabsTrigger>
                <TabsTrigger value="activities" className="flex-1">
                  აქტივობები
                </TabsTrigger>
              </TabsList>

              <TabsContent value="purchases" className="space-y-4">
                {user.purchases.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>ჯერ არ გაქვთ შეძენები</p>
                  </div>
                ) : (
                  user.purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{purchase.itemName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(purchase.date).toLocaleDateString('ka-GE')}
                        </p>
                      </div>
                      <Badge variant="outline">-{purchase.points} ქულა</Badge>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                {user.activities.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>ჯერ არ გაქვთ აქტივობები</p>
                    <p className="text-sm mt-2">
                      შეუერთდით მოხალისეობრივ პროექტებს დაქულების დასაგროვებლად
                    </p>
                  </div>
                ) : (
                  user.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString('ka-GE')}
                        </p>
                      </div>
                      <Badge className="bg-secondary">+{activity.points} ქულა</Badge>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>შენი პროგრესი</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">დონე {user.level}</span>
                <span className="text-sm text-muted-foreground">
                  {user.points} / {(user.level + 1) * 100} ქულა
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{
                    width: `${(user.points / ((user.level + 1) * 100)) * 100}%`,
                  }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              შემდეგ დონემდე დაგრჩა {(user.level + 1) * 100 - user.points} ქულა
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
