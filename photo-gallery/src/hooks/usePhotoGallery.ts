// Import React hooks: useState for managing component state and useEffect for side effects
import { useState, useEffect } from "react";
// Import isPlatform utility function from Ionic React to detect the current platform
import { isPlatform } from '@ionic/react';


// Import Camera API, result types, source types, and Photo interface from Capacitor Camera plugin
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
// Import Filesystem API and Directory enum from Capacitor Filesystem plugin for file operations
import { Filesystem, Directory } from '@capacitor/filesystem';
// Import Preferences API from Capacitor Preferences plugin for storing key-value data
import { Preferences } from '@capacitor/preferences';
// Import Capacitor core utilities for platform detection and file path conversion
import { Capacitor } from '@capacitor/core';

// Constant string key used for storing photos in Preferences storage
const PHOTO_STORAGE = 'photos';
// Export the main custom hook function for managing photo gallery functionality
export function usePhotoGallery() {

  // Initialize state for photos array, typed as UserPhoto array, starting with empty array
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  // useEffect hook runs after component mounts to load saved photos from storage
  useEffect(() => {
    // Define async function to load previously saved photos from Preferences
    const loadSaved = async () => {
      // Retrieve the stored photos data from Preferences using the PHOTO_STORAGE key
      const { value } = await Preferences.get({key: PHOTO_STORAGE });

      // Parse the JSON string value into UserPhoto array, or use empty array if no value exists
      const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];
      // If running on the web platform (not hybrid/native)...
      if (!isPlatform('hybrid')) {
        // Loop through each photo in the preferences array
        for (let photo of photosInPreferences) {
          // Read the photo file from the filesystem using the stored filepath
          const file = await Filesystem.readFile({
            // Path to the photo file stored in the filesystem
            path: photo.filepath,
            // Directory where the file is stored (Data directory)
            directory: Directory.Data
          });
          // Web platform only: Load the photo as base64 data URL for display in webview
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      // Update the photos state with the loaded photos from preferences
      setPhotos(photosInPreferences);
    };
    // Call the loadSaved function to load photos when component mounts
    loadSaved();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Async function to add a new photo to the gallery by taking a picture with the camera
  const addNewToGallery = async () => {
    // Capture a photo using the device camera
    const photo = await Camera.getPhoto({
      // Return the photo as a URI (file path)
      resultType: CameraResultType.Uri,
      // Use the camera as the source (not photo library)
      source: CameraSource.Camera,
      // Set image quality to maximum (100)
      quality: 100
    });
    // Generate a unique filename using current timestamp and .jpeg extension
    const fileName = new Date().getTime() + '.jpeg';
    // Save the captured photo to filesystem and get the saved photo object
    const savedFileImage = await savePicture(photo, fileName);
    // Create new photos array with the new photo at the beginning, followed by existing photos
    const newPhotos = [savedFileImage, ...photos];
    // Update the photos state with the new array
    setPhotos(newPhotos);
    // Save the updated photos array to Preferences storage as JSON string
    Preferences.set({key: PHOTO_STORAGE,value: JSON.stringify(newPhotos)});
  };

  // Async function to save a photo to the filesystem and return a UserPhoto object
  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    // Declare variable to hold base64 data, which can be either string or Blob
    let base64Data: string | Blob; 
    // Check if running on hybrid platform (Cordova or Capacitor native app)
    if (isPlatform('hybrid')) {
      // Read the photo file from the filesystem using the photo's path
      const file = await Filesystem.readFile({
        // Path to the photo file (non-null assertion since hybrid platform provides path)
        path: photo.path!
      });
      // Store the file data as base64Data
      base64Data = file.data;
    } else {
      // For web platform: convert the web path to base64 data
      base64Data = await base64FromPath(photo.webPath!);
    }
    // Write the photo data to the filesystem
    const savedFile = await Filesystem.writeFile({
      // Filename to save the photo as
      path: fileName,
      // Base64 data to write to the file
      data: base64Data,
      // Directory to save the file in (Data directory)
      directory: Directory.Data
    });

    // Check if running on hybrid platform for path conversion
    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        // Return the saved file URI as the filepath
        filepath: savedFile.uri,
        // Convert the file URI to a webview-compatible path using Capacitor
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        // Return the filename as the filepath
        filepath: fileName,
        // Use the original web path for display (already in memory)
        webviewPath: photo.webPath
      };
    }
  };

  // Async function to delete a photo from the gallery and filesystem
  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array by filtering out matching filepath
    const newPhotos = photos.filter(p => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array in Preferences
    Preferences.set({key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // Extract the filename from the full filepath by finding the last '/' and taking everything after it
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    // Delete the photo file from the filesystem
    await Filesystem.deleteFile({
      // Filename to delete
      path: filename,
      // Directory where the file is stored (Data directory)
      directory: Directory.Data
    });
    // Update the photos state with the filtered array (photo removed)
    setPhotos(newPhotos);
  };

  // Return an object containing the hook's public API: deletePhoto function, photos array, and addNewToGallery function
  return {
    // Function to delete a photo from the gallery
    deletePhoto,
    // Array of UserPhoto objects representing all photos in the gallery
    photos,
    // Function to add a new photo to the gallery by taking a picture
    addNewToGallery
  };
}

// Export TypeScript interface defining the structure of a UserPhoto object
export interface UserPhoto {
  // File path where the photo is stored in the filesystem
  filepath: string;
  // Optional webview path for displaying the photo in a webview (base64 data URL or converted file path)
  webviewPath?: string;
}

// Export async function to convert a file path to a base64 data URL string
export async function base64FromPath(path: string): Promise<string> {
  // Fetch the file from the given path
  const response = await fetch(path);
  // Convert the response to a Blob object
  const blob = await response.blob();
  // Return a Promise that resolves with the base64 data URL string
  return new Promise((resolve, reject) => {
    // Create a FileReader instance to read the blob as a data URL
    const reader = new FileReader();
    // Set error handler to reject the promise if reading fails
    reader.onerror = reject;
    // Set load handler to process the result when reading completes
    reader.onload = () => {
      // Check if the result is a string (base64 data URL)
      if (typeof reader.result === 'string') {
        // Resolve the promise with the base64 string result
        resolve(reader.result);
      } else {
        // Reject the promise if result is not a string (unexpected type)
        reject('method did not return a string')
      }
    };
    // Start reading the blob as a data URL (base64 encoded)
    reader.readAsDataURL(blob);
  });
}
