// // import React, { useState } from 'react';
// // import { useSprings, animated } from 'react-spring';
// // import { useSwipeable } from 'react-swipeable';
// // import './dash.css';
// // import Sidebar from './slidebar';

// // const MatchPage = () => {
// //   const [cards] = useState([
// //     {
// //       img: 'https://images.pexels.com/photos/3930029/pexels-photo-3930029.jpeg?cs=srgb&dl=pexels-yogendras31-3930029.jpg&fm=jpg',
// //       name: 'Aditya K.',
// //       age: 19,
// //       description: 'Love Mountains',
// //     },
// //     {
// //       img: 'https://picsum.photos/seed/192/600',
// //       name: 'Tejas',
// //       age: 18,
// //       description: 'Budget Friendly trips..',
// //     },
// //     {
// //       img: 'https://images.pexels.com/photos/15684227/pexels-photo-15684227/free-photo-of-man-with-mustache-standing-in-a-train-doorway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
// //       name: 'Tejas',
// //       age: 18,
// //       description: 'Budget Friendly trips..',
// //     },
// //     {
// //       img: 'https://picsum.photos/seed/899/600',
// //       name: 'Aditya K.',
// //       age: 19,
// //       description: 'Love Mountains',
// //     },
// //   ]);

// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [gone] = useState(new Set());

// //   const [springs, api] = useSprings(cards.length, (i) => ({
// //     x: 0,
// //     opacity: 1,
// //     scale: 1,
// //     rotate: 0,
// //     immediate: false,
// //   }));

// //   const handleSwipe = (direction) => {
// //     gone.add(currentIndex);
// //     setCurrentIndex(currentIndex + 1);
// //     api.start((index) => {
// //       if (index === currentIndex) {
// //         return {
// //           x: direction === 'right' ? 1000 : -1000,
// //           opacity: 0,
// //           scale: 0.8,
// //           rotate: direction === 'right' ? 15 : -15,
// //         };
// //       }
// //       return {};
// //     });
// //   };

// //   const handlers = useSwipeable({
// //     onSwipedLeft: () => handleSwipe('left'),
// //     onSwipedRight: () => handleSwipe('right'),
// //     preventDefaultTouchmoveEvent: true,
// //   });

// //   return (
// //     // <div className="match-page">
// //     //     <div className="header">
// //     //     <button className="drawer-toggle" onClick={() => setDrawerOpen(!drawerOpen)}>
// //     //       {drawerOpen ? '✖' : '☰'}
// //     //     </button>
// //     //     <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
// //     //       {showFilter ? 'Hide Filters' : 'Show Filters'}
// //     //     </button>
// //     //   </div>

// //     //   <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
// //     //     <div className="side-nav">Navigation Menu</div>
// //     //   </div>

// //     //   {showFilter && <div className="filter-section">Filter Options Here</div>}

// //     //   <div className="card-container" {...handlers}>
// //     //     {springs.map((styles, index) => {
// //     //       const card = cards[index];
// //     //       if (gone.has(index)) return null;

// //     //       return (
// //     //         <animated.div
// //     //           key={index}
// //     //           className="card"
// //     //           style={{
// //     //             transform: styles.x.interpolate((x) => `translateX(${x}px)`) + styles.rotate.interpolate((r) => `rotate(${r}deg)`),
// //     //             opacity: styles.opacity,
// //     //             scale: styles.scale,
// //     //           }}
// //     //         >
// //     //           <img src={card.img} alt="profile" />
// //     //           <div className="card-info">
// //     //             <p className="card-name">
// //     //               {card.name}
// //     //               <br />
// //     //               {card.age}
// //     //               <br />
// //     //               {card.description}
// //     //             </p>
// //     //           </div>
// //     //         </animated.div>
// //     //       );
// //     //     })}
// //     //   </div>
// //     // </div>
// //     <div>
// //     <Sidebar />
// //     <main style={{ marginLeft: "250px", padding: "20px" }}>
// //       <h1>Welcome to the App</h1>
// //       <p>This is your main content area.</p>
// //     </main>
// //   </div>
// //   );
// // };

// // export default MatchPage;


// import React, { useState } from "react";
// import { FaHome, FaInbox, FaCalendar, FaSearch, FaCog, FaBars } from "react-icons/fa";
// import "./dash.css";
// import SideNav from "./slidebar";

// const menuItems = [
//   { title: "Home", url: "#", icon: <FaHome /> },
//   { title: "Inbox", url: "#", icon: <FaInbox /> },
//   { title: "Calendar", url: "#", icon: <FaCalendar /> },
//   { title: "Search", url: "#", icon: <FaSearch /> },
//   { title: "Settings", url: "#", icon: <FaCog /> },
// ];

// const Dashboard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const cards = ["Destination A", "Destination B", "Destination C", "Destination D"];

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar
//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
//           <FaBars />
//         </button>
//         <ul className="sidebar-menu">
//           {menuItems.map((item, index) => (
//             <li key={index} className="sidebar-item">
//               <a href={item.url} className="sidebar-link">
//                 {item.icon} <span className="sidebar-text">{item.title}</span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//        */}

//        <SideNav/>
//       {/* Main Content */}
//       <div className="main-content">
//         <h2>Dashboard</h2>
//         <div className="card-container">
//           {cards.map((name, index) => (
//             <div key={index} className="card">
//               <img src={`https://source.unsplash.com/300x400/?travel&sig=${index}`} alt={name} />
//               <div className="card-info">
//                 <p className="card-name">{name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState } from "react";
import "./dash.css";

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dash-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li className="sidebar-item">Home</li>
          <li className="sidebar-item">Inbox</li>
          <li className="sidebar-item">Calendar</li>
          <li className="sidebar-item">Search</li>
          <li className="sidebar-item">Settings</li>
        </ul>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h2 className="hero-text">
          "One Hub for All Your Home Service Needs!"
        </h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for services..."
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/17287/17287005.png"
            alt="User Icon"
            className="profile-icon"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/7710/7710488.png"
            alt="Sidebar Icon"
            className="sidebar-icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>

      {/* Popular Services Section */}
      <h3 className="section-title">Popular Services</h3>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="image-container">
              <img
                src={service.image}
                alt={service.name}
                className="service-image"
              />
            </div>
            <div className="service-info">
              <h4 className="service-title">{service.name}</h4>
              <p className="service-description">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sample services data
const services = [
  {
    name: "Electricians",
    description: "Professional electrical services",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/8/332297137/MG/MO/VY/41045831/home-electrical-repair-maintenance-1000x1000.webp",
  },
  {
    name: "Plumbers",
    description: "Expert plumbing solutions",
    image:
      "https://c7.alamy.com/comp/HPK118/plumber-doing-maintenance-jobs-for-water-and-heating-systems-HPK118.jpg",
  },
  {
    name: "House Maids",
    description: "Professional cleaning services",
    image:
      "https://nepalcleaningsolution.com/wp-content/uploads/2023/01/about-us-1000x675.jpg",
  },
  {
    name: "Carpenters",
    description: "Expert woodwork & repairs",
    image:
      "https://images.unsplash.com/photo-1610264146566-c233419fb1c7?w=500&h=500",
  },
  {
    name: "Painters",
    description: "Quality painting services",
    image:
      "https://thumbs.dreamstime.com/z/professional-house-painter-work-painting-wall-caucasian-house-painter-worker-white-work-overalls-roller-139299830.jpg",
  },
  {
    name: "Home Tutors",
    description: "Personalized Learning",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5AcAIRCYFLm4SLR-ywgA_wKApuAD-NTI80Q&s",
  },
];

export default Dash;
