const FilterForm = (props) => {
    return(
    <div>
      <input value={props.filterWord} onChange={props.handleFilterChange}/>
    </div>
    )
  }

  export default FilterForm