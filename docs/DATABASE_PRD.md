# Database Requirements & Architectural Specifications (DATABASE_PRD)

## 1. Overview

AgriMart utilizes a relational database architecture (PostgreSQL recommended) to enforce relational integrity, support geospatial queries for location-based distance calculations, and guarantee transactional safety for rental bookings and purchase requests.

---

## 2. Entity Relationship Overview

```text
  +------------------+         +------------------+
  |      USERS       |1------1 |   USER_PROFILES  |
  +------------------+         +------------------+
            | 1                         | 1
            |                           |
            | N                         | N
  +------------------+         +------------------+
  |     LISTINGS     |1------N | RENTAL_BOOKINGS  |
  +------------------+         +------------------+
    | 1     | 1   | 1                   |
    | 1     | 1   | 1                   | N
    v       v     v            +------------------+
+-------++-------++-------+    |PURCHASE_REQUESTS |
|EQUIP. || CROPS ||PROD.  |    +------------------+
|DETAILS||DETAILS||DETAILS|             |
+-------++-------++-------+             | N
                               +------------------+
                               |     REVIEWS      |
                               +------------------+
```

---

## 3. Data Dictionary & Table Schemas

### 3.1 `users` Table
Stores authentication credentials and primary system identity.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique user identifier |
| `email` | `VARCHAR(255)` | `UNIQUE, NULLABLE` | Email address |
| `phone_number` | `VARCHAR(20)` | `UNIQUE, NOT NULL` | Primary contact number |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Hashed user password |
| `role` | `VARCHAR(30)` | `NOT NULL, DEFAULT 'FARMER'` | Values: `FARMER`, `BUYER`, `EQUIPMENT_OWNER`, `VENDOR`, `ADMIN` |
| `is_active` | `BOOLEAN` | `NOT NULL, DEFAULT true` | Account status |
| `is_verified` | `BOOLEAN` | `NOT NULL, DEFAULT false` | Verification status |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Update timestamp |

---

### 3.2 `user_profiles` Table
Stores extended user profile information and location details.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Profile ID |
| `user_id` | `UUID` | `FOREIGN KEY (users.id) ON DELETE CASCADE` | Associated user |
| `full_name` | `VARCHAR(150)` | `NOT NULL` | Full display name |
| `avatar_url` | `TEXT` | `NULLABLE` | Profile picture URL |
| `address_line` | `TEXT` | `NULLABLE` | Street address or village |
| `city_district` | `VARCHAR(100)` | `NOT NULL` | City or District |
| `state` | `VARCHAR(100)` | `NOT NULL` | State |
| `pincode` | `VARCHAR(10)` | `NOT NULL` | Postal Code |
| `latitude` | `DECIMAL(10, 8)` | `NULLABLE` | Geographic Latitude |
| `longitude` | `DECIMAL(11, 8)` | `NULLABLE` | Geographic Longitude |

---

### 3.3 `categories` Table
Stores hierarchical taxonomy for equipment, crops, and agricultural products.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Category ID |
| `name` | `VARCHAR(100)` | `NOT NULL` | Display Name (e.g., Tractors, Grains, Seeds) |
| `slug` | `VARCHAR(120)` | `UNIQUE, NOT NULL` | URL friendly slug |
| `type` | `VARCHAR(30)` | `NOT NULL` | Enum: `EQUIPMENT_RENTAL`, `EQUIPMENT_SALE`, `CROP`, `PRODUCT` |
| `parent_id` | `UUID` | `FOREIGN KEY (categories.id) NULLABLE` | Parent category for hierarchy |

---

### 3.4 `listings` Table (Polymorphic Base Table)
Central table for all rental, used equipment, crop, and product listings.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Listing ID |
| `user_id` | `UUID` | `FOREIGN KEY (users.id) ON DELETE CASCADE` | Creator/Owner ID |
| `category_id` | `UUID` | `FOREIGN KEY (categories.id)` | Category reference |
| `title` | `VARCHAR(255)` | `NOT NULL` | Listing title |
| `description` | `TEXT` | `NOT NULL` | Detailed description |
| `listing_type` | `VARCHAR(30)` | `NOT NULL` | Enum: `RENTAL`, `USED_EQUIPMENT`, `CROP`, `PRODUCT` |
| `price` | `DECIMAL(12, 2)` | `NOT NULL` | Base price (per day, per unit, or total asking) |
| `price_unit` | `VARCHAR(30)` | `NOT NULL` | Enum: `PER_DAY`, `PER_HOUR`, `PER_QUINTAL`, `PER_KG`, `PER_ITEM` |
| `status` | `VARCHAR(20)` | `NOT NULL, DEFAULT 'ACTIVE'` | Enum: `ACTIVE`, `PAUSED`, `SOLD`, `RENTED`, `ARCHIVED` |
| `city_district` | `VARCHAR(100)` | `NOT NULL` | Location city/district |
| `state` | `VARCHAR(100)` | `NOT NULL` | Location state |
| `latitude` | `DECIMAL(10, 8)` | `NULLABLE` | Geospatial latitude |
| `longitude` | `DECIMAL(11, 8)` | `NULLABLE` | Geospatial longitude |
| `images` | `JSONB` | `DEFAULT '[]'` | Array of image URLs |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Listing date |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Update date |

---

