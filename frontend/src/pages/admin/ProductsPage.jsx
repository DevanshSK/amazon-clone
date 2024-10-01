import { Loader } from "@/components/loader";
import { getAllProductsService } from "@/services/productService";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

import { columns } from "@/components/dashboards/product-table/columns";
import { DataTable } from "@/components/dashboards/product-table/data-table";
import React, { useState } from "react";

const ProductsPage = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching, isPlaceholderData } = useQuery({
        queryKey: ['products', pagination],
        queryFn: () => getAllProductsService(pagination),
        placeholderData: keepPreviousData,
        onError: (error) => {
            console.log("Fetching categories failed", error);
        },
    });

    console.log(data)


    // Prefetch the next page!
    React.useEffect(() => {
        if (!isPlaceholderData && data?.hasNextPage) {
            const newPage = {
                ...pagination,
                pageIndex: pagination.pageIndex + 1,
            }
            const prevPage = {
                ...pagination,
                pageIndex: pagination.pageIndex - 1,
            }
            queryClient.prefetchQuery({
                queryKey: ['products', newPage],
                queryFn: () => getAllProductsService(newPage),
            })
            queryClient.prefetchQuery({
                queryKey: ['products', prevPage],
                queryFn: () => getAllProductsService(prevPage),
            })
        }
    }, [data, isPlaceholderData, pagination, queryClient]);

    // console.log("FETCHED DATA", data);
    // console.table(pagination)

    return (
        <Loader loading={isLoading || isFetching}>
            <div className="p-6">
                <DataTable
                    columns={columns}
                    data={data || {}}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </div>
        </Loader>
    )
}

export default ProductsPage