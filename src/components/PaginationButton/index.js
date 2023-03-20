export default function PaginationButton({
  index,
  currentPage,
  handleChangePage,
}) {
  return (
    <div className="flex flex-col w-10 h-10 dark:bg-gray-800">
      <button
        key={index}
        className={`p-2 h-full w-full text-base font-semibold text-black dark:text-branco ${
          index === currentPage
            ? "border-b-azul-hyde border-b-4 rounded-sm"
            : "hover:bg-slate-200 dark:hover:bg-gray-900 rounded-md"
        }`}
        onClick={() => handleChangePage(index)}
      >
        {index + 1}
      </button>
    </div>
  );
}
