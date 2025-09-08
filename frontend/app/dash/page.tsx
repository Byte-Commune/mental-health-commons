"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dash() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6 text-center text-black">Welcome to Mental Health Commons</h1>
                <p className="mb-6 text-gray-700 text-center">Please log in or sign up to access your dashboard.</p>
                <div className="flex gap-4">
                    <Button className="px-6 py-3 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 shadow" onClick={() => router.push("/login")}>Login</Button>
                    <Button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 shadow" onClick={() => router.push("/signup")}>Signup</Button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
            <h1 className="text-2xl font-bold mb-8 text-center text-black">Welcome to your Dashboard!</h1>

            <div className="flex flex-col gap-6 w-full max-w-md">
                <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <h2 className="text-lg font-semibold mb-2 text-black">Your Upcoming Appointments</h2>
                    <p className="mb-4 text-gray-700">Our counsellor will be in touch with you soon.</p>
                    {/* TODO: Fetch and display user's appointments here */}
                    <Button className="w-full">Schedule New</Button>
                </Card>

                <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <h2 className="text-lg font-semibold mb-2 text-black">Chat with our AI Support</h2>
                    <p className="mb-4 text-gray-700">Have a conversation with our AI support for instant assistance.</p>
                    <Button className="w-full">Start Chat</Button>
                </Card>

                <Card className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
                    <h2 className="text-lg font-semibold mb-2 text-black">Resources</h2>
                    <p className="mb-4 text-gray-700">Have a look at our curated resources to support your mental health journey.</p>
                    <Button className="w-full">Explore Resources</Button>
                </Card>
            </div>
        </div>
    );
}