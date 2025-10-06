export default function Sidebar_Item({route,active, onClick}){
    return (
        <div 
            className={`sidebar-item ${active ? "active" : ""}`}
            onClick={onClick}
        >
            {route.name}


        </div>
    );
}