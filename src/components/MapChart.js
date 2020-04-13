import React, { memo, useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "react-bootstrap";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};

const colorScale = scaleLinear()
    .domain([0, 175000])
    .range(["#ffedea", "#E52020"]);

const MapChart = ({ setTooltipContent }) => {

    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
    const [covidData, setCovidData] = useState([]);

    async function getData() {
        const res = await fetch('https://corona.lmao.ninja/countries');
        const data = await res.json();
        setCovidData(data);
    }

    useEffect(() => {
        getData();
    }, []);

    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        if (position.zoom === 2) setPosition({ coordinates: [0, 0], zoom: 2 });
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    function handleMoveEnd(position) {
        setPosition(position);
    }
    return (
        <>
            <Row>
                <Col>
                    <div className="controls">
                        <button onClick={handleZoomIn}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                            >
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                        <button onClick={handleZoomOut}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                    </div>
                </Col>
                <Col>
                    <div>
                    <div class="color-bar-map"><span className="pull-left">MIN</span><span className="float-right">MAX</span></div><div className="color-bar-text"></div>
                    </div>
                </Col>
            </Row>
            <div>
                <ComposableMap data-tip="" projectionConfig={{ scale: 200 }} width={1100}>
                    <ZoomableGroup zoom={position.zoom}
                        center={position.coordinates}
                        onMoveEnd={handleMoveEnd}>
                        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                        {covidData.length > 0 && (
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map(geo => { //filter map örneği
                                        const d = covidData.find(s => s.countryInfo.iso3 === geo.properties.ISO_A3);
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={d ? colorScale(d["cases"]) : "#F5F4F6"}
                                                onMouseEnter={() => {
                                                    const { NAME, POP_EST } = geo.properties;
                                                    setTooltipContent((d == undefined ? '' : (<div>
                                                        <strong>{NAME}</strong><br />
                                                        <FormattedMessage id="total_cases" />: {d["cases"].toLocaleString()} <br />
                                                        <FormattedMessage id="deaths" /> : {d["deaths"].toLocaleString()}<br />
                                                        <FormattedMessage id="today_cases" /> : {+ d["todayCases"].toLocaleString()}<br />
                                                    </div>)
                                                    ));
                                                }}
                                                onMouseLeave={() => {
                                                    setTooltipContent("");
                                                }}
                                                style={{
                                                    hover: {
                                                        fill: "#FFE700",
                                                        outline: "none"
                                                    },
                                                    pressed: {
                                                        fill: "#E42",
                                                        outline: "none"
                                                    }
                                                }}
                                            />)
                                    }
                                    )
                                }
                            </Geographies>
                        )}
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </>
    );
};

export default memo(MapChart);