### 3.5 `equipment_details` Table
Extends `listings` when `listing_type` IN (`RENTAL`, `USED_EQUIPMENT`).

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Record ID |
| `listing_id` | `UUID` | `FOREIGN KEY (listings.id) ON DELETE CASCADE` | Related listing |
| `brand` | `VARCHAR(100)` | `NOT NULL` | Equipment brand (e.g., Mahindra, John Deere) |
| `model` | `VARCHAR(100)` | `NOT NULL` | Model name/number |
| `year_manufactured`| `INT` | `NULLABLE` | Year of manufacture |
| `horsepower` | `INT` | `NULLABLE` | Engine power (HP) |
| `hours_used` | `INT` | `NULLABLE` | Metered operation hours |
| `condition` | `VARCHAR(30)` | `NULLABLE` | Enum: `NEW`, `LIKE_NEW`, `GOOD`, `FAIR`, `NEEDS_REPAIR` |
| `operator_included` | `BOOLEAN` | `DEFAULT false` | Applies to rental machinery |
| `security_deposit` | `DECIMAL(10,2)` | `DEFAULT 0.00` | Deposit required for rental |

---

### 3.6 `crop_details` Table
Extends `listings` when `listing_type` = `CROP`.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Record ID |
| `listing_id` | `UUID` | `FOREIGN KEY (listings.id) ON DELETE CASCADE` | Related listing |
| `crop_variety` | `VARCHAR(100)` | `NULLABLE` | Variety/Breed (e.g., Basmati 370) |
| `available_quantity`| `DECIMAL(10, 2)`| `NOT NULL` | Total quantity available |
| `min_order_quantity`| `DECIMAL(10, 2)`| `DEFAULT 1.00` | Minimum order limit |
| `quantity_unit` | `VARCHAR(20)` | `NOT NULL` | Enum: `QUINTAL`, `KG`, `TON` |
| `harvest_date` | `DATE` | `NOT NULL` | Date harvested or expected harvest |
| `is_organic` | `BOOLEAN` | `DEFAULT false` | Organic certification indicator |

---

### 3.7 `product_details` Table
Extends `listings` when `listing_type` = `PRODUCT`.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Record ID |
| `listing_id` | `UUID` | `FOREIGN KEY (listings.id) ON DELETE CASCADE` | Related listing |
| `brand` | `VARCHAR(100)` | `NULLABLE` | Manufacturer/Brand |
| `stock_quantity` | `INT` | `NOT NULL, DEFAULT 0` | Available stock count |
| `pack_size` | `VARCHAR(50)` | `NOT NULL` | Unit pack spec (e.g., 50 kg, 5 Liters) |

---

### 3.8 `rental_bookings` Table
Manages rental bookings between equipment renters and equipment owners.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Booking ID |
| `listing_id` | `UUID` | `FOREIGN KEY (listings.id)` | Equipment listing rented |
| `renter_id` | `UUID` | `FOREIGN KEY (users.id)` | User booking the equipment |
| `owner_id` | `UUID` | `FOREIGN KEY (users.id)` | Equipment owner user |
| `start_date` | `DATE` | `NOT NULL` | Booking start date |
| `end_date` | `DATE` | `NOT NULL` | Booking end date |
| `total_price` | `DECIMAL(12, 2)` | `NOT NULL` | Calculated total amount |
| `status` | `VARCHAR(30)` | `NOT NULL, DEFAULT 'PENDING'` | Enum: `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`, `COMPLETED` |
| `notes` | `TEXT` | `NULLABLE` | Notes or special requests from renter |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Booking creation date |

---

### 3.9 `purchase_requests` Table
Manages purchase inquiries and trade requests for used equipment, crops, and products.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Request ID |
| `listing_id` | `UUID` | `FOREIGN KEY (listings.id)` | Target listing |
| `buyer_id` | `UUID` | `FOREIGN KEY (users.id)` | Purchasing user |
| `seller_id` | `UUID` | `FOREIGN KEY (users.id)` | Listing owner user |
| `offered_price` | `DECIMAL(12, 2)` | `NOT NULL` | Offered purchase price |
| `requested_quantity`| `DECIMAL(10, 2)`| `NULLABLE` | Quantity (for crops/products) |
| `status` | `VARCHAR(30)` | `NOT NULL, DEFAULT 'PENDING'` | Enum: `PENDING`, `ACCEPTED`, `DECLINED`, `CLOSED` |
| `message` | `TEXT` | `NULLABLE` | Message to seller |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Request timestamp |

---

### 3.10 `reviews` Table
Provides ratings and reviews for listings and rental experiences.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Review ID |
| `listing_id` | `UUID` | `FOREIGN KEY (listings.id)` | Rated listing |
| `reviewer_id` | `UUID` | `FOREIGN KEY (users.id)` | User leaving review |
| `rating` | `INT` | `NOT NULL, CHECK (rating >= 1 AND rating <= 5)` | Star rating (1-5) |
| `comment` | `TEXT` | `NULLABLE` | Review text |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT NOW()` | Creation timestamp |

---

## 4. Key Indexes & Performance Optimization

```sql
-- Search Optimization Indexes
CREATE INDEX idx_listings_listing_type ON listings(listing_type);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_category ON listings(category_id);
CREATE INDEX idx_listings_location ON listings(state, city_district);

-- Geospatial Coordinates Index
CREATE INDEX idx_listings_geo ON listings(latitude, longitude);

-- Booking Date Range Index
CREATE INDEX idx_rental_bookings_dates ON rental_bookings(listing_id, start_date, end_date);
```
