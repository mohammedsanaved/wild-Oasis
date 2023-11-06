/* eslint-disable react/prop-types */
import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  @media (max-width: 768px) {
    /* This media query will hide the text on screens larger than 768px (laptop and tablet viewports) */
    width: 7.4rem;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  /* font-family: "Sono"; */
`;

const Price = styled.div`
  /* font-family: "Sono"; */
  font-weight: 600;
`;

const Discount = styled.div`
  /* font-family: "Sono"; */
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({cabin}) => {
  const {id:cabinId,image, discountPrice, maxCapacity,name,regularPrice} = cabin
  const queryClient = useQueryClient();
  const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn: (id)=> deleteCabin(id),
    onSuccess: ()=> {
      toast.success("Cabin successfully Deleted")
      
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
    },
    onError: (err)=> toast.error(err.message)
  })
  return (
    <TableRow>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>fits upto {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discountPrice)}</Discount>
      <button onClick={()=> mutate(cabinId)} disabled={isDeleting}>delete</button>
    </TableRow>
  )
}

export default CabinRow