# Estate Agent Client-side Web Application

A responsive Single Page Application (SPA) built with React, MUI (Material UI), and Redux Toolkit for searching and managing property listings. This project was developed as part of the 5COSC026W Advanced Client-Side Web Development coursework.

## 🏠 Features

### Core Functionality
- **Property Search**: Search properties by:
  - Type (House, Flat, Any)
  - Price Range (Min/Max with interactive slider)
  - Bedrooms (Min/Max)
  - Date Added (Date range picker)
  - Postcode Area

- **Property Display**:
  - Grid-based responsive property cards
  - Property images, prices, and key details
  - Individual property pages with detailed information

- **Image Gallery**:
  - Main image display with 6-8 thumbnails per property
  - Lightbox view for full-screen image browsing
  - Navigation between images

- **Property Details Tabs**:
  - Long Description
  - Floor Plan
  - Google Maps integration

### Favourites System
- Add/Remove properties via button click
- Drag and Drop properties to favourites
- Duplicate prevention
- Persistent storage (localStorage)
- Clear all favourites option

### Responsive Design
- Mobile-first approach
- Two layouts: Large screens and Tablet/Mobile
- CSS Grid and Flexbox
- Hand-written media queries

### Security
- Content Security Policy (CSP)
- HTML encoding via React's JSX
- X-Content-Type-Options header
- X-Frame-Options protection

## 🛠️ Technologies Used

- **React 19** - UI Framework
- **Vite** - Build Tool
- **Material UI (MUI)** - Component Library
- **Redux Toolkit** - State Management
- **React Router DOM** - Routing
- **@dnd-kit** - Drag and Drop
- **Day.js** - Date Handling
- **Jest** - Testing Framework

## 📁 Project Structure

```
estate-agent-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchForm.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyList.jsx
│   │   └── FavouritesSidebar.jsx
│   ├── pages/
│   │   ├── SearchPage.jsx
│   │   └── PropertyPage.jsx
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── propertiesSlice.js
│   │       ├── favouritesSlice.js
│   │       └── searchSlice.js
│   ├── data/
│   │   └── properties.json
│   ├── theme/
│   │   └── theme.js
│   ├── tests/
│   │   ├── setupTests.js
│   │   ├── favouritesSlice.test.js
│   │   ├── propertiesSlice.test.js
│   │   ├── searchSlice.test.js
│   │   ├── searchFunctionality.test.js
│   │   └── propertiesData.test.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── jest.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd estate-agent-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Running Tests

```bash
npm test
```

For test coverage:
```bash
npm run test:coverage
```

## 📊 JSON Data Structure

The application uses 7 properties with the following structure:
```json
{
  "id": "prop1",
  "type": "house",
  "bedrooms": 4,
  "price": 850000,
  "tenure": "Freehold",
  "description": "Short description",
  "longDescription": "Detailed description...",
  "location": "Bromley, BR1",
  "postcode": "BR1",
  "dateAdded": "2025-11-15",
  "mainImage": "url",
  "images": ["url1", "url2", ...],
  "floorPlan": "url",
  "coordinates": { "lat": 51.4039, "lng": 0.0198 }
}
```

## 🧪 Testing

The project includes 41+ tests covering:
- Redux slice functionality (favourites, properties, search)
- Search filtering logic
- JSON data validation
- Duplicate prevention in favourites

## 📱 Responsive Breakpoints

- **Large screens**: > 1024px (Desktop layout)
- **Tablet/Mobile**: < 1024px (Collapsed layout)

## 🔒 Security Measures

1. **Content Security Policy (CSP)**: Restricts resource loading
2. **JSX Encoding**: Automatic HTML encoding by React
3. **X-Content-Type-Options**: Prevents MIME sniffing
4. **X-Frame-Options**: Clickjacking protection

## 📝 License

This project is part of academic coursework for the University of Westminster.

## 👤 Author

5COSC026W Advanced Client-Side Web Development Coursework 2025/26
