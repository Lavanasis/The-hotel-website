import React from "react";
import { cache } from "react";
import CabinDetail from "./components/CabinDetail";
import {
  fetchCabinData,
  fetchCabinDataById as _fetchCabinDataById,
} from "../../lib/FetchData";

//避免 generateMetadata 和 Page 重复请求
const fetchCabinDataById = cache(_fetchCabinDataById);

export const revalidate = 3600; // ISR: 每小时重新生成

// 动态生成 <title>
export async function generateMetadata({ params }) {
  const cabin = await fetchCabinDataById(params.cabindocumentId);
  return {
    title: `Cabin ${cabin?.name ?? "Cabin"}`,
  };
}

// 静态生成所有 cabin 详情页
export async function generateStaticParams() {
  const cabins = await fetchCabinData();
  return cabins.map((cabin) => ({
    cabindocumentId: cabin.documentId,
  }));
}

// 页面组件
export default async function Page({ params }) {
  const cabin = await fetchCabinDataById(params.cabindocumentId);
  return <CabinDetail cabin={cabin} />;
}
