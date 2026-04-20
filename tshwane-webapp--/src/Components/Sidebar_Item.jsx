export default function Sidebar_Item({ route, active, onClick }) {
  return (
    <div className="">
      <div
        className={`sidebar-item ${active ? "active" : ""} border-b-2 border-[#d8f3dc] h-12 hover:bg-green-100 w-80 pt-4 text-sm`}
        onClick={onClick}
      >
        {route.id}
      </div>
    </div>
  );
}
