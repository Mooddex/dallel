import { notFound } from "next/navigation";
import { Service } from "@/types/Services";

// This should match your current list or fetch from API later
const govServices: Service[] = [
  { id: "1", title: "ID Renewal", subtitle: "Renew your National ID card" },
  { id: "2", title: "Passport Services", subtitle: "Apply or renew your passport" },
  { id: "3", title: "Driving License", subtitle: "Renew or replace driving license" },
  { id: "4", title: "Car Licensing", subtitle: "Renew car license & pay fees" },
  { id: "5", title: "Marriage Certificate", subtitle: "Request official documents" },
  { id: "6", title: "Electricity Bills", subtitle: "Check & pay your bills online" },
];

interface ServicePageProps {
  params: { id: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const { id } = params;

  // Find the service with this ID
  const service = govServices.find((s) => s.id === id);

  // If service not found, show 404
  if (!service) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-700 text-lg">{service.subtitle}</p>
    </div>
  );
}
