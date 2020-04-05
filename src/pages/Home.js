import React, { Component, useState, useEffect, memo } from 'react'
import LatestTable from '../components/LatestTable'

export default class Home extends Component {
    render() {
        return (
            <div>
                <LatestTable/>
            </div>
        )
    }
}
