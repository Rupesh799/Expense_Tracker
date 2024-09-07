import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50 flex flex-col justify-center md:items-center p-3 xl:flex-row ">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Track Every Penny
        <strong className="font-extrabold text-primary sm:block">  Master Your Finances </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
       Monitor your income and expenses with seamless dashboard
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-primary sm:w-auto"
          href="dashboard"
        >
          Get Started
        </a>

       
      </div>
    </div>
  </div>
  <Image src={"/dashboard.png"} alt="dash" height={300} width={700}/>
</section>
  );
};

export default Hero;
