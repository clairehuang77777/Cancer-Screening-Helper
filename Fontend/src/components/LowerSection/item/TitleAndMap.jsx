import hospitalData from '../../../assets/data/hospitalData.json' 
import { useContext } from 'react';
import { UserLatContext } from '../../../UserLatContext';
import { UserLngContext } from '../../../UserLngContext';
import { useEffect } from 'react';

export const TitleAndMap = ({district}) => {
  //篩選出只有西區的結果
  const filteredHospitalData = hospitalData.filter((hospital) => hospital.District === district)
  // 把西區的結果印在地圖上
  const { UserLat } = useContext(UserLatContext)
  const { UserLng } = useContext(UserLngContext)

  // const UserLat = 24.1366303;
  // const UserLng = 120.665992;

  useEffect(() => {
    // 加載 Google Maps API
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHXg8iyfRi6rYFMn6eBK42TRd5_GjT4TM&v=weekly&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    console.log(UserLat, UserLng)
    // 初始化地圖
    const initMap = async () => {
      if (window.google) {

        // 載入標記套件
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        //The Center: User Location
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: UserLat, lng: UserLng },
          zoom: 14,
          mapId: "46afe031b4dadb46",
        });

        // The marker, positioned at hospital in distr
        filteredHospitalData.forEach((hospital)=>{
          const markerPosition = {lat: hospital.Lat, lng: hospital.Lng}
          new AdvancedMarkerElement({
            map: map,
            position: markerPosition,
            title: hospital.Name,
          })
        });
      }
    };

    if (!window.google) {
      loadGoogleMaps();
    } else {
      initMap();
    }
  }, [district]);

  return (
    <div>
      <h3>{district}附近可篩檢的診所：</h3>
      <div id="map"></div>
    </div>
  );
};