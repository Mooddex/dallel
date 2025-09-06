import Link from "next/link";
import Signup from "./Signup";

export default function Landing() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Dallel
          </h1>
          <p className="leading-relaxed mt-4">
            Before you go ask about the papers, expenses and the route .</p>
        </div>
        <Signup />
      </div>
    </section>
  );
}
