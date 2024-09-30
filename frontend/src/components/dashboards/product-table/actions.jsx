import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { getSingleProductService } from "@/services/productService";
import { deleteProductService } from "@/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Actions = ({ id }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: deleteProductService,
        onSuccess: () => {
            toast.success("Product deleted Successfully!");
            queryClient.invalidateQueries("products");
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong.")
            console.error("Product Deletion:", error.response.data);
        },
    });

    const handleDelete = () => {
        mutate(id);
    }

    const handleEdit = async () => {
        await queryClient.prefetchQuery({ queryKey: ["product", id], queryFn: () => getSingleProductService(id) });
        navigate(`/admin/product/${id}`);
    }

    return (
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default Actions