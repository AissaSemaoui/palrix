import { axiosInstance } from "@/lib/axios";

export default function Home() {
  axiosInstance.get("/api/test");
  return (
    <main className="flex h-screen w-full items-center justify-center rounded-md border-border bg-red-50 text-6xl text-purple-700">
      <h1>Hello from Palrix</h1>
    </main>
  );
}
