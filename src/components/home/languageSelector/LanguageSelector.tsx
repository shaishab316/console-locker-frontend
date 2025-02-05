"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "de", name: "German", flag: "/flag/germany.png" },
  { code: "en", name: "English", flag: "/flag/usa.png" },
  { code: "fr", name: "French", flag: "/flag/french.png" },
  { code: "es", name: "Spanish", flag: "/flag/spanish.png" },
];

interface LanguageType {
  code: string;
  name: string;
  flag: string;
}

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageType>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectLanguage = (lang: LanguageType) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Language Display */}
      <button
        className="flex items-center gap-2 px-3 py-2 bg-transparent w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={selectedLang.flag}
          width={20}
          height={20}
          alt={selectedLang.name}
        />
        <span className="text-sm">{selectedLang.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-md">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectLanguage(lang)}
            >
              <Image src={lang.flag} width={20} height={20} alt={lang.name} />
              <span className="ml-1.5 text-sm">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

// "use client";
// import Image from "next/image";
// import { useState } from "react";

// const languages = [
//   { code: "de", name: "German", flag: "/flag/germany.png" },
//   { code: "en", name: "English", flag: "/flag/usa.png" },
//   { code: "fr", name: "French", flag: "/flag/french.png" },
//   { code: "es", name: "Spanish", flag: "/flag/spanish.png" },
// ];

// interface LanguageType {
//   code: string;
//   name: string;
//   flag: string;
// }

// const LanguageSelector = () => {
//   const [selectedLang, setSelectedLang] = useState(languages[0]);
//   const [isOpen, setIsOpen] = useState(false);

//   const selectLanguage = (lang: LanguageType) => {
//     setSelectedLang(lang);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       {/* Selected Language Display */}
//       <button
//         className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-lg shadow-sm bg-white w-full"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Image
//           src={selectedLang.flag}
//           width={20}
//           height={20}
//           alt={selectedLang.name}
//         />
//         <span className="text-sm">{selectedLang.name}</span>
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-md">
//           {languages.map((lang) => (
//             <div
//               key={lang.code}
//               className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => selectLanguage(lang)}
//             >
//               <Image src={lang.flag} width={20} height={20} alt={lang.name} />
//               <span className="ml-1.5 text-sm">{lang.name}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LanguageSelector;
