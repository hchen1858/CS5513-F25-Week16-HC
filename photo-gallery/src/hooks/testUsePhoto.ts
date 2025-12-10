
// usePhotoGallery.ts
// Ionic React + Capacitor: robust photo capture with safe web fallback.
// Fixes errors like: "Cannot read properties of undefined (reading '$instanceValues$')"
// by avoiding premature property sets on pwa-camera-modal.

import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export type UserPhoto = {
  id: string;
  /** Base64 data URL (works for web and native). */
  dataUrl: string;
};

function getPlatform() {
  // 'ios' | 'android' | 'web'
  return Capacitor.getPlatform();
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Create a hidden <input type="file"> as a safe fallback on web
  useEffect(() => {
    if (fileInputRef.current) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // hint to use rear camera on mobile browsers
    input.style.display = 'none';
    document.body.appendChild(input);
    fileInputRef.current = input;

    const onChange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const dataUrl = await readFileAsDataUrl(file);
      setPhotos(p => [{ id: `${Date.now()}`, dataUrl }, ...p]);
      input.value = ''; // reset
    };

    input.addEventListener('change', onChange);
    return () => {
      input.removeEventListener('change', onChange);
      input.remove();
    };
  }, []);

  const ensurePermissions = useCallback(async () => {
    try {
      const perms = await Camera.checkPermissions();
      if (perms.camera !== 'granted' || perms.photos !== 'granted') {
        await Camera.requestPermissions({ permissions: ['camera', 'photos'] });
      }
    } catch {
      // Some browsers/platforms may throw here; ignore and rely on fallback.
    }
  }, []);

  const takePhoto = useCallback(async () => {
    const platform = getPlatform();

    try {
      await ensurePermissions();

      // To avoid pwa-camera-modal issues on web, prefer file input fallback.
      const useFileInputOnWeb = true;

      if (platform === 'web' && useFileInputOnWeb) {
        fileInputRef.current?.click();
        return;
      }

      const photo = await Camera.getPhoto({
        // Using DataUrl simplifies storage/rendering across platforms
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90,
        // IMPORTANT: do not set "facingMode" directly here.
        // If you want rear camera, use direction when supported:
        // direction: 'rear',
        // Force file input fallback for extra safety on web:
        webUseInput: platform === 'web' ? true : false,
      });

      if (!photo?.dataUrl) {
        // If Camera returns without dataUrl on web, fallback to input
        if (platform === 'web') {
          fileInputRef.current?.click();
          return;
        }
        throw new Error('Failed to capture photo.');
      }

      setPhotos(p => [{ id: `${Date.now()}`, dataUrl: photo.dataUrl }, ...p]);
    } catch (err) {
      // Last-chance fallback on web
      if (getPlatform() === 'web') {
        fileInputRef.current?.click();
        return;
      }
      console.error('takePhoto error', err);
      throw err;
    }
  }, [ensurePermissions]);

  return {
    photos,
    takePhoto,
  };
}

// Helpers
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
