import React, { useState } from "react";

export default function App() {
  const [fontName, setFontName] = useState("");
  const [fontLink, setFontLink] = useState("");
  const [appliedFont, setAppliedFont] = useState("");
  const [uploadedFontData, setUploadedFontData] = useState(null);
  const [isupload, setIsuplad] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fontLink) {
      const linkTag = document.createElement("link");
      linkTag.rel = "stylesheet";
      linkTag.href = fontLink;
      const existing = [...document.head.querySelectorAll("link")].find(
        (l) => l.href === fontLink
      );
      if (!existing) {
        document.head.appendChild(linkTag);
      }
    }

    if (uploadedFontData) {
      const style = document.createElement("style");
      style.appendChild(
        document.createTextNode(`
          @font-face {
            font-family: '${uploadedFontData.name}';
            src: url('${uploadedFontData.data}') format('truetype');
          }
        `)
      );
      document.head.appendChild(style);
    }

    if (fontName) {
      setTimeout(() => {
        setAppliedFont(fontName);
      }, 500);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      const cleanedFontName = file.name;
      setFontName(cleanedFontName);
      setIsuplad(true);

      setUploadedFontData({
        name: cleanedFontName,
        data: base64,
      });
    };
    reader.readAsDataURL(file);
  };
  let isApplyUploadInput = (fontName && fontLink) || isupload;
  return (
<div className="w-full h-screen text-white flex flex-col items-center justify-start p-6">
      <div className=" flex flex-col items-center justify-start border-2 border-red-500 py-6 shadow-red-200 shadow-2xl px-6">
        <h1 className="text-red-500  text-5xl font-bold">Font Changer</h1>

        <p
          className="text-red-300 w-full max-w-3xl border-2 border-white p-4 rounded-md mt-10 text-justify leading-relaxed transition-all duration-500"
          style={{ fontFamily: `"${appliedFont}", cursive` }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </p>

        <form
          className="mt-8 w-full max-w-md flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter Font Name (e.g., Roboto)"
            className="p-3 rounded-md bg-red-100 text-black focus:outline-none focus:ring-2 focus:ring-red-400"
            value={fontName}
            onChange={(e) => setFontName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Font Link (Google Fonts URL)"
            className="p-3 rounded-md bg-red-100 text-black focus:outline-none focus:ring-2 focus:ring-red-400"
            value={fontLink}
            onChange={(e) => setFontLink(e.target.value)}
          />
          <p className="text-center">OR</p>
          <input
            type="file"
            accept=".ttf"
            className="mb-4 bg-red-300 text-black p-3 rounded"
            onChange={handleFileUpload}
            disabled={fontLink}
          />
          <input
            type="submit"
            disabled={!isApplyUploadInput}
            value="Apply Font"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 
    ${
      isApplyUploadInput
        ? "bg-red-500 hover:bg-red-600 cursor-pointer shadow-md"
        : "bg-red-300 cursor-not-allowed opacity-60"
    }`}
          />
        </form>
      </div>
    </div>
  );
}
