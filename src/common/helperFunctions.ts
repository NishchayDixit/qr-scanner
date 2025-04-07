export const generateShortCode = (url: string): string => {
  return btoa(url).substring(0, 6); 
};
