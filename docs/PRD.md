# Product Requirements Document (PRD) - AgriMart

## 1. Executive Summary

**AgriMart** is a digital platform tailored specifically for agricultural ecosystems. It bridges the gap between farmers, equipment owners, suppliers, and produce buyers by providing an integrated digital marketplace for:
1. **Equipment Rental**: On-demand rental of heavy and specialized farming equipment.
2. **Pre-Owned Machinery**: Transparent marketplace for buy/sell of used tractors and agricultural tools.
3. **Agri-Inputs**: Direct access to fertilizers, seeds, pesticides, and tools.
4. **Crop Marketplace**: Direct farm-to-market crop listings connecting farmers with bulk buyers.

---

## 2. Target Audience & User Roles

| Role | Description | Key Goals |
| :--- | :--- | :--- |
| **Farmer (Renter / Seller)** | Small & medium-scale agricultural producers. | Rent equipment affordably, sell crops directly without middlemen, buy quality inputs. |
| **Equipment Owner** | Individual farmers or commercial rental agencies owning machinery. | Monetize idle machinery by listing equipment for rent or sale. |
| **Agri-Input Vendor** | Registered suppliers, dealers, and dealers of farming inputs. | Sell seeds, fertilizers, and tools directly to local farming communities. |
| **Produce Buyer** | Wholesalers, retail businesses, processors, and end consumers. | Source fresh crops directly from local farmers at competitive prices. |
| **Administrator** | Platform operators and moderators. | Oversee listings, verify users, manage platform categories, resolve disputes. |

---

## 3. Product Scope & MVP Priorities

### 3.1 MVP Scope (Initial Phases)
- **User Authentication**: Email/Password and Phone registration with role selection.
- **Equipment Rental Listings**: Post machinery with daily/hourly rates, specifications, and availability calendar.
- **Used Equipment Marketplace**: Post pre-owned tools with usage hours, condition, and price.
- **Agricultural Products Marketplace**: Catalog for seeds, fertilizers, and tools.
- **Crop Marketplace**: Farm produce listing with quantity (quintals/kg), grade, price, and harvest date.
- **Location & Radius Filter**: Geolocation search to find nearby rentals and crops.
- **Rental & Purchase Request Engine**: Initiate rental bookings and send purchase inquiries.
- **User Dashboard**: Overview of posted listings, incoming requests, and booking statuses.

### 3.2 Post-MVP Scope (Future Phases)
- In-app real-time chat with attachment support.
- Automated payment gateway integration (Escrow & UPI/Cards).
- Interactive calendar management for machine availability.
- Multi-language UI support (Regional languages).
- Weather forecast and market pricing advisory widgets.
- Advanced administrative reporting & audit analytics.

---

## 4. Detailed Feature Specifications

### 4.1 Authentication & Profile Management
- User signup/login via Email/Password or Phone Number.
- Profile attributes: Name, Phone, Email, Address, Village/District, State, PIN code, Coordinates (Latitude/Longitude), Role(s).
- Document verification badge status (Optional for MVP, required for verified vendors).

### 4.2 Agricultural Equipment Rental Engine
- **Listing Attributes**: Title, Machine Type (Tractor, Harvester, Seeder, Sprayer, Tiller, Other), Brand/Model, Horsepower/Specs, Daily Rate, Hourly Rate, Security Deposit, Operator Included (Yes/No), Location, Images.
- **Booking Flow**: Select start date and end date -> Calculate total estimated cost -> Submit Rental Request -> Owner accepts/rejects -> Booking Confirmed.

### 4.3 Used Equipment Marketplace
- **Listing Attributes**: Title, Category, Model Year, Hours Used, Condition (Like New, Good, Fair, Repair Needed), Asking Price, Inspection Location, Seller Notes, Photos.
- **Buyer Action**: Send Purchase Request / Inquiry with custom offer price and message.

### 4.4 Agricultural Products Marketplace
- **Categories**: Seeds, Fertilizers, Pesticides/Insecticides, Farming Tools, Irrigation Supplies.
- **Product Attributes**: Name, Brand, Unit Pack Size (e.g., 50kg bag, 1L bottle), Price per unit, Stock quantity, Seller details.

### 4.5 Crop Marketplace
- **Listing Attributes**: Crop Name (e.g., Wheat, Rice, Cotton, Maize, Vegetables), Variety, Estimated Quantity, Minimum Order Quantity, Price per Quintal/Kg, Harvest Date, Location, Organic Certified (Yes/No), Sample Images.
- **Buyer Action**: Submit Purchase Request with target quantity and pickup date.

### 4.6 Search, Location & Filtering Engine
- Search bar supporting keyword search across listings.
- Filter options:
  - Category / Subcategory
  - Price Range (Min/Max)
  - Distance Radius (e.g., within 10km, 25km, 50km, 100km)
  - Sorting: Distance (Nearest first), Price (Low to High), Date (Newest first).

### 4.7 Requests & Booking Engine
- **Status Lifecycle**:
  - `PENDING`: Request created by buyer/renter.
  - `ACCEPTED`: Request accepted by seller/owner.
  - `REJECTED`: Request declined by seller/owner.
  - `COMPLETED`: Transaction/rental finished.
  - `CANCELLED`: Cancelled by applicant or seller before confirmation.

### 4.8 User Dashboards
- **My Listings**: View, Edit, Pause, or Delete posted rentals, equipment sales, crops, and products.
- **My Rental Bookings**: Manage incoming rental requests (as owner) and outgoing rental applications (as renter).
- **My Purchase Inquiries**: Track status of crop/product/used equipment purchase requests.

### 4.9 Admin Panel
- User management (View, Suspend, Activate).
- Listing moderation (Approve, Reject, Remove suspicious listings).
- Category management (Add/edit equipment types, crop categories, product subcategories).

---

## 5. Non-Functional Requirements

- **Performance**: Page load times under 2 seconds on 3G/4G networks.
- **Usability**: Clean, mobile-friendly responsive UI with large touch targets for ease of use by farmers in rural environments.
- **Scalability**: Modular architecture allowing independent scaling of frontend and backend.
- **Security**: Password hashing (bcrypt/argon2), JWT authentication, input sanitization, CORS enforcement.
- **Reliability**: Graceful error handling and fallback UI states.
