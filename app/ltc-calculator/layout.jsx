export default function LTCLayout({ children }) {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
    </div>
  );
}