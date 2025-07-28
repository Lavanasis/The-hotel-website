import Image from "next/image";
import { UsersIcon, MapPinIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import Reservation from "./Reservation";
import { Suspense } from "react";
import Spinner from "@/app/components/Spinner";

export const revalidate = 3600;

export default async function CabinDetailClient({ cabin }) {
  return (
    <div className="max-w-6xl mx-auto mt-8 ">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          {cabin?.image?.url ? (
            <Image
              src={`http://localhost:1337${cabin.image.url}`}
              fill
              alt={`Cabin ${cabin.name}`}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-800"></div>
          )}
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl translate-x-[-254px] bg-primary-950 p-6 w-[150%]">
            Cabin {cabin?.name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{cabin?.description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to{" "}
                <span className="font-bold">{cabin?.maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-24">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
