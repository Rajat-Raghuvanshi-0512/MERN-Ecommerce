import Helmet from "react-helmet"
import React from 'react'

const Metadata = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default Metadata
