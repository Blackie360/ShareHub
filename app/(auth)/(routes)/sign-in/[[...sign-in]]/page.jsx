import { SignIn } from "@clerk/nextjs";
 import Image from 'next/image'
export default function Page() {
  return (
 
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt="Night"
        width={50}
        height={50}
        src="folder.png"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="/">
          <span className="text-blue-500">shareHub </span>
          <div className="md:flex md:items-center md:gap-12">
   <Image
      src="/folder.png"
      width={50}
    height={40} 
    alt="logo"
  />
</div>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to <span className=" text-blue-600">shareHub 📁</span>
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
        ShareHub is a modern and user-friendly file sharing application.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
        <div className="md:flex md:items-center md:gap-12">
   <Image
      src="/logo.svg"
      width={50}
    height={40} 
    alt="logo"
  />
</div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to <span className=" text-blue-600">shareHub 📁</span>
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
          ShareHub is a modern and user-friendly file sharing application.
          </p>
        </div>

        <SignIn />
      </div>
    </main>
  </div>
</section>
  
);
}