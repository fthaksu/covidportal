import React, { Component } from 'react'
import LatestTable from '../components/LatestTable'
import Layouts from '../components/Layouts';
import Stats from '../components/Stats';

export default class Home extends Component {
    render() {
        return (
            <Layouts>
                <Stats />
                <section className="my-4 py-3">
                    <LatestTable />
                </section>
            </Layouts>
        )
    }
}
