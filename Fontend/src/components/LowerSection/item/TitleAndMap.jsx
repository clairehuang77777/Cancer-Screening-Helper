import hospitalData from '../../../assets/data/hospitalData.json' 
import { useContext , useEffect, useState, useRef } from 'react';
import { UserLatContext } from '../../../UserLatContext';
import { UserLngContext } from '../../../UserLngContext';
import { UserClickHospitalContext } from '../../../UserClickHospitalContext';

export const TitleAndMap = ({district}) => {
  const { UserLat } = useContext(UserLatContext)
  const { UserLng } = useContext(UserLngContext)
  const [ placeID, setPlaceID] = useState("")
  const { UserClickHospital, SetUserClickHospital } = useContext(UserClickHospitalContext)
  const markerTitleRef = useRef(null) //宣告markerTitleRef



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

    // 創建資訊窗內容的函式
    const createInfoWindowContent = (place) => {
      const content = document.createElement('div');
      content.style.pointerEvents = "auto"; // 確保啟用互動
      content.style.maxHeight = "150px"; // 設定最大高度
      content.style.overflowY = "auto"; // 啟用垂直滾動

                const nameElement = document.createElement("h2");
                nameElement.textContent = place.name || "名稱不可用";
                content.appendChild(nameElement);

                // const placeAddressElement = document.createElement("p");
                // placeAddressElement.textContent = place.formatted_address || "地址不可用";
                // content.appendChild(placeAddressElement);

                // const phoneNumberElement = document.createElement("p");
                // phoneNumberElement.textContent = place.international_phone_number || "電話不可用";
                // content.appendChild(phoneNumberElement);

                const placeURL = document.createElement("a");
                placeURL.href = place.url || place.website || "#";
                placeURL.textContent = "查看地圖";
                content.appendChild(placeURL);
      return content;
    };

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
            { featureType: "poi", stylers: [{ visibility: "off" }] },
          ],
        });

        const service = new google.maps.places.PlacesService(map)
        console.log("載入使用者位置為地圖中心")
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

        console.log("載入診所座標完成")
        const markerElement = marker.element; // AdvancedMarkerElement 的 DOM 節點
        markerElement.style.pointerEvents = "auto"; // 啟用 pointer-events
        console.log("啟用 pointer-events")
        
        const infowindow = new google.maps.InfoWindow();

        console.log("開始監聽事件")
         marker.addListener("click", async () => {
          console.log("marker被點擊")
          markerTitleRef.current = marker.title //更新ref
          console.log(`${marker.title}已更新`)
          try {
            const request = {
              placeId: hospital.placeID,
              fields: ["name", "formatted_address", "international_phone_number", "geometry", "url", "website"],
            };
            //  console.log("發送get place detail請求")

            const place = await new Promise((resolve, reject) => {
              service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  resolve(place);
                } else {
                  reject(status);
                }
              });
            });
            // console.log("把place內容放進框框裡")
            infowindow.setContent(createInfoWindowContent(place));
            infowindow.open(map, marker);
            console.log(marker.title)
            console.log(markerTitleRef.current)
            SetUserClickHospital(markerTitleRef.current)
          } catch (error) {
            console.error("無法加載詳細資訊", error);
          }
        });
      });
        
        
        };
    
    }
  
  loadGoogleMaps();
  }, [UserLat, UserLng]);

  return (
    <div>
      <h3>{district}區附近可篩檢的診所</h3>
      <div id="map">
    </div>
    </div>
  )
};