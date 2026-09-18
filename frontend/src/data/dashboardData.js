/**
 * Centralized Demo Dataset for AgriMart Dashboard (Phase 11).
 * Represents structured API responses from future FastAPI backend endpoints.
 */

export const DEMO_USER = {
  id: 'usr_farmer_9912',
  name: 'Ramesh Kumar',
  role: 'Farmer',
  phone: '+91 98765 43210',
  email: 'ramesh.farmer@agrimart.in',
  location: 'Karimnagar, Telangana',
  village: 'Rampur',
  mandal: 'Karimnagar',
  district: 'Karimnagar',
  state: 'Telangana',
  pincode: '505001',
  avatar: '🌾',
  joinedDate: 'January 2025',
  verified: true,
};

export const DEMO_METRICS = {
  myListingsCount: 6,
  activeRentalsCount: 2,
  purchaseRequestsCount: 4,
  unreadMessagesCount: 3,
};

export const DEMO_USER_LISTINGS = [
  {
    id: 'lst_101',
    title: 'Fresh Paddy BPT 5204 (Samba Mahsuri)',
    category: 'Crop',
    type: 'crop',
    price: '₹2,450 / quintal',
    quantity: '120 quintals',
    location: 'Rampur, Karimnagar',
    status: 'Active',
    date: '12 Sep 2026',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
  },
  {
    id: 'lst_102',
    title: 'John Deere 5310 Tractor 55 HP',
    category: 'Rent Equipment',
    type: 'rent',
    price: '₹3,500 / day',
    quantity: '1 Unit',
    location: 'Karimnagar, Telangana',
    status: 'Active',
    date: '08 Sep 2026',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&q=80',
  },
  {
    id: 'lst_103',
    title: 'IFFCO NPK 19-19-19 Organic Fertilizer',
    category: 'Product',
    type: 'product',
    price: '₹850 / 50kg bag',
    quantity: '25 bags',
    location: 'Karimnagar Town',
    status: 'Pending',
    date: '02 Sep 2026',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
  },
  {
    id: 'lst_104',
    title: 'Shaktiman 7 Feet Rotavator Heavy Duty',
    category: 'Used Equipment',
    type: 'used',
    price: '₹85,000',
    quantity: '1 Unit',
    location: 'Warangal Road, Telangana',
    status: 'Sold',
    date: '20 Aug 2026',
    image: 'https://images.unsplash.com/photo-1530267981608-bc70a3196375?w=400&q=80',
  },
];

export const DEMO_RENTAL_ACTIVITY = [
  {
    id: 'rnt_201',
    equipmentName: 'Kubota Harvester DC-68G',
    ownerName: 'Suresh Patel (Owner)',
    rentalPeriod: '15 Sep - 18 Sep 2026',
    duration: '3 Days',
    amount: '₹13,500',
    status: 'Active',
    location: 'Ludhiana, Punjab',
  },
  {
    id: 'rnt_202',
    equipmentName: 'Neptune 16L Battery Sprayer',
    ownerName: 'AgriTools Co.',
    rentalPeriod: '22 Sep 2026',
    duration: '1 Day',
    amount: '₹450',
    status: 'Upcoming',
    location: 'Karimnagar District',
  },
  {
    id: 'rnt_203',
    equipmentName: 'Mahindra 575 DI Tractor',
    ownerName: 'Venkatesh Rao',
    rentalPeriod: '01 Aug - 05 Aug 2026',
    duration: '5 Days',
    amount: '₹17,500',
    status: 'Completed',
    location: 'Warangal Rural',
  },
];

export const DEMO_PURCHASE_REQUESTS = [
  {
    id: 'req_301',
    itemTitle: 'Paddy BPT 5204 (10 Quintals)',
    buyerName: 'Vijay Trading Corp',
    offeredPrice: '₹2,400 / quintal',
    totalValue: '₹24,000',
    requestDate: '16 Sep 2026',
    status: 'Pending',
    message: 'Interested in buying 10 quintals of paddy. Can collect directly from your farm.',
  },
  {
    id: 'req_302',
    itemTitle: 'Used Shaktiman Rotavator',
    buyerName: 'Kishan Reddy',
    offeredPrice: '₹82,000',
    totalValue: '₹82,000',
    requestDate: '14 Sep 2026',
    status: 'Accepted',
    message: 'Offer accepted. Pickup scheduled for tomorrow morning.',
  },
  {
    id: 'req_303',
    itemTitle: 'NPK Fertilizer 50kg Bags',
    buyerName: 'Anand Bio Farms',
    offeredPrice: '₹800 / bag',
    totalValue: '₹4,000',
    requestDate: '10 Sep 2026',
    status: 'Pending',
    message: 'Looking for 5 bags of organic NPK fertilizer.',
  },
];

export const DEMO_RECENT_ACTIVITIES = [
  {
    id: 'act_401',
    icon: 'Wheat',
    type: 'listing',
    title: 'Created new Paddy listing',
    description: 'You posted "Fresh Paddy BPT 5204" for sale at ₹2,450/quintal.',
    timestamp: '10 minutes ago',
  },
  {
    id: 'act_402',
    icon: 'ShoppingCart',
    type: 'request',
    title: 'New purchase request received',
    description: 'Vijay Trading Corp requested 10 quintals of Paddy.',
    timestamp: '2 hours ago',
  },
  {
    id: 'act_403',
    icon: 'Tractor',
    type: 'rental',
    title: 'Rental request accepted',
    description: 'Kubota Harvester rental confirmed for 15 Sep - 18 Sep.',
    timestamp: 'Yesterday',
  },
  {
    id: 'act_404',
    icon: 'MessageSquare',
    type: 'message',
    title: 'Received a new message',
    description: 'Suresh Patel sent a message regarding Harvester delivery time.',
    timestamp: '2 days ago',
  },
  {
    id: 'act_405',
    icon: 'CheckCircle',
    type: 'status',
    title: 'Listing marked as sold',
    description: 'Shaktiman Rotavator was successfully marked as Sold.',
    timestamp: '3 days ago',
  },
];

export const DEMO_MESSAGES_PREVIEW = [
  {
    id: 'msg_501',
    sender: 'Suresh Patel (Harvester Owner)',
    avatar: '👨‍🌾',
    text: 'Namaste Ramesh ji! I will deliver the Kubota harvester by 7:00 AM tomorrow.',
    time: '10:45 AM',
    unread: true,
  },
  {
    id: 'msg_502',
    sender: 'Vijay Trading Corp',
    avatar: '🏢',
    text: 'Is the BPT 5204 Paddy grade A certified?',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 'msg_503',
    sender: 'AgriMart Customer Support',
    avatar: '🌾',
    text: 'Welcome to AgriMart! Let us know if you need help listing your crops.',
    time: '12 Sep',
    unread: false,
  },
];
