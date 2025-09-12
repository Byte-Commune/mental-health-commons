"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResourcePage() {
  const [activeSection, setActiveSection] = useState("videos");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // debouncing user's query
  useEffect(() => {
    console.log(1);
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      console.log(2);
    }, 300);

    return () => {
      clearTimeout(handler);
      console.log("cleared handler because user typed again");
    };
  }, [searchTerm]);

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
    { title: "Relaxation Audio", src: "/audio/*" }, // from public folder
  ];

  const guides = [
    { title: "Mental Wellness Guide", file: "/guides/wellness-guide.pdf" },
  ];

  // Filter based on debouncedTerm
  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(debouncedTerm.toLowerCase())
  );
  const filteredAudios = audios.filter(a =>
    a.title.toLowerCase().includes(debouncedTerm.toLowerCase())
  );
  const filteredGuides = guides.filter(g =>
    g.title.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">Psychoeducational Resource Hub</h1>


      <Input
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {filteredVideos.length > 0 ? (
             filteredVideos.map((vid, i) => (
        <div key={i} className="w-full">
          <div className="w-full aspect-video">
                    <iframe
              src={vid.embed}
              title={vid.title}
              className="w-full h-full rounded-xl shadow-lg"
              allowFullScreen
            />
                  </div>
          <p className="mt-2 text-lg font-semibold text-left line-clamp-2">{vid.title}</p>
            </div>
      ))
    ) : (
             <p className="text-gray-500 text-center col-span-full">No videos found.</p>
    )}
  </div>
)}

        {activeSection === "audios" && (
          <div className="space-y-4">
            {filteredAudios.length > 0 ? (
              filteredAudios.map((audio, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-medium">{audio.title}</p>
                  <audio controls className="w-full">
                    <source src={audio.src} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No audios found.</p>
            )}
          </div>
        )}

        {activeSection === "guides" && (
          <div className="space-y-4">
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide, i) => (
                <a
                  key={i}
                  href={guide.file}
                  target="_blank"
                  className="block p-4 border rounded-lg shadow hover:bg-gray-100"
                >
                  📄 {guide.title}
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-center">No guides found.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}