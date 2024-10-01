import { Suspense } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

export const Preview = ({
    value
}) => {


    return (
        <div className="bg-white">
            <Suspense fallback={<div>Loading...</div>}>
                <ReactQuill 
                    theme={"bubble"}
                    value={value}
                    readOnly                   
                />
            </Suspense>
        </div>
    )
}