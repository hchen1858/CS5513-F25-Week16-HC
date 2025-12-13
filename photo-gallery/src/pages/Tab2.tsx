// Import camera icon from Ionicons icon library for use in the floating action button
import { camera } from 'ionicons/icons';
// Import Ionic React components for building the photo gallery UI (content, header, page, title, toolbar, floating action button, grid, row, column, and image components)
import {
  // Content area component that holds the main page content
  IonContent,
  // Header component for displaying page headers
  IonHeader,
  // Page wrapper component that provides the page structure
  IonPage,
  // Title component for displaying page titles
  IonTitle,
  // Toolbar component that contains header content
  IonToolbar,
  // Floating action button container component
  IonFab,
  // Floating action button component for triggering actions
  IonFabButton,
  // Icon component for displaying icons
  IonIcon,
  // Grid component for creating responsive grid layouts
  IonGrid,
  // Row component for grid rows
  IonRow,
  // Column component for grid columns
  IonCol,
  // Image component optimized for Ionic with lazy loading
  IonImg,
} from '@ionic/react';
// Import the custom hook for managing photo gallery functionality
import { usePhotoGallery } from '../hooks/usePhotoGallery';

// Define the Tab2 functional component with TypeScript type annotation
const Tab2: React.FC = () => {
  // Destructure photos array and addNewToGallery function from the usePhotoGallery hook
  const { photos, addNewToGallery } = usePhotoGallery();

  // Return the JSX structure for rendering the component
  // Ionic page wrapper component that provides the page structure
  return (
    <IonPage>
      {/* Ionic header component for the main page header */}
      <IonHeader>
        {/* Ionic toolbar component that contains the header content */}
        <IonToolbar>
          {/* Ionic title component displaying "Who's Behind the Helen the Cat Website?" in the header */}
          <IonTitle>Who's Behind the Helen the Cat Website?</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Ionic content component with fullscreen prop to take up full screen height */}
      <IonContent fullscreen>
        {/* Collapsible header that condenses when scrolling (for iOS style header behavior) */}
        <IonHeader collapse="condense">
          {/* Ionic toolbar component for the collapsible header */}
          <IonToolbar>
            {/* Ionic title component with large size for the collapsible header */}
            <IonTitle size="large">Who's Behind the Helen the Cat Website?</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Grid component to display photos in a responsive grid layout */}
        <IonGrid>
          {/* Row component to contain the photo columns */}
          <IonRow>
            {/* Map over each photo in the photos array to render individual photo columns */}
            {/* Column component taking up 6 out of 12 grid units (50% width), using filepath as unique key */}
            {photos.map((photo) => (
              <IonCol size="6" key={photo.filepath}>
                {/* Ionic image component displaying the photo using its webview path */}
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Floating action button container positioned at bottom center, fixed to viewport */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          {/* Floating action button that triggers adding a new photo to the gallery when clicked */}
          <IonFabButton onClick={() => addNewToGallery()}>
            {/* Icon component displaying the camera icon inside the button */}
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

// Export the Tab2 component as the default export for use in other files
export default Tab2;