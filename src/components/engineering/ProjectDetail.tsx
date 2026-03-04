"use client";

import Image from "next/image";
import { projects, experiences, skills, type Project, type Experience } from "@/data/engineering";

type ProjectDetailProps = {
  id: string;
  type: "project" | "experience";
  onBack: () => void;
};

export default function ProjectDetail({ id, type, onBack }: ProjectDetailProps) {
  const item: Project | Experience | undefined =
    type === "project"
      ? projects.find((p) => p.id === id)
      : experiences.find((e) => e.id === id);

  if (!item) {
    return (
      <div className="p-8">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors mb-6 flex items-center gap-2"
        >
          ← Back
        </button>
        <p className="text-white/60">Item not found</p>
      </div>
    );
  }

  const itemSkills = item.skillIds
    .map((sid) => skills.find((s) => s.id === sid)?.label)
    .filter(Boolean);

  const isProject = type === "project";
  const projectItem = isProject ? (item as Project) : null;
  const experienceItem = !isProject ? (item as Experience) : null;

  const typeLabel = isProject
    ? projectItem!.categoryLabel ??
      projectItem!.category.charAt(0).toUpperCase() + projectItem!.category.slice(1)
    : experienceItem!.role;

  // Resolve cover image: direct coverImage > first media image
  const coverImage =
    item.coverImage ??
    (isProject
      ? projectItem!.media?.find((m) => m.kind === "image")?.src
      : undefined);

  // Gallery: all media items beyond the cover
  const galleryMedia = isProject
    ? (projectItem!.media ?? []).filter((m) => m.src !== coverImage)
    : [];

  const aboutText = item.description ?? item.summary;
  const isArmedPortraitGallery = isProject && projectItem?.id === "armed";

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm mt-6"
      >
        ← Back to {isProject ? "Projects" : "Experience"}
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <p className="text-xs uppercase tracking-wider text-white/50">
            {typeLabel}
          </p>
          {experienceItem?.timeframe && (
            <span className="text-xs text-white/40">
              {experienceItem.timeframe}
            </span>
          )}
        </div>
        <h2 className="text-3xl font-bold text-white">{item.title}</h2>
        {experienceItem?.org && experienceItem.org !== experienceItem.title && (
          <p className="text-white/60">{experienceItem.org}</p>
        )}
        {experienceItem?.previousRole && (
          <p className="text-xs text-white/40">
            Previously: {experienceItem.previousRole}
          </p>
        )}
      </div>

      {/* Cover image — natural aspect ratio, no cropping */}
      {coverImage && (
        <div
          className="w-full max-w-[1024px] mx-auto overflow-hidden rounded-xl border border-white/10"
          style={projectItem?.coverBg ? { backgroundColor: projectItem.coverBg } : undefined}
        >
          <Image
            src={coverImage}
            alt={`${item.title} cover`}
            width={1200}
            height={675}
            quality={100}
            unoptimized
            className="w-full h-auto"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* About */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">About</h3>
        <p className="text-white/70 leading-relaxed">{aboutText}</p>
      </div>

      {/* Highlights */}
      {item.highlights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Highlights</h3>
          <ul className="space-y-2">
            {item.highlights.map((highlight, i) => (
              <li key={i} className="text-white/60 leading-relaxed flex items-start gap-2">
                <span className="text-white/40 mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technologies */}
      {itemSkills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {itemSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full border border-white/20 text-white/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links — only shown when real links exist */}
      {item.links && item.links.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Links</h3>
          <div className="flex flex-wrap gap-4">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-sm border border-white/20 hover:border-white/40 rounded-lg px-4 py-2 transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Gallery — only shown when there are media items beyond the cover */}
      {galleryMedia.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Gallery</h3>
          <div
            className={
              isArmedPortraitGallery
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                : "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1024px] mx-auto"
            }
          >
            {galleryMedia.map((media, i) => (
              <div
                key={i}
                className={
                  isArmedPortraitGallery && media.kind === "image"
                    ? "relative aspect-[9/16] overflow-hidden rounded-lg border border-white/10 bg-[#0f1c2e]"
                    : "relative aspect-video overflow-hidden rounded-lg border border-white/10"
                }
              >
                {media.kind === "image" ? (
                  <Image
                    src={media.src}
                    alt={media.alt ?? `${item.title} gallery ${i + 1}`}
                    fill
                    quality={100}
                    unoptimized
                    className={isArmedPortraitGallery ? "object-contain p-1" : "object-cover"}
                    sizes="100vw"
                  />
                ) : (
                  <video
                    src={media.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
