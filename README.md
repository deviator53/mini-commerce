# Mini-Commerce

## Project Overview

Mini-Commerce is a tiny, modern e-commerce prototype built with Next.js (App Router), React Query, and Zustand. It allows users to browse a catalogue of products, view product details, manage a persistent cart, and complete a mock checkout flow. All state (cart, currency, products) persists across reloads using localStorage.

## Features

- **Home Page (Catalogue):** Displays a grid of products for browsing. On first visit, products are seeded into localStorage, so there may be a brief delay before products appear (especially in production) due to client-side persistence.
- **Currency Dropdown:** Instantly view product prices in USD, NGN, or EUR using the currency selector in the header. Prices update everywhere in the app.
- **Cart:** View all items added to your cart, adjust quantities, remove items, and see the running total. Cart state is persistent across reloads.
- **Checkout:** Review your order summary and place a mock order. The cart is cleared after checkout, and a thank you page is shown.
- **Single Product Page:** Click any product to view its details, including a large image, description, price (in selected currency), and an Add to Cart button.

## Design Approach

- **Layout:** Clean, centered layouts with a prominent hero section, product grid, and modern product detail pages inspired by real e-commerce UIs.
- **Color:** Uses a blue/white palette for trust and clarity
- **Responsiveness:** All pages are mobile-friendly using Tailwind CSS utility classes. Grids and flex layouts adapt to screen size.
- **Navigation:** Sticky header with navigation, cart badge, and currency selector for easy access.
- **404 Handling:** Custom not-found page for unknown routes.

## Tools & Techniques

- **Framework:** Next.js (App Router, TypeScript)
- **State Management:** Zustand (cart, currency)
- **Data Fetching:** React Query (products from localStorage)
- **Styling:** Tailwind CSS
- **Testing:** Manual testing (no automated tests in this prototype)
- **Patterns:** Hooks for formatting, modular components, separation of concerns, and localStorage persistence.

## SEO Strategy

- **Meta Tags:** Uses Next.js metadata for title and description.
- **Performance:** Optimized images (local or CDN), minimal JS bundle, and fast client-side navigation.
- **Accessibility:** Semantic HTML, alt text for images, focus states, and ARIA labels where appropriate.

## Error-Handling Technique

- **404s:** Custom `not-found.tsx` page for unknown routes.
- **Data Fetching:** Handles missing products gracefully with fallback UI.
- **Cart/Checkout:** Prevents actions on empty cart, disables invalid actions.
- **Image Loading:** Uses alt text and fallback messaging for missing images.
- **Logging:** No external logging; errors are surfaced to the user via UI messages.
- **Recovery:** Users are guided back to the homepage or can retry actions.
