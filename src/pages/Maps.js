import React, { useState,  memo} from 'react'
import Layouts from '../components/Layouts';
import MapChart from '../components/MapChart';
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from 'react-intl';



const Maps = () => {
    const [content, setContent] = useState(<div></div>);

    return (
        <Layouts>
            <div>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip place="top" >{content}</ReactTooltip>
            </div>
            <div className="phone-area">
            <div className="phone"></div>
            <div className="map-message2">
                <FormattedMessage id="phone_warning_top"/>
            </div>
            <div className="map-message">
               <FormattedMessage id="phone_warning"/>
            </div>
            </div>
        </Layouts>
    )
}

export default memo(Maps);