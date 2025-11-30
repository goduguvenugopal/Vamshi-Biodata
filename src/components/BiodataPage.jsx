import { useEffect, useState } from "react";
import { biodata } from "../biodata";

const BiodataPage = () => {
  const [index, setIndex] = useState(0);
  const [zoomImg, setZoomImg] = useState(null);

  // Helper to rotate index safely using modulo
  const updateIndex = (newIndex) => {
    const total = biodata.images.length;
    const safeIndex = ((newIndex % total) + total) % total; // never negative
    setIndex(safeIndex);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      updateIndex(index + 1);
    }, 2500);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-xl p-6 border rounded-lg relative">
        
        {/* Header */}
        <h1 className="text-center text-2xl font-bold text-orange-700 mb-6">
          BIO DATA
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Section */}
          <div className="flex-1 text-gray-800 order-2 md:order-1">
            <h2 className="text-xl font-bold mb-4 text-orange-700">
              {biodata.name}
            </h2>

            <ul className="space-y-2">
              <li><strong>Date of Birth:</strong> {biodata.dob}</li>
              <li><strong>Place of Birth:</strong> {biodata.placeOfBirth}</li>
              <li><strong>Rashi:</strong> {biodata.rashi}</li>
              <li><strong>Religion:</strong> {biodata.religion}</li>
              <li><strong>Caste:</strong> {biodata.caste}</li>
              <li><strong>Complexion:</strong> {biodata.complexion}</li>
              <li><strong>Height:</strong> {biodata.height}</li>
              <li><strong>Education:</strong> {biodata.education}</li>
              <li><strong>Occupation:</strong> {biodata.occupation}</li>
            </ul>

            <h3 className="mt-6 font-bold text-orange-700">Family Details</h3>
            <ul className="space-y-1">
              <li><strong>Father's Name:</strong> {biodata.family.fatherName}</li>
              <li><strong>Occupation:</strong> {biodata.family.fatherOccupation}</li>
              <li><strong>Mother's Name:</strong> {biodata.family.motherName}</li>
              <li><strong>Occupation:</strong> {biodata.family.motherOccupation}</li>
              <li><strong>No. of Sisters:</strong> {biodata.family.sisters}</li>
            </ul>

            <h3 className="mt-6 font-bold text-orange-700">Contact Details</h3>
            <ul className="space-y-1">
              <li><strong>Phone:</strong> {biodata.contact.phone}</li>
              <li><strong>Address:</strong> {biodata.contact.address}</li>
            </ul>
          </div>

          {/* Right Section - Image Carousel */}
          <div className="w-full order-1 md:w-60 relative group cursor-pointer">

            {/* Image */}
            <img
              src={biodata.images[index]}
              alt="profile"
              className="w-full h-72 object-cover rounded-md shadow-md hover:scale-105 duration-300"
              onClick={() => {
                console.log("IMAGE CLICKED");
                setZoomImg(biodata.images[index]);
              }}
            />

            {/* Manual Navigation Overlay */}
            <div className="absolute inset-0 flex justify-between items-center px-2 
              opacity-0 group-hover:opacity-100 duration-300 pointer-events-none">

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
