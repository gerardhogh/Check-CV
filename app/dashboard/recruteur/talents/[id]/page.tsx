"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Briefcase, FileText, CheckCircle2, Share2, Bookmark } from "lucide-react";

export default function TalentProfilePage({ params }: { params: { id: string } }) {
  // Mock data for the specific talent
  const talent = {
    id: params.id,
    name: "Alicia PARKER",
    location: "Cotonou, Bénin",
    profession: "Designer web",
    bio: "Passionnée par le design numérique et l'expérience utilisateur, j'accompagne les entreprises dans la création d'interfaces intuitives et esthétiques. J'ai travaillé sur plus de 20 projets web et mobiles au cours des 4 dernières années.",
    imageUrl: "/assets/profile-placeholder.png",
    isVerified: true,
    email: "alicia.parker@example.com",
    skills: ["Figma", "UI/UX Design", "Adobe XD", "HTML/CSS", "Design System", "Prototypage"],
    experience: [
      {
        id: 1,
        role: "Senior UI Designer",
        company: "TechAfrica",
        duration: "2021 - Présent",
        description: "Direction artistique et refonte de l'application mobile principale. Mise en place d'un Design System complet.",
      },
      {
        id: 2,
        role: "Web Designer",
        company: "Agence Créative Cotonou",
        duration: "2018 - 2021",
        description: "Création de maquettes pour sites vitrines et e-commerce. Collaboration étroite avec l'équipe de développement Front-end.",
      }
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            href="/dashboard/recruteur/talents"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-[#32A8D7] dark:hover:text-[#32A8D7] transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la recherche
          </Link>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg mb-4 bg-slate-100 dark:bg-slate-700">
                <Image
                  src={talent.imageUrl}
                  alt={talent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center">
                {talent.name}
                {talent.isVerified && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </h1>
              <p className="text-[#32A8D7] font-semibold mt-1 text-sm">{talent.profession}</p>
              
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-2 text-xs">
                <MapPin className="w-4 h-4" />
                <span>{talent.location}</span>
              </div>

              <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-6"></div>

              <div className="w-full space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-[#32A8D7] hover:bg-[#2a95c2] text-white py-3 px-4 rounded-xl font-bold text-sm transition-colors shadow-sm">
                  <Mail className="w-4 h-4" />
                  Contacter
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-[#32A8D7] text-[#32A8D7] hover:bg-slate-50 dark:hover:bg-slate-700 py-2.5 px-4 rounded-xl font-bold text-sm transition-colors shadow-sm">
                  <Briefcase className="w-4 h-4" />
                  Inviter à un entretien
                </button>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Download CV */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <button className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-3 px-4 rounded-xl font-bold text-sm transition-colors">
                <FileText className="w-5 h-5" />
                Télécharger le CV PDF
              </button>
            </div>
          </div>

          {/* Right Column: Video & Experience */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Video Presentation */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Présentation Vidéo</h2>
              <div className="w-full bg-black rounded-xl aspect-[16/9] overflow-hidden shadow-md relative border border-slate-200 dark:border-slate-700">
                <video 
                  src={talent.videoUrl} 
                  controls 
                  playsInline
                  preload="auto"
                  className="w-full h-full outline-none"
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    if (!isFinite(v.duration) || v.duration === 0) {
                      v.currentTime = 1e101;
                      v.ontimeupdate = () => {
                        v.ontimeupdate = null;
                        v.currentTime = 0.001;
                      };
                    } else {
                      if (v.currentTime === 0) {
                        v.currentTime = 0.001;
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* About & Experience */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">À propos</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
                {talent.bio}
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Expérience professionnelle</h2>
              <div className="space-y-6">
                {talent.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-[#32A8D7] before:rounded-full before:border-2 before:border-white dark:before:border-slate-800 after:content-[''] after:absolute after:left-[5px] after:top-6 after:w-0.5 after:h-full after:bg-slate-200 dark:after:bg-slate-700 last:after:hidden">
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#32A8D7] mt-1 mb-2">
                      <span>{exp.company}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-slate-500 dark:text-slate-400">{exp.duration}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
