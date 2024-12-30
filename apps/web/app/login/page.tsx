/* eslint-disable react/no-unescaped-entities */
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form/message";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            name="email"
            type="email"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt">
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </span>
          </div>
        </label>
        <button className="btn btn-primary" formAction={signInAction}>
          Sign in
        </button>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
