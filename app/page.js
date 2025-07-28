import Link from "next/link";
import Image from "next/image";
import bg from "../app/public/bg.png"

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill //铺满父容器
        placeholder="blur" //加载时显示模糊预览
        quality={80}
        className="object-cover object-top" //保持比例地填满整个容器，图片可能被裁剪。顶部对齐
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-20 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}