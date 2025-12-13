import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

interface CatIdItem {
    date: string;
  acf: {
    cat_name: string;
    address: string;
    food_favs: string;
    cat_pic: string;
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

const Tab1: React.FC = () => {
  const [dataset, setDataset] = useState<CatIdItem[]>([]);
  const dataURL = "https://dev-cs-5513-fall-2025-w12.pantheonsite.io/wp-json/wp/v2/catid?acf_format=standard";
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
          <IonTitle>My Cat Neighbors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList id="cat-list">
          {/* <IonListHeader>My Cat Neighbors</IonListHeader>   */}
          {dataset.map((item, index) => (
            <IonItem lines="inset" key={index}>
              <IonLabel id="cat-label">
                <h1>{item.acf.cat_name}</h1>
                <p>{formatDate(item.date)}</p>                
                <p><strong>Address: </strong>{item.acf.address}</p>
                <p><strong>Favorite Food: </strong>{item.acf.food_favs}</p>
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

export default Tab1;


