
import CheckinForm from "@/components/CheckinForm";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome</h1>
          <p className="text-gray-600 mt-1">Please check in and we’ll notify the right person.</p>
        </div>
        <CheckinForm />
        <p className="text-xs text-gray-400 text-center mt-6">
          Built with Next.js • No data is stored on the server.
        </p>
      </div>
    </main>
  );
}
