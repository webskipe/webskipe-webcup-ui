// src/navigation.ts
let navigator: (path: string) => void;

export function setNavigator(navFn: (path: string) => void) {
  navigator = navFn;
}

export function goTo(path: string) {
  if (navigator) {
    navigator(path);
  } else {
    console.warn('Navigator not set yet');
  }
}
