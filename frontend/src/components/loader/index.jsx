import { Spinner } from "./Spinner";


export const Loader = ({ loading, children }) => {
    return loading ? (
        <div className="w-full py-5 flex justifyy-center">
            <Spinner />
        </div>
    ) : (children);
}