import { signInAction } from "@/app/lib/actions";
import Image from "next/image";
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          height={24}
          width={24}
        />
        <span>Sign In By Github</span>
      </button>
    </form>
  );
}

export default SignInButton;
