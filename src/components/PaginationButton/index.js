export default function PaginationButton({
  index,
  currentPage,
  handleChangePage,
}) {
  return (
    <div className="flex flex-col w-12 h-12">
      <button
        key={index}
        className={`p-2 h-full w-full text-base font-semibold text-black ${
          index === currentPage
            ? "border-b-blue-600 border-b-4 rounded-sm"
            : "hover:bg-slate-200 rounded-md"
        }`}
        onClick={() => handleChangePage(index)}
      >
        {index + 1}
      </button>
    </div>
  );
}
