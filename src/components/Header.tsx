import axios from "axios";
import {useState,useEffect} from "react"

export const Header=()=>{
    const [user,setUser]=useState<any>(null);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            setUser(response.data[0])
        })
    })
    return(
        <div className="flex bg-blue-950 items-center justify-between py-4">
        <div className="text-white font-semibold text-2xl px-5 flex">
            <div className="bg-green-700 px-1">
                S
            </div>
            <div>
               WIFT
            </div>
        </div>
        <div className="flex  items-center px-5">
          <div className="bg-gray-100 rounded-full px-2 py-2 text-xl font-bold text-blue-950">
            LG
          </div>
          <div className="text-white px-5 mr-6 hidden lg:block">
          Leanne Graham
          </div>
        </div>
      </div>
    )
}