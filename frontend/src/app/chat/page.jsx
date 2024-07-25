import { cookies } from "next/headers";
import { ChatLayout } from "@/components/chat/chat-layout";
import Link from "next/link";

export default function page() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="z-10 w-full h-full max-w-5xl text-sm border rounded-lg lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
