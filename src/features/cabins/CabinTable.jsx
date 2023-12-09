// import { useQuery } from "@tanstack/react-query";
// import styled from "styled-components";
// import {getCabins} from "../../services/apiCabins"
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import {useCabins} from "./useCabins";
import Table from "../../ui/Table"
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
//   //----------------------mediaQuery-----------------------
//   @media (max-width: 768px) {
//     padding: 1rem 1.8rem;
//     letter-spacing: .2px;
//     column-gap: 1.8rem;
//   }
// `;

const CabinTable = () => {
  // const {isLoading, data: cabins, error} = useQuery({
    //   queryKey: ['cabin'],
    //   queryFn: getCabins,
    // })
    const {isLoading, cabins} = useCabins();
    const [searchParams] = useSearchParams();
    if(isLoading) return <Spinner />
  const filterValue = searchParams.get('discount') || "all";
  console.log("FilterValue =>",filterValue);
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter((cabin)=> cabin.discountPrice === 0);

  if (filterValue === "with-discount") filteredCabins = cabins.filter((cabin)=> cabin.discountPrice > 0);

  // console.log(x)
  return (
    <Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={filteredCabins} render={(cabin)=> <CabinRow key={cabin.id} cabin={cabin} />} />
      {/* {cabins.map((cabin)=> <CabinRow key={cabin.id} cabin={cabin} />)} */}
    </Table>
    </Menus>
  )
}
export default CabinTable
