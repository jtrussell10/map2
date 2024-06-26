import { useState, useEffect } from "react";

export function useCountries(searchValue) {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [sortedFilteredCountries, setSortedFilteredCountries] = useState([]);

  // Fetch and sort all countries initially
  useEffect(() => {
    fetch("/countries.json")
      .then((response) => response.json())
      .then((data) => {
 
        setAllCountries(data.sort((a, b) => a.localeCompare(b)));
      });
  }, []);


  // Filter countries based on searchValue
  useEffect(() => {
    const result = allCountries.filter((country) =>
      country.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredCountries(result);
  }, [searchValue, allCountries]);

  useEffect(() => {
    const priorityCountries = ["Afghanistan"];

    const sorted = filteredCountries.sort((a, b) => {
      const aPriority = priorityCountries.indexOf(a);
      const bPriority = priorityCountries.indexOf(b);
      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority; // Both are in priority list, sort by their position in the priority list
      } else if (aPriority !== -1) {
        return -1; // Only 'a' is in the priority list, it comes first
      } else if (bPriority !== -1) {
        return 1; // Only 'b' is in the priority list, it comes first
      }
      return a.localeCompare(b); // Fallback to alphabetical order if neither are in the priority list
    });

    setSortedFilteredCountries(sorted);
  }, [filteredCountries]);

  return { allCountries, filteredCountries, sortedFilteredCountries };
}
