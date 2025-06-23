import Sidebar from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <main className="flex-1 px-6 py-10">{children}</main>
    </div>
  )
}
