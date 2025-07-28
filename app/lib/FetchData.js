const BASE_URL = "http://localhost:1337/api";

async function request(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Request failed: ${res.status} ${res.statusText} - ${errorBody}`
      );
    }
    const json = await res.json();
    return json.data ?? null;
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
    throw error;
  }
}

export async function fetchCabinDataById(documentId) {
  const url = `${BASE_URL}/cabins?filters[documentId][$eq]=${documentId}&populate=image&populate=bookings`;
  return (await request(url, { next: { revalidate: 300 } }))[0] ?? null;
}

export async function fetchCabinData() {
  const url = `${BASE_URL}/cabins?populate=image`;
  return (await request(url, { next: { revalidate: 300 } })) ?? [];
}

export async function fetchSettingData() {
  const url = `${BASE_URL}/settings`;
  return await request(url, { next: { revalidate: 3600 } });
}

export async function fetchGuest() {
  const url = `${BASE_URL}/guests`;
  return await request(url, { next: { revalidate: 300 } });
}

export async function fetchGuestByEmail(email) {
  const url = `${BASE_URL}/guests?filters[email][$eq]=${encodeURIComponent(
    email
  )}&populate[bookings][populate][cabinID][populate]=image`;
  const data = await request(url, { next: { revalidate: 300 } });
  return data && data.length > 0 ? data[0] : null;
}

export async function updateGuestData(documentId, updatedData) {
  const url = `${BASE_URL}/guests/${documentId}`;
  return await request(url, {
    method: "PUT",
    body: JSON.stringify({ data: updatedData }),
  });
}

export async function createGuest(newGuest) {
  const url = `${BASE_URL}/guests`;
  return await request(url, {
    method: "POST",
    body: JSON.stringify({ data: newGuest }),
  });
}

export async function deleteBookingData(bookingDocumentId) {
  const url = `${BASE_URL}/bookings/${bookingDocumentId}`;
  return await request(url, {
    method: "DELETE",
  });
}

export async function fetchBookingById(documentId) {
  const url = `${BASE_URL}/bookings/${documentId}?populate[cabinID][populate]=image`;
  const data = await request(url, { next: { revalidate: 300 } });
  if (!data) return null;
  return { documentId: data.documentId, ...data };
}

export async function updateBookingData(documentId, updatedData) {
  const url = `${BASE_URL}/bookings/${documentId}`;
  return await request(url, {
    method: "PUT",
    body: JSON.stringify({ data: updatedData }),
  });
}

export async function createBookingData(updatedData) {
  const url = `${BASE_URL}/bookings?populate=cabinID&populate=guestID`;
  return await request(url, {
    method: "POST",
    body: JSON.stringify({ data: updatedData }),
  });
}
