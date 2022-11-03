import { Fragment, useEffect } from 'react';

function ChangeCategoryName() {
    useEffect(() => {
            const departament = 'Department'
            const newDepartament = 'Dipartimento'
        setTimeout(() => {
            const categorySearchItem = document.querySelectorAll('.vtex-search-result-3-x-filterTitleSpan')
            
            for(let i = 0; i < categorySearchItem.length; i++) {
                switch (departament) {
                    case categorySearchItem[i].innerHTML:
                        document.querySelectorAll('.vtex-search-result-3-x-filterTitleSpan')[i].innerHTML = newDepartament;
                        break;
                    default:
                        break;
                }
            }
        }, 1000)

        setTimeout(() => {
            const categorySearchItemMobile = document.querySelectorAll('.vtex-search-result-3-x-accordionFilterItemTitle')
    
             for(let i = 0; i < categorySearchItemMobile.length; i++) {
                 switch (departament) {
                     case categorySearchItemMobile[i].innerHTML:
                         document.querySelectorAll('.vtex-search-result-3-x-accordionFilterItemTitle')[i].innerHTML = newDepartament;
                         break;
                     default:
                         break;
                 }
             }
         }, 1000)
    },[])

    return(
        <Fragment>
        </Fragment>
    )
}

export default ChangeCategoryName