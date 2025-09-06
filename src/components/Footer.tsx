export default function Footer() {
    return(
        <footer className="text-gray-600 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    {/* <!-- Logo --> */}
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <div className="w-10 h-10 text-white p-2 bg-green-500 rounded-full flex items-center justify-center">
        D
      </div>
      <span className="ml-3 text-xl">Dallel</span>
    </a>

    {/* <!-- Copyright --> */}
    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
      © 2025 Dallel 
    </p>

    {/* <!-- Social links --> */}
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-4">
      <a className="text-gray-500 hover:text-green-500">Facebook</a>
      <a className="text-gray-500 hover:text-green-500">Twitter</a>
      <a className="text-gray-500 hover:text-green-500">Instagram</a>
      <a className="text-gray-500 hover:text-green-500">LinkedIn</a>
    </span>
  </div>
</footer>

    )
}