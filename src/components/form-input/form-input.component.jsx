import React from "react";
import "./form-input.styles.scss";

 const formInput = ({handleChange,label,...otherProps}) => (

    <div className="group">
        <input className="form-input" onChange={handleChange}/>

        {
            label ?
            (<label className={`${otherProps.value && otherProps.value.length ? "shrink" : ""} form-input-label`}>

                {label}

            </label>)
            : null
        }

    </div>

 )

 export default formInput;