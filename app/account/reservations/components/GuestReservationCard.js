"use client";
import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function GuestReservationCard({ booking, onDelete }) {
  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        {booking.cabinID?.image?.url ? (
          <Image
            src={`http://localhost:1337${booking.cabinID.image.url}`}
            alt={`Cabin ${booking.cabinID.name}`}
            fill
            className="object-cover border-r border-primary-800"
          />
        ) : (
          <div className="w-full h-full bg-primary-800"></div>
        )}
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {booking.nightsNumber} nights in Cabin {booking.cabinID.name}
          </h3>
          {isPast(new Date(booking.startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(booking.startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(booking.startDate))
            ? "Today"
            : formatDistanceFromNow(booking.startDate)}
          ) &mdash; {format(new Date(booking.endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">
            ${booking.totalPrice}
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {booking.guestsNumber} guest{booking.guestsNumber > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(booking.createdAt), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(new Date(booking.startDate)) ? (
          <>
            <Link
              href={`/account/reservations/edit/${booking.documentId}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation
              bookingId={booking.documentId}
              onDelete={onDelete}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

