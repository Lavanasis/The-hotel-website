"use client";

import GuestReservationCard from "./GuestReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "@/app/lib/actions";

export default function GuestReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(  //乐观更新:用于先更新UI,再发送请求(先更新删除状态,再发送删除的请求)
    bookings,
    (curBookings, bookingdocumentId) => {
      return curBookings.filter(
        (booking) => booking.documentId !== bookingdocumentId
      );
    }
  );

  async function handleDelete(bookingdocumentId) {
    optimisticDelete(bookingdocumentId);
    await deleteBooking(bookingdocumentId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <GuestReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.documentId}
        />
      ))}
    </ul>
  );
}

