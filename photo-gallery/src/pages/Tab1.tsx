// Import Ionic React components for building the UI (content area, header, page structure, title, toolbar, list, list header, item, and label)
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
// Import React hooks: useState for managing component state and useEffect for side effects
import React, { useState, useEffect } from 'react';
// Commented out import for ExploreContainer component (not currently used)
//import ExploreContainer from '../components/ExploreContainer';
// Import CSS stylesheet for Tab1 component styling
import './Tab1.css';

// Define TypeScript interface for cat identification items from the API
interface CatIdItem {
    // Date string property for when the cat data was created/updated
    date: string;
  // Advanced Custom Fields (ACF) object containing additional cat information
  acf: {
    // Cat's name
    cat_name: string;
    // Cat's address/location
    address: string;
    // Cat's favorite foods
    food_favs: string;
    // URL or path to the cat's picture
    cat_pic: string;
  };
}

// Function to format a date string into a more readable format
const formatDate = (dateString: string) => {
  // Convert the date string into a JavaScript Date object
  const date = new Date(dateString);
  // Return the date formatted as a localized string (e.g., "January 15, 2025")
  return date.toLocaleDateString('en-US', { 
    // Include the full year (e.g., 2025)
    year: 'numeric', 
    // Include the full month name (e.g., January)
    month: 'long', 
    // Include the day of the month (e.g., 15)
    day: 'numeric' 
  });
};

// Define the Tab1 functional component with TypeScript type annotation
const Tab1: React.FC = () => {
  // Initialize state for dataset array, typed as CatIdItem array, starting with empty array
  const [dataset, setDataset] = useState<CatIdItem[]>([]);
  // Define the API endpoint URL for fetching cat identification data
  const dataURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catid?acf_format=standard";
  // useEffect hook runs after component mounts to fetch data from API
  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(dataURL)
      // Convert the response to JSON format
      .then(response => response.json())
      // Update the dataset state with the fetched data
      .then(data => setDataset(data))
      // Handle any errors that occur during the fetch operation
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array means this effect runs only once on mount
  // Log the dataset to console for debugging purposes
  console.log(dataset);

  // Return the JSX structure for rendering the component
  // Ionic page wrapper component that provides the page structure
  return (
    <IonPage>
      {/* Ionic header component for the page header */}
      <IonHeader>
        {/* Ionic toolbar component that contains the header content */}
        <IonToolbar>
          {/* Ionic title component displaying "My Cat Neighbors" in the header */}
          <IonTitle>My Cat Neighbors</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Ionic content component with fullscreen prop to take up full screen height */}
      <IonContent fullscreen>
        {/* Ionic list component with id "cat-list" for styling/identification */}
        <IonList id="cat-list">
          {/* Commented out list header (not currently displayed) */}
          {/* <IonListHeader>My Cat Neighbors</IonListHeader>   */}
          {/* Map over each item in the dataset array to render cat information */}
          {/* Ionic item component with inset lines styling, using index as React key */}
          {dataset.map((item, index) => (
            <IonItem lines="inset" key={index}>
              {/* Ionic label component with id "cat-label" containing the cat details */}
              <IonLabel id="cat-label">
                {/* Heading displaying the cat's name */}
                <h1>{item.acf.cat_name}</h1>
                {/* Paragraph displaying the formatted date */}
                <p>{formatDate(item.date)}</p>                
                {/* Paragraph displaying the cat's address with bold label */}
                <p><strong>Address: </strong>{item.acf.address}</p>
                {/* Paragraph displaying the cat's favorite foods with bold label */}
                <p><strong>Favorite Food: </strong>{item.acf.food_favs}</p>
                {/* Image element displaying the cat's picture with source URL and alt text */}
                <img
                src={item.acf.cat_pic}
                alt={item.acf.cat_name}
                />                      
              </IonLabel>
            </IonItem>  
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

// Export the Tab1 component as the default export for use in other files
export default Tab1;


