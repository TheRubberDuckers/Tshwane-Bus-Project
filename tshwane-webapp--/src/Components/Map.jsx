import MapComponent from "../Map-Component";
export default function Map({ routes, activeRoute }) {
  return (
    <div className="-mt-46 -ml-400">
      {/*
      <div className="bg-white text-black text-sm w-35 h-8 text-center py-2 rounded-2xl mb-2 absolute z-50 top-20">
        {activeRoute ? `${activeRoute}` : "Select a Route"}
      </div>
       */}

      <div className="-z-50">
        <MapComponent routes={routes} activeRoute={activeRoute}></MapComponent>
      </div>
    </div>
  );
}
