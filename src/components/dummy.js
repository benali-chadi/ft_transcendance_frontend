import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createHashHistory } from 'history'
import axios from "axios";
import { userContext } from "./helpers/context";


export  function  Dummy()
{
    const { setUser } = useContext(userContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername ] = useState("")
    const [image, setimage] = useState("");
    const navigate = useNavigate();

    let query  = searchParams.getAll("code") ;
    console.log(query);

    useEffect(  () => {

       async  function test () {
           console.log("How");
            let data   = await  axios.post("http://localhost:9000/login?code="+ query[0], {} , {withCredentials : true})
            if (data.data) {
                console.log("How");
                console.log(data.data);
                const browserHistory = createHashHistory();

                navigate("/");

                // browserHistory.push("/home");
                // window.location.href = "http://localhost:3000/"; 
                
            }
        // @ts-ignore
            console.log(data.data);
            // alert(data.data.image_url)
            // alert();
                    // @ts-ignore

                    setUser(data.data)
            // setimage(data.data.image_url)

            
       }

       test();
    },[]);
    return (<>
    </>)
}