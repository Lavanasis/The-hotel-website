import React from "react";
import { auth } from "@/app/lib/auth";
import { fetchGuestByEmail } from "@/app/lib/FetchData";
import { Suspense } from "react";
import Spinner from "@/app/components/Spinner";
import GuestReservationList from "./components/GuestReservationList";
export const metadata = {
  title: "Reservations",
};

export default async function page() {
  const session = await auth();
  const guest = await fetchGuestByEmail(session.user.email);
  const bookings = guest.bookings;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <Suspense fallback={<Spinner />}>
        <GuestReservationList bookings={bookings} />
        </Suspense>
      )}
    </div>
  );
}
