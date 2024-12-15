// src/types/qrcode.d.ts
declare module 'qrcode' {
  export function toDataURL(url: string, callback: (err: Error | null, url: string) => void): void;
  export function toString(url: string, options?: any, callback?: (err: Error | null, qr: string) => void): void;
  export function toCanvas(canvas: HTMLCanvasElement, url: string, callback?: (err: Error | null) => void): void;
  // Agrega más funciones si las necesitas
}
