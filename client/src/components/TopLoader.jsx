import LoadingBar from 'react-top-loading-bar'
import React from 'react'

const TopLoader = ({ progress, setProgress }) => {
    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={100}
            />
        </div>
    )
}

export default TopLoader
