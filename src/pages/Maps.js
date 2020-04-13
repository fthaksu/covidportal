import React, { useState, useEffect, memo} from 'react'
import Layouts from '../components/Layouts';
import MapChart from '../components/MapChart';
import ReactTooltip from "react-tooltip";



const Maps = () => {
    const [content, setContent] = useState(<div></div>);

    return(
        <Layouts>
             <div>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip place="top" >{content}</ReactTooltip>
            </div>
        </Layouts>
    )
}

export default memo(Maps);