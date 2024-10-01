import ComboBox from "@/components/dashboards/combobox/ComboBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserButton from "@/components/user-button/UserButton";
import { useFilter } from "@/contexts/FilterContext";
import { getAllCategoriessService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom";

const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
    } = useFilter();

    const [categories, setCategories] = useState([]);

    const { data: categoryData, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategoriessService,
        onError: (error) => {
            console.log("Fetching categories failed", error);
        },
    });

    const mappedCategories = useMemo(() => categories.map(option => ({ label: option?.name, value: option?._id })), [categories]);

    useEffect(() => {
        if (!isCategoriesLoading) {
            setCategories(categoryData);
        }
    }, [categoryData, isCategoriesLoading]);


    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    }

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    }

    const handleResetFilters = () => {
        setSearchQuery("")
        setSelectedCategory("")
        setMinPrice(undefined)
        setMaxPrice(undefined)
    }


    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-cream shadow-sm">
            <div className="p-6 ">
                <Link to="/">
                    <img
                        src="/images/LOGO.png"
                        alt="LOGO"
                        className='w-[130px]'
                    />
                </Link>
            </div>

            <section className="p-4 pt-0">
                <Input
                    type="text"
                    className="bg-white shadow"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex gap-x-2 mt-2 justify-center items-center">
                    <Input
                        type="text"
                        className="bg-white shadow"
                        placeholder="Min"
                        value={minPrice ?? ""}
                        onChange={handleMinPriceChange}
                    />
                    <Input
                        type="text"
                        className="bg-white shadow"
                        placeholder="Max"
                        value={maxPrice ?? ""}
                        onChange={handleMaxPriceChange}
                    />
                </div>

                <div className="mb-5 mt-3">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <ComboBox
                        options={mappedCategories}
                        value={selectedCategory}
                        onChange={(value) => {
                            console.log(value);
                            setSelectedCategory(value)
                        }}
                    />

                </div>


                <Button onClick={handleResetFilters} className="w-full" >Reset Filters</Button>
            </section>

            <div className="p-4 mt-auto justify-end">
                <UserButton btnClass="w-full justify-start" variant="default" />
            </div>
        </div>
    )
}

export default Sidebar