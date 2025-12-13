import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
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
          <IonListHeader>Cat Food Reviews</IonListHeader>  
          {dataset.map((item, index) => (
            <IonItem lines="inset" key={index}>
              <IonLabel>
                <h4>{item.acf.food_name}</h4>
                <p>{item.date}</p>                
                <p>{item.acf.food_description}</p>
                <p>{item.acf.rating}</p>
                <p>{item.acf.food_cost}</p>
                
              </IonLabel>
            </IonItem>  
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
