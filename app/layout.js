
import "@/app/styles/globals.css"
import {Noto_Sans_SC} from "next/font/google";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { ReservationProvider } from "./cabins/[cabindocumentId]/components/ReservationContext";
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap", //页面加载时，先用系统默认字体，加载完成后再换成自定义的字体
});


export const metadata = {
  title:{
    template:"%s / The Wild Oasis",
    default:"Welcome / The Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSansSC.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
          <Header />
          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
