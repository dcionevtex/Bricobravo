import { useEffect } from 'react'


const InfiniteScroll = () => {

    function autoClick() {
        var observer = new IntersectionObserver(function(entries) {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap
            if(entries[0].isIntersecting === true) {
                clearInterval(timer1);
                entries[0].target.click();
                autoClick();
            }
        }, { rootMargin: '500px',threshold: [0] });

        var observed = document.querySelector('.vtex-search-result-3-x-buttonShowMore .vtex-button');
        
        if (observed) {
            observer.observe(observed);
        }
        
    }

    const timer1 = setInterval(() => autoClick , 4000);
    clearInterval(timer1);

    useEffect(() => {

        var observed = document.querySelector('.vtex-search-result-3-x-buttonShowMore .vtex-button');
        if (observed) {
            autoClick();
        } 
        

    },[]);    

    return null
}

export default InfiniteScroll
