"use client";

import Image from "next/image";
import { Bookmark, BadgeCheck } from "lucide-react";

export interface TalentCardProps {
  id?: string | number;
  name: string;
  location: string;
  profession: string;
  imageUrl: string;
  isVerified?: boolean;
  isFavorite?: boolean;
  onFavorite?: (id?: string | number) => void;
  onSendEmail?: (id?: string | number, name?: string) => void;
  onViewProfile?: (id?: string | number) => void;
  /** Override the destination URL for "Voir profil". Defaults to /dashboard/recruteur/talents/[id] */
  profileHref?: string;
}

export default function TalentCard({
  id,
  name,
  location,
  profession,
  imageUrl,
  isVerified = true,
  isFavorite = false,
  onFavorite,
  onSendEmail,
  onViewProfile,
  profileHref,
}: TalentCardProps) {
  const destination = profileHref ?? (id ? `/dashboard/recruteur/talents/${id}` : undefined);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group">
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] bg-pink-100 overflow-hidden">
        <Image
          src={imageUrl || "/assets/candidate-alicia-parker.jpg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-102 transition-transform duration-300"
        />
        {/* Verification badge */}
        {isVerified && (
          <div
            className="absolute top-2.5 right-2.5 bg-white/95 rounded-full p-0.5 shadow-sm flex items-center justify-center"
            title="Profil certifié et vérifié"
          >
            <BadgeCheck className="w-5 h-5 text-emerald-500 fill-emerald-500 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Name & Bookmark */}
        <div className="flex justify-between items-start mb-1.5">
          <div className="min-w-0 pr-2">
            <h3 className="font-bold text-slate-900 text-base leading-snug truncate">
              {name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-normal truncate">
              {location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onFavorite?.(id)}
            aria-label="Ajouter aux favoris"
            className="text-[#32A8D7] hover:text-[#258eb8] p-1 -mr-1 -mt-1 rounded-lg hover:bg-sky-50 transition-colors shrink-0"
          >
            <Bookmark
              className="w-5 h-5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Profession */}
        <p className="text-xs text-slate-700 font-semibold mb-4 mt-1">
          Profession :{" "}
          <span className="font-normal text-slate-500">{profession}</span>
        </p>

        {/* Action buttons */}
        <div className="mt-auto flex items-center gap-2 w-full pt-1">
          <button
            type="button"
            onClick={() => onSendEmail?.(id, name)}
            className="flex-1 py-2 px-2 text-xs font-semibold border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors text-center truncate"
          >
            Envoyer un mail
          </button>

          {destination ? (
            <a
              href={destination}
              onClick={() => onViewProfile?.(id)}
              className="flex-1 py-2 px-2 text-xs font-semibold bg-[#32A8D7] hover:bg-[#2896c2] active:bg-[#2283aa] text-white rounded-md transition-colors shadow-xs hover:shadow text-center truncate"
            >
              Voir profil
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onViewProfile?.(id)}
              className="flex-1 py-2 px-2 text-xs font-semibold bg-[#32A8D7] hover:bg-[#2896c2] active:bg-[#2283aa] text-white rounded-md transition-colors shadow-xs hover:shadow text-center truncate"
            >
              Voir profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
