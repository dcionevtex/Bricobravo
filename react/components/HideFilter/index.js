import React, { Fragment, useEffect } from 'react'
import { Helmet } from 'vtex.render-runtime'

const HideFilter = () => {

    function hideFilter() {
        const hideFilterElement = document.querySelectorAll('.vtex-flex-layout-0-x-flexRowContent--searchLayout .vtex-flex-layout-0-x-stretchChildrenWidth')
        hideFilterElement[0].classList.add('hideFilterLeft')
        hideFilterElement[2].classList.add('hideFilterRight')
        document.querySelector('.showFilterButton').classList.remove('hide')
        document.querySelector('.hideFilterButton').classList.add('hide')
    }
    
    function showFilter() {
        const showFilterElement = document.querySelectorAll('.vtex-flex-layout-0-x-flexRowContent--searchLayout .vtex-flex-layout-0-x-stretchChildrenWidth')
        showFilterElement[0].classList.remove('hideFilterLeft')
        showFilterElement[2].classList.remove('hideFilterRight')
        document.querySelector('.showFilterButton').classList.add('hide')
        document.querySelector('.hideFilterButton').classList.remove('hide')   
    }

    const delay = 1

    useEffect(() => {
        const timer1 = setTimeout(() => hideFilter , delay * 10000);
        
          return () => {
            clearTimeout(timer1);
          };
        },
        []
    );

    return (
        <Fragment>      
            <Helmet>
                <link href="https://bricobravo.vteximg.com.br/arquivos/hideFilterUpdate1.css" rel="stylesheet" type="text/css" />
            </Helmet>
            <button className="hideFilterButton" onClick={hideFilter}>Nascondi filtri</button>
            <button className="showFilterButton hide" onClick={showFilter}>Filtri</button>
        </Fragment>
    )
}

export default HideFilter
