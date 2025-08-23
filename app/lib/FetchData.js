const BASE_URL = "http://localhost:1337/api";

// 统一请求工具
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

    // DELETE 可能没有 body，直接返回 null
    if (res.status === 204) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
    throw error;
  }
}



// cabins - 数据变化不频繁，ISR 10 分钟
export async function fetchCabinData() {
  const url = `${BASE_URL}/cabins?populate=image`;
  return (await request(url, { next: { revalidate: 600 } })) ?? [];
}

export async function fetchCabinDataById(documentId) {
  const url = `${BASE_URL}/cabins?filters[documentId][$eq]=${documentId}&populate=image&populate=bookings`;
  return (await request(url, { next: { revalidate: 600 } }))[0] ?? null;
}

// settings - 变化极少，ISR 1天
export async function fetchSettingData() {
  const url = `${BASE_URL}/settings`;
  return await request(url, { next: { revalidate: 86400 } });
}

// guests - 需要实时数据
export async function fetchGuest() {
  const url = `${BASE_URL}/guests`;
  return await request(url, { cache: "no-store" });
}

export async function fetchGuestByEmail(email) {
  const url = `${BASE_URL}/guests?filters[email][$eq]=${encodeURIComponent(
    email
  )}&populate[bookings][populate][cabinID][populate]=image`;
  const data = await request(url, { cache: "no-store" });
  return data && data.length > 0 ? data[0] : null;
}

// bookings - 需要实时数据
export async function fetchBookingById(documentId) {
  const url = `${BASE_URL}/bookings/${documentId}?populate[cabinID][populate]=image`;
  const data = await request(url, { cache: "no-store" });
  if (!data) return null;
  return { documentId: data.documentId, ...data };
}

//
// ===== 数据修改函数 =====
//

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
