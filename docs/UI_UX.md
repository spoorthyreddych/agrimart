# UI/UX Architecture & Guidelines (UI_UX.md)

## 1. Design Philosophy & UX Principles

AgriMart is designed specifically for agricultural workers, farmers, vendors, and buyers. The UI prioritized three fundamental principles:
1. **Rural-First Usability**: High legibility, large touch targets (min 48x48px), intuitive iconography, and low-contrast sensitivity for outdoor daylight usage.
2. **Clarity & Trust**: Explicit pricing per unit (e.g. ₹/Day, ₹/Quintal), seller distance indicators, and clear transaction status labels.
3. **Streamlined Workflows**: Minimal step count to post a listing or submit a rental request.

---

## 2. Color Palette & Typography

### Primary Palette (Earthy & Agricultural Theme)
- **Forest Green (Primary)**: `#1E5631` (Brand header, primary buttons, active tabs)
- **Fresh Growth (Secondary)**: `#4C9A2A` (Hover states, badges, highlight tags)
- **Sunlight Gold (Accent)**: `#E8A628` (Rating stars, warning alerts, highlighted badges)
- **Soil Brown (Neutral Dark)**: `#2C221E` (Headings, primary body text)
- **Field Cream (Surface)**: `#F7F9F5` (App background, card containers)
- **Clean White (Card Surface)**: `#FFFFFF` (Card backgrounds, modals)

### Typography Scale
- **Headings (H1, H2, H3)**: Inter / Roboto, Bold / SemiBold (e.g. H1: 2rem/32px, H2: 1.5rem/24px).
- **Body Text**: 1rem (16px) Base size for readability on mobile devices.
- **Micro-copy & Captions**: 0.875rem (14px) with high contrast ratio (`#4A5568`).

---

## 3. Key Layouts & Component Wireframe Specs

### 3.1 Global Header & Navigation
- **Left**: AgriMart Logo & Slogan ("Empowering Farmers").
- **Center**: Location Selector Dropdown (e.g. 📍 "Ludhiana, Punjab ▾") + Search Bar.
- **Right**: Action Buttons ("+ Post Listing", "Rent Equipment", "Buy Crops"), User Account Avatar / Auth Buttons.

### 3.2 Homepage Architecture
1. **Hero Section**:
   - High impact banner with search bar: *"Find Tractors, Harvesters & Crops Near You"*.
   - Quick Location & Radius Filter: *"Within [ 25 km ▾ ] of [ Current Location ]"*.
2. **Category Navigation Grid**:
   - 🚜 Equipment Rentals
   - 🌾 Crop Marketplace
   - 🔧 Used Machinery
   - 🧪 Seeds & Fertilizers
3. **Featured Equipment Rental Cards**:
   - Card structure: Image (4:3 ratio), Title, Horsepower tag, Distance badge ("8 km away"), Rate ("₹1,200/day"), "Book Now" CTA.
4. **Fresh Harvest Crop Showcase**:
   - Card structure: Crop image, Variety, Available quantity ("50 Quintals"), Price ("₹2,100 / Quintal"), Harvest Date, "Request Quote" CTA.

### 3.3 Search & Results View
- **Split View Layout**:
  - **Left Sidebar (Desktop) / Filter Drawer (Mobile)**:
    - Distance Radius Slider (5 km to 100 km).
    - Category Checkboxes.
    - Price Range Min/Max Inputs.
    - Operator Requirement Toggle ("Include Operator").
  - **Main Listing Grid**:
    - Result count & Active filter pills.
    - Sort selector (Nearest, Price: Low-to-High, Newest).
    - Grid of Listing Cards (Responsive 1/2/3/4 columns).

### 3.4 Detail Pages

#### A. Equipment Rental Detail Page
- Image Carousel (Multiple photos).
- Key Spec Highlights: HP, Brand, Model Year, Fuel Type, Operator status.
- Location Map Preview & Distance from User.
- **Sticky Booking Widget**:
  - Date Range Picker (Start Date -> End Date).
  - Estimated Total Price breakdown (Daily rate x Days + Security deposit).
  - "Submit Rental Booking Request" Button.

#### B. Crop Marketplace Detail Page
- Crop photo & Quality Grade badge.
- Available Volume & Minimum Order Quantity.
- Harvest Date & Location.
- **Purchase Request Form**:
  - Quantity input box (in Quintals/Kg).
  - Target Offer Price input.
  - "Contact Farmer / Submit Buy Offer" CTA.

### 3.5 User Dashboard Layout
- **Sidebar Tabs**:
  - 📊 Overview (Active listings count, pending booking requests, recent inquiries).
  - 🚜 My Rentals (Manage incoming booking requests from other farmers & outgoing requests).
  - 🌾 My Crop & Equipment Listings (Edit, Pause, Delete listings).
  - 🛍️ Purchase Inquiries.
  - 👤 Profile & Geolocation Settings.

---

## 4. Mobile Responsiveness & Touch Guidelines

- **Bottom Action Bar**: Fixed bottom bar on mobile screens with primary actions ("Book Now", "Call Seller").
- **Touch Friendly Targets**: All interactive elements must be at least `48px x 48px`.
- **Form Controls**: Use native date pickers and simple numerical keypad triggers for price/quantity inputs.
