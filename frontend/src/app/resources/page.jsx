"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ResourcePage() {
  const [activeSection, setActiveSection] = useState("videos");

  const videos = [
    {
      title: "Mental Therapy Session",
      embed: "https://www.youtube.com/embed/G0zJGDokyWQ",
    },
      {
      title: "Mental Therapy Session",
      embed: "https://www.youtube.com/embed/G0zJGDokyWQ",
    },
      {
      title: "Mental Therapy Session",
      embed: "https://www.youtube.com/embed/G0zJGDokyWQ",
    },
      {
      title: "Mental Therapy Session",
      embed: "https://www.youtube.com/embed/G0zJGDokyWQ",
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
      file: "/guides/wellness-guide.pdf", //extract locally 
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">Psychoeducational Resource Hub</h1>

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
            {videos.map((vid, i) => (
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
            {audios.map((audio, i) => (
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
            {guides.map((guide, i) => (
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

