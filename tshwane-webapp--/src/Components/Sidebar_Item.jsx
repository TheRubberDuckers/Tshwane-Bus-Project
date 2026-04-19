export default function Sidebar_Item({ route, active, onClick }) {
  return (
    <div className="">
      <div
        className={`sidebar-item ${active ? "active" : ""} border-b border-[#d8f3dc] h-12 hover:bg-[#d8f3dc] w-80 pt-4 text-sm pl-2`}
        onClick={onClick}
      >
        {route.name}
      </div>
    </div>
  );
}
