export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  eventsCompleted: number;
  priceRange: { min: number; max: number };
  about: string;
  gallery: string[];
  reviews: Review[];
}

export const CHEFS: Chef[] = [
  {
    id: "chef-1",
    name: "Chef Amine Alaoui",
    avatar: "https://images.unsplash.com/photo-1583394838173-c64dc779c93a?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Casablanca, Morocco",
    specialties: ["Modern Moroccan", "Weddings", "Fine Dining"],
    rating: 4.9,
    reviewsCount: 124,
    eventsCompleted: 215,
    priceRange: { min: 3000, max: 7000 },
    about: "With over 10 years of experience in Michelin-starred restaurants across Europe, I bring a modern twist to traditional Moroccan cuisine. My signature dishes focus on local, seasonal ingredients elevated through contemporary techniques.",
    gallery: [
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1511690656956-5ea0115dd00f?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Youssef B.", rating: 5, comment: "Absolutely mind-blowing flavors! Chef Amine made our wedding unforgettable.", date: "2 days ago" },
      { author: "Kenza T.", rating: 5, comment: "Professional, punctual, and the food was art.", date: "1 week ago" }
    ]
  },
  {
    id: "chef-2",
    name: "Chef Sofia Bennis",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1544148103-0773d1069aff?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Marrakech, Morocco",
    specialties: ["Mediterranean", "Large Events", "Vegan Options"],
    rating: 4.8,
    reviewsCount: 89,
    eventsCompleted: 150,
    priceRange: { min: 2000, max: 5000 },
    about: "Creating unforgettable culinary experiences is my passion. Whether it's an intimate gathering of 20 or a grand wedding of 500 guests, our team ensures every bite is perfect.",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Leila A.", rating: 5, comment: "The vegan options were the best I've ever had in Morocco.", date: "3 weeks ago" },
      { author: "Othmane K.", rating: 4, comment: "Great service and beautiful presentation.", date: "1 month ago" }
    ]
  },
  {
    id: "chef-3",
    name: "Chef Karim Tazi",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Rabat, Morocco",
    specialties: ["Traditional Seafood", "Private Dinners"],
    rating: 4.7,
    reviewsCount: 56,
    eventsCompleted: 80,
    priceRange: { min: 4000, max: 8000 },
    about: "A purist when it comes to ingredients. My menus are designed daily based on the freshest catch and local market availability.",
    gallery: [
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1515006935564-96400ac5683b?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1514326640560-7d063ef8aedc?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Hassan B.", rating: 5, comment: "Seafood was caught that morning! Incredible taste.", date: "2 months ago" }
    ]
  },
  {
    id: "chef-4",
    name: "Chef Salma Kabbage",
    avatar: "https://images.unsplash.com/photo-1595273611465-398b18f0c29f?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Agadir, Morocco",
    specialties: ["Baking", "Pastry", "Desserts"],
    rating: 4.9,
    reviewsCount: 201,
    eventsCompleted: 305,
    priceRange: { min: 1000, max: 3500 },
    about: "Sweetness is my signature. I specialize in luxurious dessert tables and grand wedding cakes that look as good as they taste.",
    gallery: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Nour M.", rating: 5, comment: "The cake was the highlight of our event!", date: "1 week ago" }
    ]
  },
  {
    id: "chef-5",
    name: "Chef Youssef Roudani",
    avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Casablanca, Morocco",
    specialties: ["BBQ", "Grill", "Corporate"],
    rating: 4.6,
    reviewsCount: 78,
    eventsCompleted: 112,
    priceRange: { min: 1500, max: 4000 },
    about: "Master of the grill. I bring the ultimate outdoor dining experience to your garden or corporate retreat.",
    gallery: [
      "https://images.unsplash.com/photo-1529193591184-b1d58069e2cff?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Sami W.", rating: 4, comment: "Amazing meats. Very professional setup.", date: "3 weeks ago" }
    ]
  },
  {
    id: "chef-6",
    name: "Chef Laila Benjelloun",
    avatar: "https://images.unsplash.com/photo-1581299894007-aaa502973693?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Tangier, Morocco",
    specialties: ["Healthy", "Vegan", "Organic"],
    rating: 4.9,
    reviewsCount: 154,
    eventsCompleted: 230,
    priceRange: { min: 2500, max: 5500 },
    about: "Cooking organic, farm-to-table meals that energize and satisfy.",
    gallery: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1498837167922-41cfa6f31039?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Meryem F.", rating: 5, comment: "The salads were phenomenal, so fresh!", date: "2 months ago" }
    ]
  },
  {
    id: "chef-7",
    name: "Chef Omar El Fassi",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1565557623262-b51c251d102e?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Fes, Morocco",
    specialties: ["Traditional Fassi", "Weddings"],
    rating: 5.0,
    reviewsCount: 312,
    eventsCompleted: 450,
    priceRange: { min: 5000, max: 12000 },
    about: "Preserving the royal culinary heritage of Fes. Authentic recipes passed down through generations.",
    gallery: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1627308595229-7830f5c92fcca?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Fatima E.", rating: 5, comment: "The best pastilla I have ever tasted.", date: "1 month ago" },
      { author: "Ahmed S.", rating: 5, comment: "A true master of Moroccan spices.", date: "3 months ago" }
    ]
  },
  {
    id: "chef-8",
    name: "Chef Hind Chraibi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Casablanca, Morocco",
    specialties: ["International", "Fusion", "Corporate"],
    rating: 4.5,
    reviewsCount: 65,
    eventsCompleted: 98,
    priceRange: { min: 2500, max: 6000 },
    about: "Blending Moroccan flavors with international techniques to create unique fusion dishes.",
    gallery: [
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1514326640560-7d063ef8aedc?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Sara R.", rating: 4, comment: "Innovative menu, everyone loved the fusion tapas.", date: "2 weeks ago" }
    ]
  },
  {
    id: "chef-9",
    name: "Chef Tariq Mansouri",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Rabat, Morocco",
    specialties: ["Sushi", "Asian Fusion", "Private Dinners"],
    rating: 4.8,
    reviewsCount: 112,
    eventsCompleted: 180,
    priceRange: { min: 3500, max: 8500 },
    about: "Premium sushi and Asian fusion prepared live at your event for an unforgettable show.",
    gallery: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Mehdi L.", rating: 5, comment: "The sushi live station was incredible!", date: "1 month ago" }
    ]
  },
  {
    id: "chef-10",
    name: "Chef Nada Belkhayat",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Marrakech, Morocco",
    specialties: ["Brunch", "Breakfast", "Boutique Events"],
    rating: 4.7,
    reviewsCount: 190,
    eventsCompleted: 240,
    priceRange: { min: 1500, max: 4000 },
    about: "Creating the most aesthetic and delicious brunch spreads for day-time events and bridal showers.",
    gallery: [
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Rania C.", rating: 5, comment: "Picture perfect brunch setup. Delicious food.", date: "4 days ago" }
    ]
  },
  {
    id: "chef-11",
    name: "Chef Bouchra Gueddar",
    avatar: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1511690656956-5ea0115dd00f?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Meknes, Morocco",
    specialties: ["Traditional Meknassi", "Couscous", "Events"],
    rating: 4.9,
    reviewsCount: 245,
    eventsCompleted: 310,
    priceRange: { min: 2000, max: 6000 },
    about: "Specializing in the rich and ancient culinary traditions of Meknes. Every dish is a journey back in time, crafted with authentic spices and soul.",
    gallery: [
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Salim T.", rating: 5, comment: "Her couscous is legendary in Meknes. Absolutely perfect.", date: "1 week ago" }
    ]
  },
  {
    id: "chef-12",
    name: "Chef Idriss B.",
    avatar: "https://images.unsplash.com/photo-1583394838173-c64dc779c93a?auto=format&fit=crop&q=80&w=200&h=200",
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200&h=600",
    location: "Oujda, Morocco",
    specialties: ["Oriental", "BBQ", "Karan"],
    rating: 4.8,
    reviewsCount: 156,
    eventsCompleted: 198,
    priceRange: { min: 1500, max: 4500 },
    about: "Bringing the eastern oriental flavors of Oujda to your table. Specialities include Karan and slow-cooked meat dishes.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600&h=600",
      "https://images.unsplash.com/photo-1529193591184-b1d58069e2cff?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    reviews: [
      { author: "Fatima Z.", rating: 5, comment: "Authentic Oujdi taste! Outstanding service.", date: "3 weeks ago" }
    ]
  }
];
