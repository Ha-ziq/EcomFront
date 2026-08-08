<div align="center">

# 🛒 Ecommerce Frontend

### Modern React-Based Shopping Platform Interface

A responsive e-commerce frontend built with React and Vite, providing product browsing, authentication, cart management, checkout flow, and order tracking through integration with a custom REST API backend.

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-DOM-CA4245?style=for-the-badge&logo=reactrouter)

</div>

<br/>

---

# Overview

Ecommerce Frontend is a React single-page application designed for an online shopping experience.

The application provides a complete customer workflow:

- User authentication
- Product discovery
- Product details
- Shopping cart management
- Checkout
- Order tracking
- User profile management

The frontend communicates with a custom Express.js backend through REST APIs and manages application state using React Context API.

---

# 🏗️ Application Architecture

The application follows a component-based React architecture.

```
                 React Application

                        |
        +---------------+---------------+
        |                               |
        v                               v

 Authentication Context          Cart Context

        |                               |

        +---------------+---------------+

                        |

                        v

              React Router Pages

                        |

                        v

              Reusable Components

                        |

                        v

              REST API Backend

                        |

                        v

                    MongoDB
```

---

# ✨ Features

## 🔐 Authentication System

The application supports user authentication through JWT-based sessions.

Features:

- User registration
- User login
- JWT token storage
- Persistent authentication state
- Logout functionality
- Google OAuth callback handling
- Role-based UI access

Authentication flow:

```
Login/Register

        |

        v

Backend Authentication

        |

        v

JWT Token Generated

        |

        v

Token Stored Locally

        |

        v

Authenticated User Session
```

---

# 🛍️ Product Management

Users can browse and interact with available products.

Features:

- Product listing
- Product detail pages
- Product cards
- Category filtering
- Search functionality
- Product image display
- Admin product creation
- Admin product editing
- Admin product deletion

---

# 🛒 Shopping Cart

The cart system provides complete shopping functionality.

Features:

- Add products to cart
- View cart items
- Increase/decrease quantity
- Remove products
- Cart count indicator
- Backend synchronized cart storage

Cart architecture:

```
Product

   |

   v

Cart Context

   |

   v

Cart Component

   |

   v

Backend Cart API
```

---

# 📦 Order System

The frontend supports the complete order workflow.

Features:

- Checkout page
- Order placement
- Order details
- Order history
- User order tracking

Order flow:

```
Cart

 |

 v

Checkout

 |

 v

Create Order

 |

 v

Order History
```

---

# 🎨 User Interface

The application provides a responsive and interactive user experience.

Implemented:

- Responsive layouts
- Dark themed interface
- Loading states
- Error handling
- Toast notifications
- Hover effects
- Skeleton loading animations
- Mobile-friendly navigation

---

# 🛠️ Technology Stack

| Category | Technology |
|-|-|
| Framework | React 19 |
| Build Tool | Vite |
| Language | JavaScript |
| Routing | React Router DOM |
| Styling | Tailwind CSS 4 |
| State Management | React Context API |
| API Communication | Fetch API |
| Authentication | JWT |
| Icons | React Icons, Lucide React |
| Notifications | React Hot Toast |

---

# 📁 Project Structure

```
EcomFront

├── public
│
├── src
│
│── components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── ProductDetail.jsx
│   ├── CartItem.jsx
│   └── CheckoutItem.jsx
│
│── Pages
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Cart.jsx
│   ├── Profile.jsx
│   ├── OrderDetails.jsx
│   ├── UserOrders.jsx
│   ├── AddProduct.jsx
│   └── UpdateProduct.jsx
│
│── context
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
│── lib
│   ├── utils.js
│   └── pricing.js
│
├── App.jsx
├── main.jsx
├── index.css
└── package.json
```

---

# 🧩 Component Architecture

The application uses reusable components to keep the UI modular.

Structure:

```
App

├── Navbar

├── Pages

│
├── Home

│    ├── HeroSection

│    └── ProductList

│            └── ProductCard


├── Products

│    └── ProductList


├── Cart

│    └── CartItem


└── Footer
```

Main components:

### Navbar

Handles:

- Navigation
- Authentication state
- Cart indicator
- User actions


### ProductCard

Handles:

- Product display
- Product information
- Add-to-cart actions


### ProductDetail

Handles:

- Detailed product information
- Individual product actions


### CartItem

Handles:

- Quantity updates
- Removing items

---

# 🔌 API Integration

The frontend communicates with the backend using REST APIs.

Authentication:

```
POST /api/auth/register

POST /api/auth/login
```

Products:

```
GET    /api/products

GET    /api/products/:id

POST   /api/products

PUT    /api/products/:id

DELETE /api/products/:id
```

Cart:

```
GET    /api/cart

POST   /api/cart

PUT    /api/cart

DELETE /api/cart
```

Orders:

```
POST /api/order

GET  /api/order
```

API communication:

- Fetch API is used for requests
- JWT tokens are attached through Authorization headers
- Backend responses update React state

---

# 🌐 Routing Structure

| Route | Purpose |
|-|-|
| `/` | Login page |
| `/register` | User registration |
| `/home` | Home page |
| `/products` | Product catalog |
| `/products/:id` | Product details |
| `/cart` | Shopping cart |
| `/order-details` | Checkout |
| `/MyOrders` | Order history |
| `/profile` | User profile |
| `/add-product` | Create product |
| `/products/:id/edit` | Update product |
| `/auth/callback` | Google OAuth callback |

---

# 🧠 State Management

Global application state is handled using React Context API.

## Authentication Context

Responsible for:

- Current user information
- JWT restoration
- Authentication persistence

---

## Cart Context

Responsible for:

- Cart items
- Cart count
- Add/remove/update operations
- Backend cart synchronization

---

# 🚀 Installation & Setup

## Requirements

- Node.js
- npm

---

## Clone Repository

```bash
git clone <repository-url>

cd EcomFront
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
VITE_USD_TO_PKR=
VITE_PAK_MARKET_FACTOR=
VITE_PAK_ROUND_TO=
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build Production Version

```bash
npm run build
```

---

# 🔮 Future Improvements

Possible improvements:

- Add centralized API service layer
- Implement protected route wrapper
- Add payment gateway integration
- Add product reviews and ratings
- Improve advanced filtering
- Add automated testing
- Deploy frontend with production backend

---

# 📚 Concepts Demonstrated

This project demonstrates:

- React component architecture
- SPA development
- Client-side routing
- Context-based state management
- REST API integration
- JWT authentication flow
- Responsive UI development
- Frontend-backend communication

---

<div align="center">

## Author

**Haziq Imran**

Computer Science Student @ University of Management and Technology

<br/>

Building software systems through practical projects.

</div>
