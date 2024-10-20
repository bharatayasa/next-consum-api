import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <div className="bg-slate-500 px-10 py-10 rounded-lg">
        <h1 className="text-center">Hallo world</h1>
        <p className="text-center">gaada apa apa disini, gabut doang belajar nextjs</p>
        <div className="flex gap-5 justify-center mt-10">
            <Link className="bg-sky-500 text-center py-3 px-8 rounded-lg hover:bg-sky-600 duration-300" href={'/auth/login'}>Login</Link>
            <Link className="bg-sky-500 text-center py-3 px-8 rounded-lg hover:bg-sky-600 duration-300" href={'/auth/register'}>Register</Link>
        </div>
      </div>
    </div>
  );
}
