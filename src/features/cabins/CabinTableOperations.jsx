import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy";
const CabinTableOperations = () => {
  return (
    <TableOperations >
        <Filter filterField='discount' options={[
        {value: 'all', label: 'All'},
        {value: 'no-discount', label: "No Discount"},
        {value: 'with-discount', label: "With Discount"}
        ]} />
        <SortBy options={[
          {value: "name-asc", label: "Sort by (A - Z)"},
          {value: "name-desc", label: "Sort by (Z - A)"},
          {value: "regularPrice-asc", label: "Sort by Prize (low Price)"},
          {value: "regularPrice-desc", label: "Sort by Prize (high Price)"},
          {value: "maxCapacity-asc", label: "Sort by Capacity (Low Price)"},
          {value: "maxCapacity-desc", label: "Sort by Capacity (High Price)"},
        ]} />
    </TableOperations>
  )
}

export default CabinTableOperations;