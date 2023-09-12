import React, { createContext, useState, useContext } from "react";

interface FilterContainerContextType {
  filtersSelected: Array<string | any>;
  filtersSelecting: string[];
  handlerAddFilterSelectingCenter: (filterName: string) => void;
  handlerRemoveFilterSelectingCenter: (filterName: string) => void;
  handlerAddFilterSelectedCenter: (filterNames: Array<string> | any) => void;
  handlerRemoveFilterSelectedCenter: (filterName: string | any) => void;
  handlerRemoveAllFilterSelected: () => void;
  handlerRemoveAllFilterSelecting: () => void;
}

const initializeFilterContainer: FilterContainerContextType = {
  filtersSelected: [],
  filtersSelecting: [],
  handlerAddFilterSelectingCenter: () => {},
  handlerRemoveFilterSelectingCenter: () => {},
  handlerAddFilterSelectedCenter: () => {},
  handlerRemoveFilterSelectedCenter: () => {},
  handlerRemoveAllFilterSelected: () => {},
  handlerRemoveAllFilterSelecting: () => {},
};

const FilterContext = createContext(initializeFilterContainer);

export default function FilterProvider({ children }) {
  const [filtersSelecting, setFiltersSelecting] = useState<Array<string>>([]);
  const [filtersSelected, setFiltersSelected] = useState<Array<string | any>>(
    []
  );

  const handlerAddFilterSelectingCenter = (filterName: string) => {
    setFiltersSelecting((filtersSelecting) => [
      ...filtersSelecting,
      filterName,
    ]);
  };

  const handlerRemoveFilterSelectingCenter = (filterName: string) => {
    setFiltersSelecting((filtersSelecting) =>
      filtersSelecting.filter((item) => item !== filterName)
    );
  };

  const handlerAddFilterSelectedCenter = (filterNames: Array<string> | any) => {
    if (Array.isArray(filterNames)) {
      const filterNamesAdd = filtersSelecting.filter(
        (filter) => !filtersSelected.includes(filter)
      );
      setFiltersSelected((filtersSelected) => [
        ...filtersSelected,
        ...filterNamesAdd,
      ]);
    } else {
      const hasFilterPrice = filtersSelected.find(
        (item) => typeof item === "object"
      );
      if (!hasFilterPrice)
        setFiltersSelected((filtersSelected) => [
          ...filtersSelected,
          filterNames,
        ]);
    }
  };

  const handlerRemoveFilterSelectedCenter = (filterName: string | any) => {
    console.log("filterName:::", filterName);
    setFiltersSelected((filtersSelected: Array<string | any>) =>
      filtersSelected.filter((item: string | any) => {
        if (typeof filterName === "string") return item !== filterName;
        else return typeof item !== typeof filterName;
      })
    );
    setFiltersSelecting((filtersSelecting: Array<string | any>) =>
      filtersSelecting.filter((item: string) => item !== (filterName as string))
    );
  };

  const handlerRemoveAllFilterSelected = () => setFiltersSelected([]);
  const handlerRemoveAllFilterSelecting = () => setFiltersSelecting([]);

  const value = {
    filtersSelected,
    filtersSelecting,
    handlerAddFilterSelectedCenter,
    handlerRemoveFilterSelectedCenter,
    handlerAddFilterSelectingCenter,
    handlerRemoveFilterSelectingCenter,
    handlerRemoveAllFilterSelected,
    handlerRemoveAllFilterSelecting,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
function useFilter() {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("Filter context was used outside the FilterProvider");
  return context;
}

export { useFilter };
