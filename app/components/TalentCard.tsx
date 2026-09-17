import Image from "next/image";
import { Bookmark, CheckCircle2 } from "lucide-react";

interface TalentCardProps {
  name: string;
  location: string;
  profession: string;
  imageUrl: string;
  isVerified?: boolean;
}

export default function TalentCard({
  name,
  location,
  profession,
  imageUrl,
  isVerified = true,
}: TalentCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] bg-pink-300">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
        {/* Verification badge */}
        {isVerified && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{name}</h3>
            <p className="text-xs text-slate-500 mt-1">{location}</p>
          </div>
          <button className="text-[#32A8D7] hover:text-[#2a95c2] transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-slate-600 mb-4 font-medium">
          Profession : <span className="font-normal text-slate-500">{profession}</span>
        </p>
        
        <div className="mt-auto flex gap-2 w-full">
          <button className="flex-1 py-1.5 px-2 text-xs font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors">
            Envoyer un mail
          </button>
          <button className="flex-1 py-1.5 px-2 text-xs font-medium bg-[#32A8D7] text-white rounded-md hover:bg-[#2a95c2] transition-colors">
            Voir profil
          </button>
        </div>
      </div>
    </div>
  );
}
