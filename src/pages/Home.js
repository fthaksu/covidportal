import React, { Component, useState, useEffect, memo } from 'react'
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import LatestTable from '../components/LatestTable'
import Layouts from '../components/Layouts';
import Stats from '../components/Stats';

export default class Home extends Component {
    render() {
        return (
            <Layouts>
              <Stats />
            <section className="my-4 py-4">
            <LatestTable/>
            </section>
            </Layouts>
        )
    }
}
