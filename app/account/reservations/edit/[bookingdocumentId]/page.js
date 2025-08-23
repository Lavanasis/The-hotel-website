import { Suspense } from "react";
import { EditReservation } from "./components/EditReservation";
import { fetchBookingById } from "@/app/lib/FetchData";
import Spinner from "@/app/components/Spinner";

export default async function Page({ params }) {
  const booking = await fetchBookingById(params.bookingdocumentId);
  return (
    <Suspense fallback={<Spinner />}>
      <EditReservation booking={booking} />
    </Suspense>
  );
}
