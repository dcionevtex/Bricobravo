import React, { Fragment, useEffect } from 'react'

const HeaderMobile = () => {


    window.onscroll = function() {
        headerScrollMobile()
    }
        
    function headerScrollMobile() {
        const trigger_y = 50;

        //console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop > trigger_y) {
            document.querySelector('.vtex-flex-layout-0-x-flexRowContent--header-mobile-teste').classList.add('vtex-flex-layout-0-x-flexRowContent--header-mobile-teste--shrink')
            document.querySelector('.vtex-flex-layout-0-x-flexCol--header-logo').classList.add('vtex-flex-layout-0-x-flexCol--header-logo--shrink')
            document.querySelector('.vtex-flex-layout-0-x-flexCol--header-mobile-searchBar').classList.add('vtex-flex-layout-0-x-flexCol--header-mobile-searchBar--shrink')
            document.querySelector('.vtex-flex-layout-0-x-flexCol--header-small-logo').classList.add('vtex-flex-layout-0-x-flexCol--header-small-logo--shrink')
        } else if (document.documentElement.scrollTop <= trigger_y){
            document.querySelector('.vtex-flex-layout-0-x-flexCol--header-small-logo').classList.remove('vtex-flex-layout-0-x-flexCol--header-small-logo--shrink')
            document.querySelector('.vtex-flex-layout-0-x-flexCol--header-logo').classList.remove('vtex-flex-layout-0-x-flexCol--header-logo--shrink')
            document.querySelector('.vtex-flex-layout-0-x-flexCol--header-mobile-searchBar').classList.remove('vtex-flex-layout-0-x-flexCol--header-mobile-searchBar--shrink')
            document.querySelector('.vtex-flex-layout-0-x-flexRowContent--header-mobile-teste--shrink').classList.remove('vtex-flex-layout-0-x-flexRowContent--header-mobile-teste--shrink')
        }
    }

    // useEffect(() => {
    //     alert('Olá')
    //     },
    //     []
    // );

    return (
        <Fragment>
        </Fragment>
    )
}

export default HeaderMobile