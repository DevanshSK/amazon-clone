import { Loader } from "@/components/loader";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useFilter } from "@/contexts/FilterContext"
import { getAllProductsService, getProductsByCategoryService } from "@/services/productService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Tally3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";


const ProductListingPage = () => {
	const { debouncedSearchQuery, selectedCategory, minPrice, maxPrice } = useFilter();
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const itemsPerPage = 12;

	const { data: productData, isLoading, isPlaceholderData } = useQuery({
		queryKey: ['products', {
			pageIndex: currentPage - 1,
			pageSize: itemsPerPage,
			categoryId: selectedCategory,
			query: debouncedSearchQuery,
		}],
		queryFn: () => selectedCategory === "" ? getAllProductsService({
			pageIndex: currentPage - 1,
			pageSize: itemsPerPage,
			categoryId: selectedCategory,
			query: debouncedSearchQuery,
		}) : getProductsByCategoryService({
			pageIndex: currentPage - 1,
			pageSize: itemsPerPage,
			categoryId: selectedCategory,
			query: debouncedSearchQuery,
		}),
		placeholderData: keepPreviousData,
		onError: (error) => {
			console.log("Fetching Products failed", error);
		},
	});

	useEffect(() => {
		if (!isPlaceholderData) {
			setProducts(productData?.products || []);
		}
	}, [isPlaceholderData, productData]);


	const getFilteredProducts = () => {
		let filteredProducts = products;

		if (minPrice !== undefined) {
			filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
		}

		if (maxPrice !== undefined) {
			filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
		}

		switch (filter) {
			case "expensive":
				return filteredProducts.sort((a, b) => b.price - a.price);
			case "cheap":
				return filteredProducts.sort((a, b) => a.price - b.price);
			default:
				return filteredProducts;
		}
	}

	const filteredProducts = useMemo(getFilteredProducts, [filter, maxPrice, minPrice, products]);
	console.table(productData);


	const handlePageChange = (page) => {
		if (page > 0 && page <= productData?.totalPages) {
			setCurrentPage(page);
		}
	}

	return (
		<Loader loading={isLoading}>
			<section
				className="lg:w-full lg:max-w-7xl sm:w-[40rem] xs:w-[20rem] p-5"
			>
				<div className="mb-5">
					<div className="flex flex-row sm:flex-row justify-between items-center">
						<div className="relative">

							<button
								className="border px-4 py-2 rounded-full flex items-center bg-white shadow"
								onClick={() => setDropdownOpen(prev => !prev)}
							>
								<Tally3 className="mr-2 " />
								{
									filter === "all" ? "Filter" : filter.charAt(0).toLowerCase() + filter.slice(1)
								}
							</button>

							{dropdownOpen && (
								<div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
									<button
										onClick={() => setFilter('all')}
										className="block px-4 py-2 w-full text-left hover:bg-gray-200"
									>
										All
									</button>
									<button
										onClick={() => setFilter('cheap')}
										className="block px-4 py-2 w-full text-left hover:bg-gray-200"
									>
										Cheap
									</button>
									<button
										onClick={() => setFilter('expensive')}
										className="block px-4 py-2 w-full text-left hover:bg-gray-200"
									>
										Expensive
									</button>

								</div>
							)}
						</div>
					</div>


					<div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
						{filteredProducts.map((product) => (
							<ProductCard key={product?._id} product={product} />
						))}
					</div>

					<div className="flex flex-col gap-2 sm:flex-row justify-start items-center mt-5">
						<Button disabled={!productData?.hasPrevPage} onClick={() => handlePageChange(currentPage - 1)} variant="outline">Previous</Button>
						<div className="flex flex-wrap justify-center gap-2">
							{productData?.hasPrevPage && <Button onClick={() => handlePageChange(currentPage - 1)} variant="outline">{currentPage - 1}</Button>}
							<Button variant="outline">{currentPage}</Button>
							{productData?.hasNextPage && <Button onClick={() => handlePageChange(currentPage + 1)} variant="outline">{currentPage + 1}</Button>}
						</div>

						<Button disabled={!productData?.hasNextPage} onClick={() => handlePageChange(currentPage + 1)} variant="outline">Next</Button>
					</div>

				</div>
			</section>
		</Loader>
	)
}

export default ProductListingPage