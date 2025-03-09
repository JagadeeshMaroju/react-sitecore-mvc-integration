// src/custom.d.ts

declare global {
    interface Window {
      ReactApp: {
        renderReactComponent: (rootElement: HTMLElement, props: any) => void;
      };
    }
  }
  
  export {};
  