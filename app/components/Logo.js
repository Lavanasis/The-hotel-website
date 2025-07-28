import Image from "next/image";
import Link from "next/link";
import logo from "@/app/public/logo.png"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height="60"//单位是px
        quality={100} //图片质量，越高越清晰
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;