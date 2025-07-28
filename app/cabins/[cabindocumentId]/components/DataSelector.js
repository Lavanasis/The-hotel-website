"use client";

import { DayPicker } from "react-day-picker";
import {
  differenceInCalendarDays,
} from "date-fns";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";


function DateSelector({ setting, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const numNights =
   range?.from &&range?.to
      ? differenceInCalendarDays(range.to,range.from)
      : 0;

  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center [&_.rdp-months]:flex [&_.rdp-months]:flex-row text-base"
        mode="range" //选择起止范围
        onSelect={setRange}
        selected={range}
        min={setting.minBookingLength}
        max={setting.maxBookingLength}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown" //月份和年份的切换是下拉菜单形式
        numberOfMonths={2}
        disabled={[ 
          { before: new Date() },
          ...bookedDates.map((date) => new Date(date)), // 禁止今天以前的日期和已经被选中的
        ]}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {cabin.discount > 0 ? (
              <>
                <span className="text-2xl">
                  ${cabin.regularPrice - cabin.discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${cabin.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${cabin.regularPrice}</span>
            )}
            <span>/night</span>
          </p>

          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                × <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {range&&(range.from || range.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
