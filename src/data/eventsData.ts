import techImg from "../assets/tech.jpg";
import musicImg from "../assets/music.jpg";
import businessImg from "../assets/business.jpg";

export interface EventType {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  description: string;
  organizer: string;
}

export const eventsData: EventType[] = [
  {
    id: 1,
    title: "Tech Innovators Summit 2026",
    category: "Technology",
    date: "2026-11-15",
    time: "09:00 AM - 05:00 PM",
    location: "BMICH, Colombo",
    price: 2500,
    image: techImg,
    description:
      "Join industry leaders for the biggest technology and innovation summit of the year.",
    organizer: "TechLabs Sri Lanka",
  },
  {
    id: 2,
    title: "Colombo Music Festival",
    category: "Music",
    date: "2026-12-20",
    time: "06:00 PM - 11:30 PM",
    location: "Viharamahadevi Open Air Theatre",
    price: 3500,
    image: musicImg,
    description:
      "An unforgettable night filled with live performances by top local and international artists.",
    organizer: "Chords Entertainment",
  },
  {
    id: 3,
    title: "National Startup Exhibition",
    category: "Business",
    date: "2026-11-28",
    time: "10:00 AM - 06:00 PM",
    location: "SLECC, Colombo",
    price: 1000,
    image: businessImg,
    description:
      "Discover next-generation startups and network with potential investors.",
    organizer: "Lanka Venture Club",
  },
];
