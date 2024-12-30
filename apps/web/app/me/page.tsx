/* eslint-disable react/no-unescaped-entities */
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form/message";
import Menu from "@/components/menu";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-row min-h-screen justify-between">
      <Menu />
      <div>test</div>
    </div>
  );
}
