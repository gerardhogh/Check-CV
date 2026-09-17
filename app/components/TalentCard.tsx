"use client";

import Image from "next/image";
import { Bookmark, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface TalentCardProps {
  id: string;
  name: string;
  location: string;
  profession: string;
  imageUrl: string;
  isVerified?: boolean;
  onMailClick?: () => void;
}

export default function TalentCard({
  id,
  name,
  location,
  profession,
  imageUrl,
  isVerified = true,
  onMailClick,
}: TalentCardProps) {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md p-3">
      {/* Image container */}
      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
        {isVerified && (
          <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {name}
          </h3>
          <button className="text-[#32A8D7] hover:text-blue-600 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">
          {location}
        </p>
        <p className="text-[10px] text-slate-700 dark:text-slate-300 mb-4">
          <span className="font-bold">Profession :</span> {profession}
        </p>

        <div className="mt-auto flex gap-2 w-full">
          <button
            onClick={onMailClick}
            className="flex-1 py-2 px-1 rounded-[8px] border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-center"
          >
            Envoyer un mail
          </button>
          <Link
            href={`/dashboard/recruteur/talents/${id}`}
            className="flex-1 py-2 px-1 rounded-[8px] bg-[#32A8D7] text-white text-[10px] font-semibold hover:bg-[#2a95c2] transition-colors text-center flex items-center justify-center"
          >
            Voir profil
          </Link>
        </div>
      </div>
    </div>
  );
}
