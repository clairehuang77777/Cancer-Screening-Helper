import hospitalData from '../../../assets/data/hospitalData.json' 
import { useContext , useEffect, useState } from 'react';
import { UserLatContext } from '../../../UserLatContext';
import { UserLngContext } from '../../../UserLngContext';

export const TitleAndMap = ({district}) => {
  const { UserLat } = useContext(UserLatContext)
  const { UserLng } = useContext(UserLngContext)
  const [ placeID, setPlaceID] = useState("")

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

        // 使用者位置為地圖中心
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: UserLat, lng: UserLng },
          zoom: 14,
          mapId: "46afe031b4dadb46",
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }], // 隱藏所有 POI 點
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }], // 隱藏所有交通相關標記
            },
          ]
        });

        // 顯示篩選出的醫院標記
        filteredHospitalData.forEach((hospital) => {
          //用data內的經緯度建立標記
          const markerPosition = { lat: hospital.Lat, lng: hospital.Lng };
          
          // 建立 AdvancedMarkerElement 標記
          const marker = new AdvancedMarkerElement({
                  map: map,
                  position: markerPosition,
                  title: hospital.Name,
                  zIndex: 1000,
                });
            
          // 向 Google Places API 發送請求以獲取詳細資訊
          const request = {
            placeId: hospital.placeID, // 必須有 placeID
            fields: ["name", "formatted_address", "international_phone_number", "googleMapsUri", "geometry"],
          };
          const infowindow = new google.maps.InfoWindow();
          const infowindowContent = document.getElementById("infowindow-content");

          infowindow.setContent(infowindowContent);
          const service = new google.maps.places.PlacesService(map);

          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && 
                place &&
                place.geometry &&
                place.geometry.location
              ) {
 
              //綁定 gmp-click 事件到 AdvancedMarkerElement
              // google.maps.event.addListener(marker, "click", () => {

              marker.addListener(marker, "click", () => {
                const content = document.createElement("div");

                const nameElement = document.createElement("h2");
                nameElement.textContent = place.name || "名稱不可用";
                content.appendChild(nameElement);

                const placeAddressElement = document.createElement("p");
                placeAddressElement.textContent = place.formatted_address || "地址不可用";
                content.appendChild(placeAddressElement);

                const phoneNumberElement = document.createElement("p");
                phoneNumberElement.textContent = place.international_phone_number || "電話不可用";
                content.appendChild(phoneNumberElement);

                const placeURL = document.createElement("a");
                placeURL.href = place.googleMapsUri || "#";
                placeURL.textContent = "查看地圖";
                content.appendChild(placeURL);

                infowindowContent.children.namedItem("place-name").textContent = place.name;
    infowindowContent.children.namedItem("place-id").textContent =
      place.place_id;
    infowindowContent.children.namedItem("place-address").textContent =
      place.formatted_address;
      
                infowindow.setContent(content);
                infowindow.open(map, marker);
              });
            } else {
              console.error(`無法獲取地點詳細資訊: ${status}`);
            }
          });
    
    })
  }}

  loadGoogleMaps();
  }, [UserLat, UserLng]);

  return (
    <div>
      <h3>{district}區附近可篩檢的診所：</h3>
      <div id="map">
        <div id="infowindow-content">
        <span id="place-name" class="title"></span><br />
        <strong>Place ID:</strong> <span id="place-id"></span><br />
        <span id="place-address"></span>
      </div>
    </div>
    </div>
  )
};


//第二次寫法 遇到一樣問題