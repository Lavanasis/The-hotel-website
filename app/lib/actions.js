"use server";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBookingData,
  updateGuestData,
  updateBookingData,
  createBookingData,
  fetchGuestByEmail,
} from "./FetchData";
import { revalidatePath } from "next/cache";

// ========== Guest ==========
export async function updateGuest(formData) {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const guest = await fetchGuestByEmail(session.user.email);
    if (!guest) throw new Error("Guest not found");

    const nationalID = formData.get("nationalID");
    if (!nationalID) throw new Error("National ID is required");

    const updateData = { nationalID };
    await updateGuestData(guest.documentId, updateData);

    revalidatePath("/account/profile");
    return { success: true };
  } catch (err) {
    console.error("updateGuest error:", err);
    return { success: false, error: err.message };
  }
}

// ========== Booking ==========
export async function deleteBooking(bookingdocumentId) {
  try {
    if (!bookingdocumentId) throw new Error("Booking ID is required");

    await deleteBookingData(bookingdocumentId);
    revalidatePath("/account/reservations");

    return { success: true };
  } catch (err) {
    console.error("deleteBooking error:", err);
    return { success: false, error: err.message };
  }
}

export async function updateBooking(formData) {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const guest = await fetchGuestByEmail(session.user.email);
    if (!guest) throw new Error("Guest not found");

    const bookingdocumentId = formData.get("bookingdocumentId");
    if (!bookingdocumentId) throw new Error("Booking ID is required");

    const updateData = {
      nightsNumber: Number(formData.get("nightsNumber")) || 1,
      observations: formData.get("observations")?.slice(0, 1000) || "",
    };

    await updateBookingData(bookingdocumentId, updateData);

    revalidatePath(`/account/reservations/edit/${bookingdocumentId}`);
    revalidatePath("/account/reservations");

    return { success: true };
  } catch (err) {
    console.error("updateBooking error:", err);
    return { success: false, error: err.message };
  }
}

export async function createBooking(bookingData, formData) {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const guest = await fetchGuestByEmail(session.user.email);
    if (!guest) throw new Error("Guest not found");

    const updateData = {
      ...bookingData,
      guestsNumber: Number(formData.get("numGuests")) || 1,
      observations: formData.get("observations")?.slice(0, 1000) || "",
      extraPrice: 0,
      isPaid: false,
      hasBreakfast: false,
      bookingStatus: "unconfirmed",
      guestID: guest.documentId,
    };

    await createBookingData(updateData);
    revalidatePath("/account/reservations");

    return { success: true };
  } catch (err) {
    console.error("createBooking error:", err);
    return { success: false, error: err.message };
  }
}

// ========== Auth ==========
export async function signInAction() {
  try {
    await signIn("github", { redirectTo: "/account" });
    return { success: true };
  } catch (err) {
    console.error("signInAction error:", err);
    return { success: false, error: err.message };
  }
}

export async function signOutAction() {
  try {
    await signOut({ redirectTo: "/" });
    return { success: true };
  } catch (err) {
    console.error("signOutAction error:", err);
    return { success: false, error: err.message };
  }
}
