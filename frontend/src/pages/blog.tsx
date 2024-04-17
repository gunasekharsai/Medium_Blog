
import { Appbar } from "../components/Appbar";
import { Fullblog } from "../components/Fullblog"
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom"; // dynamic router params
export const Blog = ()=>{  
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id: id || "",
    });

    if(loading || !blog){
        return <div>
            <Appbar/>
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center"> 
                    <Spinner/>
                </div>
            </div>
        </div>
    }
    return <div>
        <Fullblog blog={blog}></Fullblog>
    </div>
}