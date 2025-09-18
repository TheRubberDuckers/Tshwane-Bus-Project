export default function Route_line(
    {
        route, active
    }
){
    const style = {
        backgroundColor: route.color,
        height: active? "6px" : "3px",
        width: "60%",
        margin: "20px auto",
        borderRadius: "4px",
        transition: "all 0.3s",
    };
    return <div style= {style}></div>
}