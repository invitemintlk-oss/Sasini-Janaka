import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    if (!guestName.trim()) {
      alert("Please enter a guest name.");
      return;
    }
    const origin = window.location.origin;
    const link = `${origin}/?p=${encodeURIComponent(prefix)}&n=${encodeURIComponent(guestName)}`;
    setGeneratedLink(link);
  };

  const generateMessage = (link: string) => {
    const greeting = prefix.toLowerCase() === 'dear' ? `Dear ${guestName}` : `Dear ${prefix} ${guestName}`;
    return `${greeting} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\n📅 Date: January 28, 2027 (Thursday)\n⏰ Time: 12:00 PM Onwards\n📍 Venue: Hotel Sanara Mandira (Ground Floor)\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Sasini & Janaka`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy to clipboard.");
    });
  };

  return (
    <div className="h-[100dvh] bg-theme-50 flex flex-col p-4 md:p-8 font-montserrat overflow-y-auto py-8 w-full">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-theme-200 w-full max-w-2xl m-auto shrink-0">
        <h1 className="text-3xl font-cinzel text-theme-900 mb-6 text-center font-bold">Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">Select Prefix</label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full p-3 border border-theme-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-500 bg-white"
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full p-3 border border-theme-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-500"
            />
          </div>

          <button
            onClick={handleGenerateLink}
            className="w-full bg-theme-800 text-white p-4 rounded-full font-bold uppercase tracking-widest hover:bg-theme-900 transition-colors shadow-md"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 pt-8 border-t border-theme-200 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">Generated Link Format:</label>
                <div className="p-3 bg-stone-100 rounded-lg break-all text-sm font-mono text-stone-700">
                  {generatedLink}
                </div>
                <button
                  onClick={() => copyToClipboard(generatedLink)}
                  className="bg-stone-200 text-stone-800 p-2 rounded font-bold text-xs uppercase tracking-wider hover:bg-stone-300 transition-colors self-start"
                >
                  Copy Link Only
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">Generated Invitation Message Template:</label>
                <div className="p-4 bg-stone-100 rounded-lg text-sm text-stone-700 whitespace-pre-wrap border border-stone-200">
                  {generateMessage(generatedLink)}
                </div>
                <button
                  onClick={() => copyToClipboard(generateMessage(generatedLink))}
                  className="bg-theme-600 text-white p-3 rounded font-bold text-sm uppercase tracking-wider hover:bg-theme-700 transition-colors w-full shadow-sm mt-2"
                >
                  Copy Full Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
