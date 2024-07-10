import React from "react";


function LienSite ({title}) {
    return(
        <ul className="liens-list"> 
            <li className="lien"><a className="lien-a" href={title} target="blank">Site</a></li>
        </ul>
    )
}
export default LienSite;