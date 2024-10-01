import { createContext, useContext, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce';

const FilterContext = createContext(undefined);

export const FilterProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);
    const [brand, setBrand] = useState("");

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    return (
        <FilterContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                debouncedSearchQuery,
                selectedCategory,
                setSelectedCategory,
                minPrice,
                setMinPrice,
                maxPrice,
                setMaxPrice,
                brand,
                setBrand,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}


export const useFilter = () => {
    const context = useContext(FilterContext);

    if(context === undefined){
        throw new Error("useFilter must be used within FilterContext.");
    }
    return context;
}