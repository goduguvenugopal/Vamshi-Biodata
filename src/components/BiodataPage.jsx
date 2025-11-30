import { useEffect, useState } from "react";
import { biodata } from "../biodata";
import { translations } from "../translations";

const BiodataPage = () => {
  const [index, setIndex] = useState(0);
  const [zoomImg, setZoomImg] = useState(null);
  const [lang, setLang] = useState("en"); // default language

  // Labels (BIO DATA, Family Details, etc.)
  const t = translations[lang];

  // Actual biodata content based on selected language
  const d = biodata[lang];

  // Fix image looping
  const updateIndex = (newIndex) => {
    const total = d.images.length;
    const safeIndex = ((newIndex % total) + total) % total;
    setIndex(safeIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateIndex(index + 1);
    }, 2500);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-xl p-6 border rounded-lg relative">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <select
            className="border p-2 rounded bg-white"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-bold text-orange-700 mb-6">
          {t.bioData}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 text-gray-800 order-2 md:order-1">
            <h2 className="text-xl font-bold mb-4 text-orange-700">{d.name}</h2>

            <ul className="space-y-2">
              <li>
                <strong>{t.dob}:</strong> {d.dob}
              </li>
              <li>
                <strong>{t.pob}:</strong> {d.placeOfBirth}
              </li>
              <li>
                <strong>{t.rashi}:</strong> {d.rashi}
              </li>
              <li>
                <strong>{t.religion}:</strong> {d.religion}
              </li>
              <li>
                <strong>{t.caste}:</strong> {d.caste}
              </li>
              <li>
                <strong>{t.complexion}:</strong> {d.complexion}
              </li>
              <li>
                <strong>{t.height}:</strong> {d.height}
              </li>
              <li>
                <strong>{t.education}:</strong> {d.education}
              </li>
              <li>
                <strong>{t.occupation}:</strong> {d.occupation}
              </li>
            </ul>

            <h3 className="mt-6 font-bold text-orange-700">
              {t.familyDetails}
            </h3>
            <ul className="space-y-1">
              <li>
                <strong>{t.fatherName}:</strong> {d.family.fatherName}
              </li>
              <li>
                <strong>{t.fatherOccupation}:</strong>{" "}
                {d.family.fatherOccupation}
              </li>
              <li>
                <strong>{t.motherName}:</strong> {d.family.motherName}
              </li>
              <li>
                <strong>{t.motherOccupation}:</strong>{" "}
                {d.family.motherOccupation}
              </li>
              <li>
                <strong>{t.sisters}:</strong> {d.family.sisters}
              </li>
            </ul>

            <h3 className="mt-6 font-bold text-orange-700">
              {t.contactDetails}
            </h3>
            <ul className="space-y-1">
              <li>
                <strong>{t.phone}:</strong>{" "}
                <a
                  href={`tel:${d.contact.phone}`}
                  className="text-blue-600 underline"
                >
                  {d.contact.phone}
                </a>
              </li>

              <li>
                <strong>{t.address}:</strong> {d.contact.address}
              </li>
            </ul>
          </div>

          {/* Right Section - Image Carousel */}
          <div className="w-full order-1 md:w-60 relative group cursor-pointer">
            <img
              src={d.images[index]}
              alt="profile"
              className="w-full h-72 object-cover rounded-md shadow-md hover:scale-105 duration-300"
              onClick={() => setZoomImg(d.images[index])}
            />

            {/* Navigation Overlay (buttons clickable, overlay not blocking image) */}
            <div
              className="absolute inset-0 flex justify-between items-center px-2 
              opacity-0 group-hover:opacity-100 duration-300 pointer-events-none"
            >
              <button
                className="bg-black bg-opacity-50 text-white px-3 py-1 rounded pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  updateIndex(index - 1);
                }}
              >
                Prev
              </button>

              <button
                className="bg-black bg-opacity-50 text-white px-3 py-1 rounded pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  updateIndex(index + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Zoom Modal */}
        {zoomImg && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[999]"
            onClick={() => setZoomImg(null)}
          >
            <img
              src={zoomImg}
              alt="zoom"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BiodataPage;
