import React from "react";

const Weather=(props)=>{
    return(
        <div className="container py-4">
            <div className="cards">
                <div className="details text-light"><h1>{props.city} </h1></div>
                <h5 className="py-4">
                <i className={`wi ${props.icon} display-1`}></i>
                </h5>
                {props.temp?<h1 className="py-2">{props.temp}&deg;</h1>:null}
                {minmaxfunc(props.temp_min,props.temp_max)}
                <h3 className="py-4">{props.description}</h3>
            </div>
        </div>
    );
}

function minmaxfunc(min, max){
    if(min&&max){
    return(
         <h3 className="py-4">
             <span className="px-4" > {min}&deg;</span>
             <span className="px-4" > {max}&deg;</span>
         </h3>
    );
    }
}
export default Weather;