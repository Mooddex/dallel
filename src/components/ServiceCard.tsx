import { Service } from "@/types/Services";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link key={service.id} href={`/services/${service.id}`}>
      <div className="w-56 h-72 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* "window buttons" row */}
        <div className="flex p-3 gap-2">
          <span className="bg-red-500 inline-block w-3 h-3 rounded-full"></span>
          <span className="bg-yellow-500 inline-block w-3 h-3 rounded-full"></span>
          <span className="bg-green-500 inline-block w-3 h-3 rounded-full"></span>
        </div>

        {/* Content */}
        <div className="bg-white shadow-md hover:shadow-xl transition rounded-lg p-6 flex flex-col items-center text-center w-56 h-56 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {service.title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{service.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
