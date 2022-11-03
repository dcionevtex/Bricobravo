import { useEffect } from 'react'

// This custom is to show the clear filter button when the user click at the first filter Item
export default  function ShowClearFilterButton() {
  useEffect(() => {
    setTimeout(() => {
      let filterSelected = document.querySelectorAll('.vtex-search-result-3-x-selectedFilterItem')
      const clearFilterButton = document.querySelector('.vtex-search-result-3-x-filter__container--clearAllFilters')
      const filterItems = document.querySelectorAll('.vtex-search-result-3-x-filterItem')
      AddClearFilterButton(filterItems, filterSelected, clearFilterButton)
    }, 1500)
  },[])

  function AddClearFilterButton(filterItems, filterSelected, clearFilterButton) {
    filterItems.forEach(item => {
        item.addEventListener("click", function () {
          setTimeout(() => {
            filterSelected = document.querySelectorAll('.vtex-search-result-3-x-selectedFilterItem')
            if (filterSelected.length > 0)
              clearFilterButton.style.display = 'block'
            else
              clearFilterButton.style.display = 'none'
            hideClearFilterButton(filterSelected, clearFilterButton)
          }, 1800)
        })
    })
  }
  function hideClearFilterButton(filterSelected, clearFilterButton){
    console.log("entrei", filterSelected, clearFilterButton)

    filterSelected = document.querySelectorAll('.vtex-search-result-3-x-selectedFilterItem')
    clearFilterButton.addEventListener("click", function () {
      console.log("cliquei")
      clearFilterButton.style.display = 'none'
    })

    filterSelected.forEach(itemSelected => {
      console.log(itemSelected)
      itemSelected.addEventListener("click", function () {
        console.log("clicou", itemSelected)
        filterSelected = document.querySelectorAll('.vtex-search-result-3-x-selectedFilterItem')
          clearFilterButton.style.display = 'none'
      })
    })
  }


  return null
}

