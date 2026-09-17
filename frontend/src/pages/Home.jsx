import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tractor, Wheat, Sprout, Wrench, Droplets, Beef,
  Search, PhoneCall, Handshake, CheckCircle2, MapPin, ShieldCheck, Zap
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ListingCard from '../components/ListingCard';
import SectionHeader from '../components/SectionHeader';
import Badge from '../components/Badge';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  // 1. POPULAR CATEGORIES (6 Items)
  const popularCategories = [
    {
      id: 'cat-equipment',
      title: 'Equipment Rental',
      description: 'Rent tractors, rotavators, sprayers & harvesters.',
      icon: <Tractor size={28} />,
      count: '140+ Rentals',
      path: '/rent',
    },
    {
      id: 'cat-crops',
      title: 'Crops',
      description: 'Direct farm-to-buyer paddy, cotton, maize & spices.',
      icon: <Wheat size={28} />,
      count: '320+ Crops',
      path: '/crops',
    },
    {
      id: 'cat-seeds',
      title: 'Seeds & Fertilizers',
      description: 'Certified hybrid seeds, organic manure & NPK.',
      icon: <Sprout size={28} />,
      count: '210+ Products',
      path: '/products',
    },
    {
      id: 'cat-used',
      title: 'Used Equipment',
      description: 'Buy pre-owned tractors, pumps & implements.',
      icon: <Wrench size={28} />,
      count: '95+ Used',
      path: '/buy-sell',
    },
    {
      id: 'cat-irrigation',
      title: 'Irrigation',
      description: 'Drip lines, sprinklers & high-pressure water pumps.',
      icon: <Droplets size={28} />,
      count: '60+ Products',
      path: '/products',
    },
    {
      id: 'cat-feed',
      title: 'Animal Feed',
      description: 'High-protein cattle feed, mineral mixtures & fodder.',
      icon: <Beef size={28} />,
      count: '45+ Products',
      path: '/products',
    },
  ];

  // 2. EQUIPMENT FOR RENT (4 Items)
  const equipmentRentals = [
    {
      id: 'eq-1',
      title: 'Mahindra 575 DI Tractor (45 HP) with Operator',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=600&q=80',
      category: 'Equipment Rental',
      location: 'Ludhiana, Punjab',
      price: 1200,
      priceUnit: 'day',
      condition: 'Excellent',
      availability: 'available',
      type: 'rental',
    },
    {
      id: 'eq-2',
      title: 'Heavy-Duty Rotavator / Tiller (6 Feet)',
      image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
      category: 'Equipment Rental',
      location: 'Karnal, Haryana',
      price: 800,
      priceUnit: 'day',
      condition: 'Good',
      availability: 'available',
      type: 'rental',
    },
    {
      id: 'eq-3',
      title: 'High-Pressure Boom Crop Sprayer (500L Tank)',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
      category: 'Equipment Rental',
      location: 'Bathinda, Punjab',
      price: 600,
      priceUnit: 'day',
      condition: 'Like New',
      availability: 'available',
      type: 'rental',
    },
    {
      id: 'eq-4',
      title: 'Diesel Water Pump Set (8 HP High Flow)',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      category: 'Equipment Rental',
      location: 'Ambala, Haryana',
      price: 350,
      priceUnit: 'day',
      condition: 'Good',
      availability: 'available',
      type: 'rental',
    },
  ];

  // 3. CROPS MARKETPLACE (5 Items)
  const cropsListings = [
    {
      id: 'crop-1',
      title: 'Sona Masoori Paddy Grain (100 Quintals Harvest)',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      category: 'Crops',
      location: 'Guntur, Andhra Pradesh',
      price: 2150,
      priceUnit: 'quintal',
      availability: 'available',
      type: 'crop',
    },
    {
      id: 'crop-2',
      title: 'Raw Organic Long-Staple Cotton (Bulk Harvest)',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      category: 'Crops',
      location: 'Warangal, Telangana',
      price: 7200,
      priceUnit: 'quintal',
      availability: 'available',
      type: 'crop',
    },
    {
      id: 'crop-3',
      title: 'Yellow Maize Grain (Grade A 50 Quintals)',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
      category: 'Crops',
      location: 'Davangere, Karnataka',
      price: 1950,
      priceUnit: 'quintal',
      availability: 'available',
      type: 'crop',
    },
    {
      id: 'crop-4',
      title: 'Guntur Red Chillies (Sun Dried Premium)',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
      category: 'Crops',
      location: 'Guntur, Andhra Pradesh',
      price: 14500,
      priceUnit: 'quintal',
      availability: 'available',
      type: 'crop',
    },
    {
      id: 'crop-5',
      title: 'Fresh Organic Turmeric (High Curcumin)',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
      category: 'Crops',
      location: 'Nizamabad, Telangana',
      price: 8500,
      priceUnit: 'quintal',
      availability: 'available',
      type: 'crop',
    },
  ];

  // 4. AGRICULTURAL PRODUCTS (5 Items)
  const agriProducts = [
    {
      id: 'prod-1',
      title: 'Certified Hybrid Mustard Seeds (1kg Pack)',
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
      category: 'Seeds & Inputs',
      location: 'Jaipur, Rajasthan',
      price: 450,
      priceUnit: 'item',
      availability: 'available',
      type: 'product',
    },
    {
      id: 'prod-2',
      title: 'Organic NPK Bio-Fertilizer (50kg Bag)',
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
      category: 'Fertilizers',
      location: 'Nashik, Maharashtra',
      price: 850,
      priceUnit: 'item',
      availability: 'available',
      type: 'product',
    },
    {
      id: 'prod-3',
      title: 'Enriched Cow Dung Organic Manure (100kg Bag)',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
      category: 'Organic Manure',
      location: 'Meerut, Uttar Pradesh',
      price: 600,
      priceUnit: 'item',
      availability: 'available',
      type: 'product',
    },
    {
      id: 'prod-4',
      title: 'High-Protein Dairy Cattle Feed (50kg Bag)',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80',
      category: 'Animal Feed',
      location: 'Anand, Gujarat',
      price: 1100,
      priceUnit: 'item',
      availability: 'available',
      type: 'product',
    },
    {
      id: 'prod-5',
      title: 'Ergonomic Stainless Steel Farming Hoe & Digging Tool Set',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      category: 'Farming Tools',
      location: 'Coimbatore, Tamil Nadu',
      price: 380,
      priceUnit: 'item',
      availability: 'available',
      type: 'product',
    },
  ];

  // 5. USED EQUIPMENT (4 Items)
  const usedEquipment = [
    {
      id: 'used-1',
      title: 'Pre-Owned Kirloskar 5 HP Water Pump',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      category: 'Used Equipment',
      location: 'Rajkot, Gujarat',
      price: '₹6,500',
      priceUnit: 'total',
      condition: 'Good (Used 2 Seasons)',
      availability: 'available',
      type: 'used_equipment',
    },
    {
      id: 'used-2',
      title: 'Used ASPEE Tractor-Mounted Boom Sprayer',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
      category: 'Used Equipment',
      location: 'Indore, Madhya Pradesh',
      price: '₹18,000',
      priceUnit: 'total',
      condition: 'Like New',
      availability: 'available',
      type: 'used_equipment',
    },
    {
      id: 'used-3',
      title: 'Used Heavy Duty Cultivator (9 Tyne)',
      image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
      category: 'Used Equipment',
      location: 'Hisar, Haryana',
      price: '₹14,500',
      priceUnit: 'total',
      condition: 'Fair',
      availability: 'available',
      type: 'used_equipment',
    },
    {
      id: 'used-4',
      title: 'Pre-Owned Hand Harvesting Tools & Sickle Set',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      category: 'Used Equipment',
      location: 'Nagpur, Maharashtra',
      price: '₹1,200',
      priceUnit: 'total',
      condition: 'Good',
      availability: 'available',
      type: 'used_equipment',
    },
  ];

  return (
    <MainLayout>
      <div className="home-page">
        {/* ================= 2. HERO SECTION ================= */}
        <section className="home-hero">
          <div className="home-hero__container">
            <div className="home-hero__text-col">
              <Badge variant="available" icon={<CheckCircle2 size={14} />}>
                Direct Kisan Marketplace
              </Badge>
              <h1 className="home-hero__heading">
                Everything Farmers Need, In One Place.
              </h1>
              <p className="home-hero__subtext">
                Rent equipment, buy and sell crops, and trade agricultural products near you.
              </p>

              <div className="home-hero__cta-group">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Tractor size={20} />}
                  onClick={() => navigate('/rent')}
                >
                  Rent Equipment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Wheat size={20} />}
                  onClick={() => navigate('/buy-sell')}
                >
                  Buy & Sell
                </Button>
              </div>

              {/* Integrated Search Bar inside Hero */}
              <div className="home-hero__search-box">
                <SearchBar
                  placeholder="Search tractors, paddy, seeds, fertilizers..."
                  onSearch={(params) => navigate('/rent')}
                />
              </div>
            </div>

            {/* Attractive Visual Card */}
            <div className="home-hero__visual-col">
              <div className="home-hero__image-card">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Agricultural Field"
                  className="home-hero__img"
                />
                <div className="home-hero__image-overlay">
                  <div className="home-hero__stat-pill">
                    <Zap size={18} className="stat-icon" />
                    <div>
                      <strong>10,000+</strong>
                      <span>Active Farmers & Owners</span>
                    </div>
                  </div>
                  <div className="home-hero__stat-pill">
                    <MapPin size={18} className="stat-icon" />
                    <div>
                      <strong>50+ Districts</strong>
                      <span>Verified Nearby Listings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. POPULAR CATEGORIES ================= */}
        <section className="home-section">
          <SectionHeader
            title="Popular Categories"
            subtitle="Explore specialized agricultural marketplace segments."
            badge={<Badge variant="info">Browse Marketplace</Badge>}
          />
          <div className="home-grid home-grid--6col">
            {popularCategories.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                description={cat.description}
                icon={cat.icon}
                count={cat.count}
                onClick={() => navigate(cat.path)}
              />
            ))}
          </div>
        </section>

        {/* ================= 4. EQUIPMENT FOR RENT ================= */}
        <section className="home-section">
          <SectionHeader
            title="Equipment For Rent"
            subtitle="On-demand tractors, rotavators, sprayers and machinery nearby."
            actionText="View All Rentals"
            action={() => navigate('/rent')}
          />
          <div className="home-grid home-grid--4col">
            {equipmentRentals.map((item) => (
              <ListingCard
                key={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                location={item.location}
                price={item.price}
                priceUnit={item.priceUnit}
                condition={item.condition}
                availability={item.availability}
                type={item.type}
                ctaText="Rent Equipment"
                onCtaClick={() => navigate('/rent')}
              />
            ))}
          </div>
        </section>

        {/* ================= 5. CROPS MARKETPLACE ================= */}
        <section className="home-section">
          <SectionHeader
            title="Crops Marketplace"
            subtitle="Direct farm-to-buyer crop listings with transparent unit pricing."
            actionText="View All Crops"
            action={() => navigate('/crops')}
          />
          <div className="home-grid home-grid--5col">
            {cropsListings.map((item) => (
              <ListingCard
                key={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                location={item.location}
                price={item.price}
                priceUnit={item.priceUnit}
                availability={item.availability}
                type={item.type}
                ctaText="Request Crop"
                onCtaClick={() => navigate('/crops')}
              />
            ))}
          </div>
        </section>

        {/* ================= 6. AGRICULTURAL PRODUCTS ================= */}
        <section className="home-section">
          <SectionHeader
            title="Agricultural Products"
            subtitle="Quality seeds, fertilizers, organic manure, animal feed, and farming tools."
            actionText="View All Products"
            action={() => navigate('/products')}
          />
          <div className="home-grid home-grid--5col">
            {agriProducts.map((item) => (
              <ListingCard
                key={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                location={item.location}
                price={item.price}
                priceUnit={item.priceUnit}
                availability={item.availability}
                type={item.type}
                ctaText="View Product"
                onCtaClick={() => navigate('/products')}
              />
            ))}
          </div>
        </section>

        {/* ================= 7. USED EQUIPMENT ================= */}
        <section className="home-section">
          <SectionHeader
            title="Used Equipment"
            subtitle="Pre-owned machinery and implements available for direct purchase."
            actionText="View Used Machinery"
            action={() => navigate('/buy-sell')}
          />
          <div className="home-grid home-grid--4col">
            {usedEquipment.map((item) => (
              <ListingCard
                key={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                location={item.location}
                price={item.price}
                priceUnit={item.priceUnit}
                condition={item.condition}
                availability={item.availability}
                type={item.type}
                ctaText="Inquire Machine"
                onCtaClick={() => navigate('/buy-sell')}
              />
            ))}
          </div>
        </section>

        {/* ================= 8. HOW IT WORKS ================= */}
        <section className="home-section home-how-it-works">
          <SectionHeader
            title="How AgriMart Works"
            subtitle="Three simple steps to rent equipment or trade crops directly."
          />
          <div className="home-grid home-grid--3col">
            <div className="how-card">
              <div className="how-card__icon-box">
                <Search size={32} />
                <span className="how-card__step-num">1</span>
              </div>
              <h3 className="how-card__title">1. Search</h3>
              <p className="how-card__desc">
                Find equipment, crops or agricultural products near your location in your district.
              </p>
            </div>

            <div className="how-card">
              <div className="how-card__icon-box">
                <PhoneCall size={32} />
                <span className="how-card__step-num">2</span>
              </div>
              <h3 className="how-card__title">2. Connect</h3>
              <p className="how-card__desc">
                Contact the farmer, seller or equipment owner directly through phone or in-app request.
              </p>
            </div>

            <div className="how-card">
              <div className="how-card__icon-box">
                <Handshake size={32} />
                <span className="how-card__step-num">3</span>
              </div>
              <h3 className="how-card__title">3. Buy or Rent</h3>
              <p className="how-card__desc">
                Complete the rental booking or crop purchase transaction directly with full transparency.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 9. WHY AGRIMART ================= */}
        <section className="home-section home-why-agrimart">
          <SectionHeader
            title="Why Choose AgriMart?"
            subtitle="Built specifically to empower local agricultural communities."
          />
          <div className="home-grid home-grid--5col">
            <div className="why-card">
              <div className="why-card__icon"><MapPin size={24} /></div>
              <h4 className="why-card__title">Local Listings</h4>
              <p className="why-card__desc">Find machinery and crops available right in your village or district.</p>
            </div>

            <div className="why-card">
              <div className="why-card__icon"><Tractor size={24} /></div>
              <h4 className="why-card__title">Farmer-Focused</h4>
              <p className="why-card__desc">Simple, clean interface built for smartphone use in the field.</p>
            </div>

            <div className="why-card">
              <div className="why-card__icon"><PhoneCall size={24} /></div>
              <h4 className="why-card__title">Easy Communication</h4>
              <p className="why-card__desc">Direct owner and buyer communication with zero middleman friction.</p>
            </div>

            <div className="why-card">
              <div className="why-card__icon"><Sprout size={24} /></div>
              <h4 className="why-card__title">All-in-One Platform</h4>
              <p className="why-card__desc">Rent equipment, sell crops, and buy fertilizers in one single app.</p>
            </div>

            <div className="why-card">
              <div className="why-card__icon"><ShieldCheck size={24} /></div>
              <h4 className="why-card__title">Simple & Transparent</h4>
              <p className="why-card__desc">Clear unit pricing per day or quintal with no hidden charges.</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
