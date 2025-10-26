import { Garden, Helper, VolunteerProject, MarketplaceItem, UserProfile } from '@/types';
import seedlingImg from '@/assets/seedling.jpg';
import seedsImg from '@/assets/seeds.jpg';
import fertilizerImg from '@/assets/fertilizer.jpg';
import honeyImg from '@/assets/honey.jpg';

export const mockGardens: Garden[] = [
  {
    id: '1',
    name: 'სოფელ ყვარლის ბაღი',
    location: 'ყვარელი, კახეთი',
    area: 500,
    type: 'ვაზის ბაღი',
    owner: 'გიორგი მამუკაშვილი',
    description: 'ლამაზი ვაზის ბაღი კახეთში, შესანიშნავი პირობებით',
    forRent: true,
    rentalTerms: {
      duration: '1 სეზონი (6 თვე)',
      harvestType: 'ყურძენი',
      harvestShare: 40,
      conditions: 'ბაღის მოვლა და მორწყვა გაქირავებულის პასუხისმგებლობაა',
    },
  },
  {
    id: '2',
    name: 'თბილისის ეკო-ბაღი',
    location: 'დიღომი, თბილისი',
    area: 200,
    type: 'ბოსტნეულის ბაღი',
    owner: 'ნინო ჩხაიძე',
    description: 'ორგანული ბოსტნეულის მოყვანა თბილისში',
    forRent: false,
  },
  {
    id: '3',
    name: 'ფორთოხლის ბაღი',
    location: 'ოზურგეთი, გურია',
    area: 800,
    type: 'ციტრუსის ბაღი',
    owner: 'დავით ბერიძე',
    description: 'დიდი ფორთოხლის პლანტაცია გურიაში',
    forRent: true,
    rentalTerms: {
      duration: '1 წელი',
      harvestType: 'ფორთოხალი',
      harvestShare: 35,
      conditions: 'გამოცდილება საჭიროა ციტრუსების მოვლაში',
    },
  },
];

export const mockHelpers: Helper[] = [
  {
    id: '1',
    name: 'ლევან კობახიძე',
    skills: ['ბაღის გაწმენდა', 'ხეების გასხვლა', 'მორწყვა'],
    experience: '5 წელი',
    rating: 4.8,
    completedJobs: 45,
    badges: ['მოსავლის გმირი', 'პროფესიონალი'],
    phone: '+995 555 12 34 56',
  },
  {
    id: '2',
    name: 'თამარ გელაშვილი',
    skills: ['ყურძნის კრეფა', 'ბოსტნეულის დარგვა', 'სარწყავი სისტემები'],
    experience: '3 წელი',
    rating: 4.9,
    completedJobs: 32,
    badges: ['განსაკუთრებით აქტიური'],
    phone: '+995 555 98 76 54',
  },
  {
    id: '3',
    name: 'გიორგი მამულაშვილი',
    skills: ['ფორთოხლის კრეფა', 'თხილის კრეფა', 'ბაღის გაწმენდა'],
    experience: '7 წელი',
    rating: 5.0,
    completedJobs: 67,
    badges: ['მოსავლის გმირი', 'პროფესიონალი', 'ოქროს ბეჯი'],
    phone: '+995 555 11 22 33',
  },
];

export const mockProjects: VolunteerProject[] = [
  {
    id: '1',
    title: '🍇 რთველი 2025 – მოსავლის კრეფა კახეთში',
    description: 'შემოგვიერთდით ტრადიციულ ქართულ რთველში! გაიხარე, ისწავლე და დაიმონტაჟე ქულები.',
    organizer: 'კახეთის მუნიციპალიტეტი',
    date: '2025-09-15',
    location: 'ყვარელი, კახეთი',
    points: 100,
    participants: 12,
    maxParticipants: 30,
    category: 'მოსავალი',
  },
  {
    id: '2',
    title: '🌱 სკოლის ეზოს გამწვანება',
    description: 'დავხმაროთ სკოლას მწვანე ეზოს შექმნაში. ერთად დავრგავთ ხეებს და ყვავილებს.',
    organizer: '№42 საჯარო სკოლა',
    date: '2025-04-20',
    location: 'ვაკე, თბილისი',
    points: 50,
    participants: 8,
    maxParticipants: 20,
    category: 'გამწვანება',
  },
  {
    id: '3',
    title: '🧹 პარკის დასუფთავება',
    description: 'გაათავისუფლოთ ბუნება ნაგავისგან! დასუფთავების აქცია მუნიციპალურ პარკში.',
    organizer: 'ეკო კლუბი "მწვანე მომავალი"',
    date: '2025-05-10',
    location: 'ვაკე პარკი, თბილისი',
    points: 40,
    participants: 25,
    maxParticipants: 50,
    category: 'დასუფთავება',
  },
];

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'ვაშლის ნერგი',
    description: 'ორგანული ვაშლის ნერგი, მზადაა დასარგავად',
    points: 120,
    category: 'seedling',
    stock: 25,
    image: seedlingImg,
  },
  {
    id: '2',
    name: 'პომიდვრის თესლი',
    description: 'ადგილობრივი ჯიშის პომიდვრის თესლი',
    points: 30,
    category: 'seed',
    stock: 100,
    image: seedsImg,
  },
  {
    id: '3',
    name: 'ორგანული სასუქი',
    description: 'ბუნებრივი სასუქი ყველა ტიპის მცენარისთვის',
    points: 80,
    category: 'fertilizer',
    stock: 50,
    image: fertilizerImg,
  },
  {
    id: '4',
    name: 'ადგილობრივი თაფლი',
    description: 'ნატურალური თაფლი ქართული მეფუტკრეებისგან',
    points: 100,
    category: 'prize',
    stock: 15,
    image: honeyImg,
  },
];

export const mockUser: UserProfile = {
  id: '1',
  name: 'მარიამ გელაშვილი',
  email: 'mariam@example.com',
  points: 350,
  level: 3,
  badges: ['მოხალისე', 'ბუნების მეგობარი'],
  joinedDate: '2024-01-15',
  activities: [],
  purchases: [],
};
