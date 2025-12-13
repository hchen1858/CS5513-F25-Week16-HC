// Import Redirect and Route components from react-router-dom for routing functionality
import { Redirect, Route } from 'react-router-dom';
// Import Ionic React components for building the app structure (app container, icon, label, router outlet, tab bar, tab button, tabs, and setup function)
import {
  // Main app container component that wraps the entire Ionic application
  IonApp,
  // Icon component for displaying icons
  IonIcon,
  // Label component for displaying text labels
  IonLabel,
  // Router outlet component that renders matched routes
  IonRouterOutlet,
  // Tab bar component that contains tab buttons for navigation
  IonTabBar,
  // Tab button component for individual tabs in the tab bar
  IonTabButton,
  // Tabs component that manages tab navigation
  IonTabs,
  // Setup function to initialize Ionic React
  setupIonicReact
} from '@ionic/react';
// Import IonReactRouter component that provides routing functionality for Ionic apps
import { IonReactRouter } from '@ionic/react-router';
// Import icons from Ionicons library (images, square, and triangle icons for tab buttons)
import { images, square, triangle } from 'ionicons/icons';
// Import Tab1 component from the pages directory
import Tab1 from './pages/Tab1';
// Import Tab2 component from the pages directory
import Tab2 from './pages/Tab2';
// Import Tab3 component from the pages directory
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
// Import core CSS stylesheet that contains essential styles for Ionic components
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// Import normalize CSS to ensure consistent styling across different browsers
import '@ionic/react/css/normalize.css';
// Import structure CSS that provides basic layout and structure styles
import '@ionic/react/css/structure.css';
// Import typography CSS that provides text styling and font definitions
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// Import padding utility CSS for padding utility classes
import '@ionic/react/css/padding.css';
// Import float elements CSS for floating element utilities
import '@ionic/react/css/float-elements.css';
// Import text alignment CSS for text alignment utility classes
import '@ionic/react/css/text-alignment.css';
// Import text transformation CSS for text transformation utilities
import '@ionic/react/css/text-transformation.css';
// Import flex utilities CSS for flexbox utility classes
import '@ionic/react/css/flex-utils.css';
// Import display CSS for display utility classes
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// Commented out import for dark mode that is always enabled
/* import '@ionic/react/css/palettes/dark.always.css'; */
// Commented out import for dark mode that is enabled via CSS class
/* import '@ionic/react/css/palettes/dark.class.css'; */
// Import dark mode CSS that follows system preferences (automatically switches based on OS settings)
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
// Import custom theme variables CSS file for app-specific styling and theming
import './theme/variables.css';

// Initialize Ionic React framework (must be called before using Ionic components)
setupIonicReact();

// Define the main App functional component with TypeScript type annotation
// Ionic app container component that wraps the entire application
const App: React.FC = () => (
  <IonApp>
    {/* Ionic React Router component that provides routing functionality */}
    <IonReactRouter>
      {/* Tabs component that manages tab-based navigation */}
      <IonTabs>
        {/* Router outlet component that renders the matched route component */}
        <IonRouterOutlet>
          {/* Route definition for Tab1, matching exact path "/tab1" */}
          <Route exact path="/tab1">
            {/* Render Tab1 component when route matches */}
            <Tab1 />
          </Route>
          {/* Route definition for Tab2, matching exact path "/tab2" */}
          <Route exact path="/tab2">
            {/* Render Tab2 component when route matches */}
            <Tab2 />
          </Route>
          {/* Route definition for Tab3, matching path "/tab3" (not exact, so it matches /tab3 and sub-paths) */}
          <Route path="/tab3">
            {/* Render Tab3 component when route matches */}
            <Tab3 />
          </Route>
          {/* Route definition for root path "/", matching exact path */}
          <Route exact path="/">
            {/* Redirect to "/tab1" when root path is accessed */}
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        {/* Tab bar component positioned at the bottom of the screen */}
        <IonTabBar slot="bottom">
          {/* Tab button for Tab1, linking to "/tab1" route */}
          <IonTabButton tab="tab1" href="/tab1">
            {/* Icon component displaying triangle icon, with aria-hidden for accessibility */}
            <IonIcon aria-hidden="true" icon={triangle} />
            {/* Label component displaying "Cat IDs" text for the tab */}
            <IonLabel>Cat IDs</IonLabel>
          </IonTabButton>
          {/* Tab button for Tab2, linking to "/tab2" route */}
          <IonTabButton tab="tab2" href="/tab2">
            {/* Icon component displaying images icon, with aria-hidden for accessibility */}
            <IonIcon aria-hidden="true" icon={images} />
            {/* Label component displaying "Creator Photos" text for the tab */}
            <IonLabel>Creator Photos</IonLabel>
          </IonTabButton>
          {/* Tab button for Tab3, linking to "/tab3" route */}
          <IonTabButton tab="tab3" href="/tab3">
            {/* Icon component displaying square icon, with aria-hidden for accessibility */}
            <IonIcon aria-hidden="true" icon={square} />
            {/* Label component displaying "Cat Foods" text for the tab */}
            <IonLabel>Cat Foods</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

// Export the App component as the default export for use as the root component
export default App;
