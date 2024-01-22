import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../../services/apiBookings"
import { useSearchParams } from "react-router-dom";



export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status') || "all";
  console.log(filterValue)
  const filter = !filterValue || filterValue === 'all' ? null : {field: "status", value: filterValue}
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc"
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {field, direction}
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const { isLoading, data: { data: bookings, count } = {}, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  
  return { isLoading, bookings, error, count };
  
      // return {isLoading, bookings, error, count}
}

// ---------------------------------------------------------------
// import { useQuery } from "@tanstack/react-query"
// import { useSearchParams } from "react-router-dom";
// export function useBookings() {
//   const [searchParams] = useSearchParams();

//   const filterValue = searchParams.get('status') || "all";
//   const filter = !filterValue || filterValue === 'all' ? null : {field: "status", value: filterValue}
  
//   const sortByRaw = searchParams.get('sortBy') || "startDate-desc"
//   const [field, direction] = sortByRaw.split('-');
//   const sortBy = {field, direction}

//   const { isLoading, data, error } = useQuery({
//     queryKey: ['bookings', filter, sortBy],
//     queryFn: () => getBookings({ filter, sortBy }),
//   });

//   const bookings = data?.data?.bookings; // Ensure data and data.bookings exist
//   const count = data?.data?.count; // Ensure data and data.count exist

//   return { isLoading, bookings, error, count };
// }
