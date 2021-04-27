import React from 'react'

function Head1(props) {
    return (
        <div>
            <meta charSet="UTF-8"></meta>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

            <link rel="stylesheet" href="styles.css"></link>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossOrigin="anonymous"></link>

            <script src="https://kit.fontawesome.com/3736cc5c9e.js" crossOrigin="anonymous"></script>

            <title>{props.name}</title>
        </div>
    )
}

export default Head1;