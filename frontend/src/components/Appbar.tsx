import { Link } from "react-router-dom"
import { Avatar } from "./Blogpost"

export const Appbar = () => {
    return <div className="flex justify-between border-b p-3 px-10">
       <Link to={'/blogs'}>
       <div className="text-2xl">
            Medium
        </div>
        </Link>
        <div className="space-x-10">
            <Link to ={'/publish'}>
            <button type="button" className="px-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
            </Link>
            <Avatar name="Guna sekhar sai" size="big"/>
        </div>

    </div>
}