import React from "react";
import CabinDetail from "./components/CabinDetail";
import { fetchCabinData, fetchCabinDataById } from "../../lib/FetchData";
export async function generateMetadata({ params }) {
  const cabin = await fetchCabinDataById(params.cabindocumentId);
  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await fetchCabinData();
  const documentIds = cabins.map((cabin) => ({
    cabindocumentId: cabin.documentId,
  }));
  return documentIds;
}

export default async function Page({ params }) {
  const cabin = await fetchCabinDataById(params.cabindocumentId);
  return <CabinDetail cabin={cabin} />;
}
