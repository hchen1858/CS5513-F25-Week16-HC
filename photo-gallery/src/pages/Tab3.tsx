import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

interface CatFoodItem {
    date: string;
  acf: {
    food_name: string;
    food_description: string;
    rating: string;
    food_cost: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};


const Tab3: React.FC = () => {
  const [dataset, setDataset] = useState<CatFoodItem[]>([]);
  const dataURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catfood";
  useEffect(() => {
    fetch(dataURL)
      .then(response => response.json())
      .then(data => setDataset(data))
      .catch(error => console.error('Error:', error));
  }, []);
  console.log(dataset);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cat Food Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList id="food-list">
          {/* <IonListHeader>Cat Food Reviews</IonListHeader>   */}
          {dataset.map((item, index) => (
            <IonItem lines="inset" key={index}>
              <IonLabel id="food-label">
                <h1>{item.acf.food_name}</h1>
                <p>{formatDate(item.date)}</p>                
                <p><strong>Description: </strong>{item.acf.food_description}</p>
                <p><strong>Rating: </strong>{item.acf.rating}</p>
                <p><strong>Cost: </strong>{item.acf.food_cost}</p>                
              </IonLabel>
            </IonItem>  
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
