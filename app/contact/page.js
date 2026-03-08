export const metadata = {
  title: "Contact | 8 CPC Calculator",
  description:
    "Contact the team behind 8cpccalculator.com for feedback or suggestions."
};

export default function Contact() {
  return (

    <main className="max-w-md mx-auto px-4 py-6">

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">

        <h1 className="text-lg font-semibold">
          Contact
        </h1>

        <p className="text-sm text-gray-700 leading-relaxed">
          If you have suggestions, feedback, or questions about the salary
          calculator, feel free to reach out.
        </p>

        <p className="text-sm text-gray-700 leading-relaxed">
          Email: 
          <span className="text-blue-600 ml-1">
            support@8cpccalculator.com
          </span>
        </p>

        <p className="text-sm text-gray-700 leading-relaxed">
          We aim to respond to queries as soon as possible.
        </p>

      </div>

    </main>

  );
}