const useURLSearchParams = (locationSearch: string): any => {
  if (locationSearch.startsWith('?')) {
    locationSearch = locationSearch.substring(1);
  }
  const parts = locationSearch.split('&');
  return Object.fromEntries(parts.map((part) => part.split('=')));
};

export default useURLSearchParams;
