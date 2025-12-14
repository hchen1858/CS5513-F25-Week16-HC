// Import Ionic React components for building the UI (content area, header, page structure, title, toolbar, list, list header, item, and label)
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
// Import React hooks: useState for managing component state and useEffect for side effects
import React, { useState, useEffect } from 'react';
// Commented out import for ExploreContainer component (not currently used)
//import ExploreContainer from '../components/ExploreContainer';
// Import CSS stylesheet for Tab3 component styling
import './Tab3.css';

// Define TypeScript interface for cat food review items from the API
interface CatFoodItem {
    // Date string property for when the cat food review was created/updated
    date: string;
  // Advanced Custom Fields (ACF) object containing additional cat food information
  acf: {
    // Name of the cat food product
    food_name: string;
    // Description of the cat food product
    food_description: string;
    // Rating given to the cat food product
    rating: string;
    // Cost/price of the cat food product
    food_cost: string;
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


// Define the Tab3 functional component with TypeScript type annotation
const Tab3: React.FC = () => {
  // Initialize state for dataset array, typed as CatFoodItem array, starting with empty array
  const [dataset, setDataset] = useState<CatFoodItem[]>([]);
  // Define the API endpoint URL for fetching cat food review data
  const dataURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catfood";
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
          {/* Ionic title component displaying "Cat Food Reviews" in the header */}
          <IonTitle>Cat Food Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Ionic content component with fullscreen prop to take up full screen height */}
      <IonContent fullscreen>
        {/* Ionic list component with id "food-list" for styling/identification */}
        <IonList id="food-list">
          {/* Commented out list header (not currently displayed) */}
          {/* <IonListHeader>Cat Food Reviews</IonListHeader>   */}
          {/* Map over each item in the dataset array to render cat food review information */}
          {/* Ionic item component with inset lines styling, using index as React key */}
          
          {dataset.map((item, index) => (
            <IonItem lines="inset" key={index}>
              {/* Ionic label component with id "food-label" containing the cat food review details */}
              <IonLabel id="food-label">
                {/* Heading displaying the cat food name */}
                <h1>{item.acf.food_name}</h1>
                {/* Paragraph displaying the formatted date */}
                <p>{formatDate(item.date)}</p>                
                {/* Paragraph displaying the cat food description with bold label */}
                <p><strong>Description: </strong>{item.acf.food_description}</p>
                {/* Paragraph displaying the cat food rating with bold label */}
                <p><strong>Rating: </strong>{item.acf.rating}</p>
                {/* Paragraph displaying the cat food cost with bold label */}
                <p><strong>Cost: </strong>{item.acf.food_cost}</p>                
              </IonLabel>
            </IonItem>  
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

// Export the Tab3 component as the default export for use in other files
export default Tab3;
