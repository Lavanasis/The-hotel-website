
import { fetchGuestByEmail } from "@/app/lib/FetchData";
import { auth } from "@/app/lib/auth";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/app/components/Spinner";
export const metadata = {
  title: "Update profile",
};
const UpdateYourProfile = dynamic(
  () => import("./components/UpdateYourProfile"),
  { loading: () => <Spinner /> }
);

export default async function Page() {
  const session = await auth();
  const guest = await fetchGuestByEmail(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

        <UpdateYourProfile guest={guest} />

    </div>
  );
}
