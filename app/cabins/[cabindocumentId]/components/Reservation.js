
import { fetchSettingData } from "@/app/lib/FetchData";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { parseISO, eachDayOfInterval} from "date-fns";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import LoginMessage from "./LoginMessage";
import { auth } from "@/app/lib/auth";
export const revalidate = 1000;

export default async function Reservation({ cabin }) {
  const setting = await fetchSettingData();

  const bookedDates = cabin.bookings.flatMap((booking) => {
    const start = parseISO(booking.startDate); // 被占用第一天
    const end = subDays(parseISO(booking.endDate), 1); // 退房前一天（退房当天可作为新的入住）
    return eachDayOfInterval({ start, end });
  });
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector setting={setting} cabin={cabin} bookedDates={bookedDates} />
      {session?.user?<ReservationForm cabin={cabin} user={session.user}/>:<LoginMessage/>}
    </div>
  );
}

