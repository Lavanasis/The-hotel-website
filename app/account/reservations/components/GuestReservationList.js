"use client";

import GuestReservationCard from "./GuestReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "@/app/lib/actions";
import toast from "react-hot-toast";
export default function GuestReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingdocumentId) => {
      return curBookings.filter(
        (booking) => booking.documentId !== bookingdocumentId
      );
    }
  );

  async function handleDelete(bookingdocumentId) {
    optimisticDelete(bookingdocumentId);
    try {
      await deleteBooking(bookingdocumentId);
    } catch (err) {
      toast.error("删除失败", err);
      // 回滚
      router.refresh();
    }
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
