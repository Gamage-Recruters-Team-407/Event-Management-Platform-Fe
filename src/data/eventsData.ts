import techImg from "../assets/tech.jpg";
import musicImg from "../assets/music.jpg";
import businessImg from "../assets/business.jpg";
import colomboJazzNightsImg from "../assets/Colombo Jazz Nights.jpg";
import digitalCreatorsMeetupImg from "../assets/Digital Creators Meetup.jpg";
import foundersInvestorsForumImg from "../assets/Founders & Investors Forum.jpg";
import futureAiConferenceImg from "../assets/Future of AI Conference.jpg";
import smallBusinessGrowthSummitImg from "../assets/Small Business Growth Summit.jpg";
import sunsetSoundsLiveImg from "../assets/Sunset Sounds Live.jpg";

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
  {
    id: 4,
    title: "Future of AI Conference",
    category: "Technology",
    date: "2027-01-18",
    time: "09:30 AM - 04:30 PM",
    location: "Cinnamon Grand, Colombo",
    price: 3000,
    image: futureAiConferenceImg,
    description:
      "Explore practical AI breakthroughs with leading researchers, builders, and product teams.",
    organizer: "TechLabs Sri Lanka",
  },
  {
    id: 5,
    title: "Sunset Sounds Live",
    category: "Music",
    date: "2027-02-06",
    time: "05:00 PM - 10:30 PM",
    location: "Galle Face Green, Colombo",
    price: 2800,
    image: sunsetSoundsLiveImg,
    description:
      "Spend an evening by the ocean with live sets, local artists, and an open-air festival atmosphere.",
    organizer: "Chords Entertainment",
  },
  {
    id: 6,
    title: "Founders & Investors Forum",
    category: "Business",
    date: "2027-02-21",
    time: "09:00 AM - 03:00 PM",
    location: "Shangri-La, Colombo",
    price: 1800,
    image: foundersInvestorsForumImg,
    description:
      "Connect with ambitious founders, investors, and mentors shaping the next generation of business.",
    organizer: "Lanka Venture Club",
  },
  {
    id: 7,
    title: "Digital Creators Meetup",
    category: "Technology",
    date: "2027-03-13",
    time: "10:00 AM - 02:00 PM",
    location: "Trace Expert City, Colombo",
    price: 1200,
    image: digitalCreatorsMeetupImg,
    description:
      "A hands-on community day for digital creators, designers, and technology enthusiasts.",
    organizer: "TechLabs Sri Lanka",
  },
  {
    id: 8,
    title: "Colombo Jazz Nights",
    category: "Music",
    date: "2027-03-27",
    time: "07:00 PM - 11:00 PM",
    location: "Nelum Pokuna Theatre, Colombo",
    price: 3200,
    image: colomboJazzNightsImg,
    description:
      "Enjoy a refined night of contemporary jazz and standout performances from regional artists.",
    organizer: "Chords Entertainment",
  },
  {
    id: 9,
    title: "Small Business Growth Summit",
    category: "Business",
    date: "2027-04-10",
    time: "09:00 AM - 05:00 PM",
    location: "BMICH, Colombo",
    price: 2200,
    image: smallBusinessGrowthSummitImg,
    description:
      "Learn practical growth strategies, meet industry experts, and build valuable business connections.",
    organizer: "Lanka Venture Club",
  },
];
