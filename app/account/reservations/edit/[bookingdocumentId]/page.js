import {EditReservation} from "./components/EditReservation"
import { fetchBookingById } from "@/app/lib/FetchData";


export default async function Page({ params }) {
  const booking = await fetchBookingById(params.bookingdocumentId);
  return <EditReservation booking={booking} />;
}
