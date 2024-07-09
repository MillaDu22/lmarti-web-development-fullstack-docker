import React, {useState} from "react";
import chevron from "../../assets/images/chevron.webp";
import './collapse.css';

const Collapse =({ id, title, content, content1}) => { 
    const [isOpen , setIsOpen] = useState(false);
    const display = () => {
    setIsOpen(!isOpen);
    };
    return(
        <section className = "container-col">
            <div className="wrapInfo vrap" >
                <input type="checkbox" aria-checked="mixed" tabIndex="0" id = {id} className="toggleInfo" aria-labelledby= {id} aria-describedby= {id}/>
                <label htmlFor= {id} className="labelToggleInfo">
                    <h3 className=" labelTitleInfo" onClick ={display}>{title}
                        {isOpen ? (<img src={chevron} className="chevron-up" alt="up" />) :
                        (<img src={chevron} className="chevron-down"alt="down"/>)}
                    </h3>
                </label>
                <div className ="textInfo">
                    <div className="text-inner-info">
                        {isOpen &&  Array.isArray(content) === true && <div className ="p-text-info">{content}</div>}
                        {isOpen &&  Array.isArray(content1) === true && <div className ="p-text-info">{content1}</div>}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Collapse;
