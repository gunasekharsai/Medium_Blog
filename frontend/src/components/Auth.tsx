import {Link , useNavigate} from "react-router-dom"
import { ChangeEvent,useState } from "react"
import { SignupInput } from "@guna_1472/medium-common"
import axios from "axios"
import {BACKEND_URL} from "../config"
export const Auth = ({type}:{type:"signup"|"signin"})=>{
    const navigate = useNavigate();
    const [postInputs,setpostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
    async function sendRequests(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            console.log(jwt)
            navigate("/blogs");
        } catch(e){
             alert(  type==="signin"?"username and password doesnt exist" :"error while siginup")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="font-bold text-3xl">
                      Create an account
                </div>
                <div className="text-slate-400 pt-2">
                     {type==="signin"?"Dont have an account":" Already have an account?" }  
                  <Link className="pl-2 underline" to={type=="signup"?"/Signin":"/Signup"}>{type==="signin"?"signup":"signin"}</Link>
                </div>
           </div>
                <div className="pt-8">
       {type==="signup"? <LabelledInput label="Name" placeholder="guna sekhar sai" onChange={(e)=>{
                setpostInputs(c=>({
                    ...c,
                    name:e.target.value,
                }))
            }}/> :null} 
        
        <LabelledInput label="Username" placeholder="gunashekhar@gmail.com" onChange={(e)=>{
                setpostInputs(c=>({
                    ...c,
                    username:e.target.value,
                }))
            }}/>
        
    
        <LabelledInput label="password" type={"password"} placeholder="1325236" onChange={(e)=>{
                setpostInputs(c=>({
                    ...c,
                    password:e.target.value,
                }))
            }}/>
            <button onClick={sendRequests} type="button" className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup"?"Signup":"Signin"}</button>
    
           </div>
           </div>
      

        </div>
    </div>
}
interface labelledInputtypes {
    label:string
    placeholder: string
    onChange : (e:ChangeEvent<HTMLInputElement> ) => void,
    type?: string
}
function LabelledInput ({label,placeholder,onChange ,type}:labelledInputtypes) {
    return <div>
        <div>
            <label  className=" pt-4 block mb-2 text-sm font-medium text-black-900 dark:text-black">{label}</label>
            <input onChange={onChange} type = {type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder= {placeholder} required />
        </div>
    </div>
}