// src/components/AboutCard.js
export default function AboutCard({ title, desc, btnText, btnLink }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-full hover:shadow-2xl transition-shadow duration-300">
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
      </div>
      {btnText && btnLink && (
        <a
          href={btnLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block bg-wwfYellow1 hover:bg-wwfYellow2 text-black px-4 py-2 rounded-lg font-semibold transition duration-300"
        >
          {btnText}
        </a>
      )}
    </div>
  );
}
