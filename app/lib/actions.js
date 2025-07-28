"use server";
import { auth, signIn, signOut } from "./auth";
import { DeleteBookingData, updateGuestData,updateBookingData } from "./FetchData";
import { fetchGuestByEmail } from "./FetchData";
import { revalidatePath } from "next/cache";
import { createBookingData } from "./FetchData";
export async function updateGuest(formData) {
  const session = await auth();
  const guest = await fetchGuestByEmail(session.user.email);
  if (!guest) throw new Error("Guest not found");
  const nationalID = formData.get("nationalID");
  const updateData = {nationalID};
  await updateGuestData(guest.documentId, updateData);
  revalidatePath("/account/profile"); //按需重新验证
}

export async function deleteBooking(bookingdocumentId) {
  await DeleteBookingData(bookingdocumentId);

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  const guest = await fetchGuestByEmail(session.user.email);
  if (!guest) throw new Error("Guest not found");

  const bookingdocumentId = formData.get("bookingdocumentId");

  const updateData = {
    nightsNumber: Number(formData.get("nightsNumber")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
  };

  await updateBookingData(bookingdocumentId, updateData);

  revalidatePath(`/account/reservations/edit/${bookingdocumentId}`);
  revalidatePath("/account/reservations");
}
export async function createBooking(bookingData,formData) {
  const session = await auth();
  const guest = await fetchGuestByEmail(session.user.email)
  const updateData = {
    ...bookingData,
    guestsNumber: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    bookingStatus: "unconfirmed",
    guestID:guest.documentId
  };
  console.log("UPDATEDATA:",updateData);
  await createBookingData(updateData);
}
export async function signInAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
