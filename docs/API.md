# API Specification Document (API.md)

## 1. Architecture & Protocol

- **Base URL**: `/api/v1`
- **Format**: JSON (`Content-Type: application/json`)
- **Authentication**: HTTP Bearer Token (`Authorization: Bearer <JWT_TOKEN>`)
- **Pagination Standard**: Default page limit 20 items per page (`?page=1&limit=20`)

---

## 2. Standard Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid email format or password length",
    "details": []
  }
}
```

---

## 3. Endpoints Breakdown

### 3.1 Authentication

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | None | Register a new user account |
| `POST` | `/auth/login` | None | Authenticate user & return JWT token |
| `GET` | `/auth/me` | Bearer | Fetch authenticated user details |
| `POST` | `/auth/logout` | Bearer | Invalidate session |

#### `POST /auth/register`
**Request Body:**
```json
{
  "phone_number": "+919876543210",
  "email": "farmer@agrimart.com",
  "password": "SecurePassword123!",
  "full_name": "Ramesh Patel",
  "role": "FARMER",
  "city_district": "Ludhiana",
  "state": "Punjab",
  "pincode": "141001",
  "latitude": 30.9010,
  "longitude": 75.8573
}
```

---

### 3.2 Categories

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | None | List categories filtered by type |

#### Query Parameters: `?type=EQUIPMENT_RENTAL` (Values: `EQUIPMENT_RENTAL`, `EQUIPMENT_SALE`, `CROP`, `PRODUCT`)

---

### 3.3 Listings (Equipment, Crops, Products)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/listings` | None | Search & browse all listings with filters |
| `GET` | `/listings/:id` | None | Fetch single listing details by ID |
| `POST` | `/listings` | Bearer | Create a new listing (Rental/Equipment/Crop/Product) |
| `PUT` | `/listings/:id` | Bearer | Update owned listing |
| `DELETE` | `/listings/:id` | Bearer | Soft delete or archive owned listing |

#### `GET /listings` Query Parameters:
- `listing_type`: `RENTAL`, `USED_EQUIPMENT`, `CROP`, `PRODUCT`
- `category_id`: Category UUID
- `search`: Keyword string (matches title/description)
- `min_price` / `max_price`: Numeric range
- `city_district`: Location string
- `state`: State string
- `lat` & `lng` & `radius_km`: Geospatial radius filter (e.g. `lat=30.9&lng=75.85&radius_km=50`)

#### `POST /listings` Request Payload Example (Equipment Rental):
```json
{
  "title": "Mahindra 575 DI Tractor 45HP for Rent",
  "description": "Well maintained 45HP tractor available with plow and cultivator attachments.",
  "listing_type": "RENTAL",
  "category_id": "category-uuid-here",
  "price": 1200.00,
  "price_unit": "PER_DAY",
  "city_district": "Ludhiana",
  "state": "Punjab",
  "latitude": 30.9010,
  "longitude": 75.8573,
  "images": ["https://storage.agrimart.com/images/tractor1.jpg"],
  "equipment_details": {
    "brand": "Mahindra",
    "model": "575 DI",
    "horsepower": 45,
    "year_manufactured": 2022,
    "operator_included": true,
    "security_deposit": 2000.00
  }
}
```

---

### 3.4 Rental Booking Management

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/rentals/book` | Bearer | Create a rental booking request |
| `GET` | `/rentals/my-bookings` | Bearer | List rental bookings made by renter |
| `GET` | `/rentals/incoming-requests`| Bearer | List rental requests received by equipment owner |
| `PATCH` | `/rentals/:id/status` | Bearer | Accept, Reject, or Cancel booking |

#### `POST /rentals/book` Request Payload:
```json
{
  "listing_id": "listing-uuid-here",
  "start_date": "2026-10-01",
  "end_date": "2026-10-05",
  "notes": "Need tractor delivered near Village Gill."
}
```

---

### 3.5 Purchase Requests & Inquiries

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/purchases/request` | Bearer | Submit buy request / price offer |
| `GET` | `/purchases/my-requests` | Bearer | List purchase requests sent by buyer |
| `GET` | `/purchases/incoming` | Bearer | List incoming buy inquiries received by seller |
| `PATCH` | `/purchases/:id/status` | Bearer | Update request status (`ACCEPTED`, `DECLINED`) |

---

### 3.6 User & Admin Dashboard APIs

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/dashboard/summary` | Bearer | Overview metrics for user dashboard |
| `GET` | `/dashboard/my-listings` | Bearer | List all listings belonging to current user |
| `GET` | `/admin/users` | Admin | Search and inspect platform users |
| `PATCH` | `/admin/listings/:id/moderate` | Admin | Moderate / change status of any listing |
