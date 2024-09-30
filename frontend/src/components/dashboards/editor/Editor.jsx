import { Suspense } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

export const Editor = ({
    onChange, value, preview = false, placeholder, id
}) => {


    return (
        <div className="bg-white">
            <Suspense fallback={<div>Loading...</div>}>
                <ReactQuill 
                    theme={preview ? "bubble" : "snow"}
                    value={value}
                    onChange={onChange}
                    readOnly={preview}
                    placeholder={placeholder}
                    id={id}                    
                />
            </Suspense>
        </div>
    )
}