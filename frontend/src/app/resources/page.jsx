"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function ResourcePage() {
  const [activeSection, setActiveSection] = useState("videos");
  const [searchQuery, setSearchQuery] = useState("")

  

  const videos = [
    {
      title: "What is mental health?",
      embed: "https://www.youtube.com/embed/G0zJGDokyWQ",
    },
    {
      title: "How to manage your mental health | Leon Taylor",
      embed: "https://www.youtube.com/embed/rkZl2gsLUp4",
    },
    {
      title: "Why Mental Health Is Insanely Complex",
      embed: "https://www.youtube.com/embed/X_90QQ2QWUc",
    },
    {
      title: "Psychologists Debunk 25 Mental-Health Myths",
      embed: "https://www.youtube.com/embed/Ii5m8Ta1iBY",
    },
  ];

  const audios = [
    {
      title: "Relaxation Audio",
      src: "/audio/*", //will be extracted locally from public folder
    },
  ];

  const guides = [
    {
      title: "Mental Wellness Guide",
      file: "/guides/*.pdf", //extract locally
    },
  ];

  const searchedVid = videos.filter((vid) => vid.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
  const searchedAud = audios.filter((audio) => audio.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const searchedGuide = guides.filter((guide) => guide.title.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">Psychoeducational Resource Hub</h1>
      <Input
        type="text"
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />
      <div className="flex space-x-4">
        <Button
          variant={activeSection === "videos" ? "default" : "outline"}
          onClick={() => setActiveSection("videos")}
        >
          Videos
        </Button>
        <Button
          variant={activeSection === "audios" ? "default" : "outline"}
          onClick={() => setActiveSection("audios")}
        >
          Audios
        </Button>
        <Button
          variant={activeSection === "guides" ? "default" : "outline"}
          onClick={() => setActiveSection("guides")}
        >
          Guides
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        {activeSection === "videos" && (
          <div className="space-y-4">
            {searchedVid.map((vid, i) => (
              <div key={i} className="aspect-video">
                <iframe
                  src={vid.embed}
                  title={vid.title}
                  className="w-full h-full rounded-xl shadow"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}

        {activeSection === "audios" && (
          <div className="space-y-4">
            {searchedAud.map((audio, i) => (
              <div key={i} className="space-y-2">
                <p className="font-medium">{audio.title}</p>
                <audio controls className="w-full">
                  <source src={audio.src} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        )}

        {activeSection === "guides" && (
          <div className="space-y-4">
            {searchedGuide.map((guide, i) => (
              <a
                key={i}
                href={guide.file}
                target="_blank"
                className="block p-4 border rounded-lg shadow hover:bg-gray-100"
              >
                📄 {guide.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
