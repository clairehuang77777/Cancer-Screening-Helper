import hospitalData from '../../../assets/data/hospitalData.json' 
import { useContext , useEffect, useState } from 'react';
import { UserLatContext } from '../../../UserLatContext';
import { UserLngContext } from '../../../UserLngContext';

export const TitleAndMap = ({district}) => {
  const { UserLat } = useContext(UserLatContext)
  const { UserLng } = useContext(UserLngContext)

  useEffect(() => {
    const districtWithSuffix = 
      district === '中' || district === '西' || district === '南' || district === '北' || district === '東'
        ? `${district}區`
        : district;


    //篩選符合district的data
    const filteredHospitalData = hospitalData.filter((hospital) => hospital.District === districtWithSuffix)

  
    // 加載 Google Maps API
    const loadGoogleMaps = () => {
      if(!window.google){
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHXg8iyfRi6rYFMn6eBK42TRd5_GjT4TM&v=weekly&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.setAttribute('loading', 'async'); // 最佳實踐
      document.body.appendChild(script);
    } else {
      initMap()
    }
  }

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
      } else {
        console.error('Google Maps 未加載或沒有篩選到醫院數據');
      }
    };

  loadGoogleMaps();
  }, [UserLat, UserLng]);

  return (
    <div>
      <h3>{district}區附近可篩檢的診所：</h3>
      <div id="map"></div>
    </div>
  );
};