import CabinCard from "./CabinCard";

export const revalidate = 3600;
export async function CabinList({ cabins,filter }) {
  const sortedCabins = [...cabins].sort((a, b) => a.name.localeCompare(b.name));
  let displayedCabins;
  if(filter==="all"){
    displayedCabins = sortedCabins;
  }else if (filter==="small"){
    displayedCabins = sortedCabins.filter((cabin)=>cabin.maxCapacity<=3);
  }else if (filter==="medium"){
    displayedCabins = sortedCabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity
    <=7);
  }else if (filter==="large"){
    displayedCabins = sortedCabins.filter((cabin)=>cabin.maxCapacity>=8);
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {/* 小屏幕即以上：1列
    中屏幕即以上：2列
    大屏幕即以上：间距是12
    超大屏幕及以上：间距为11 */}
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.documentId} />
      ))}
    </div>
  );
}

export default CabinList;