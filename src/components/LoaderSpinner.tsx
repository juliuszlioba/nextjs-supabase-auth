export default function LoaderSpinner() {
  return (
    <div className="mx-auto p-2 text-gray-800 dark:text-gray-200">
      <svg
        className="ringIco"
        viewBox="25 25 50 50"
        strokeWidth="3"
        width="50"
        height="50"
        stroke="currentColor"
      >
        <circle cx="50" cy="50" r="20" />
      </svg>
    </div>
  );
}
