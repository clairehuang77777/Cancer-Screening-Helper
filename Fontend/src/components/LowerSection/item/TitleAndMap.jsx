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

        //The Center: User Location
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: UserLat, lng: UserLng },
          zoom: 14,
          mapId: "46afe031b4dadb46",
        });

      // The marker, display hospital maker
      filteredHospitalData.forEach((hospital)=>{
        const markerPosition = {lat: hospital.Lat, lng: hospital.Lng}
        new AdvancedMarkerElement({
            map: map,
            position: markerPosition,
            title: hospital.Name,
          })

        //send request to get hospital details
          const request = {
            placeId: hospital.placeID,
            fields: ["name", "formatted_address", "international_phone_number", "googleMapsURI"],
           };
            
          const infowindow = new google.maps.InfoWindow();
          const service = new google.maps.places.PlacesService(map);

          //打request取得地點資訊
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const marker = new google.maps.Marker({
                    map,
                    position: markerPosition,
                  });
          
                  //彈出卡片內容
                google.maps.event.addListener(marker, "click", () => {
                const content = document.createElement("div");

                const nameElement = document.createElement("h2");
                nameElement.textContent = place.name;
                content.appendChild(nameElement);

                const PhoneNumberElement = document.createElement("p");
                PhoneNumberElement.textContent = place.international_phone_number;
                content.appendChild(PhoneNumberElement);

                const placeAddressElement = document.createElement("p");
                placeAddressElement.textContent = place.formatted_address;
                content.appendChild(placeAddressElement);

                const placeURL = document.createElement("a");
                placeURL.href = place.googleMapsUri;  
                placeURL.textContent = "查看地圖";
                content.appendChild(placeURL);


                infowindow.setContent(content);
                infowindow.open(map, marker);
              })
            }else {
                console.error('Google Maps 未加載或沒有篩選到醫院數據');
            }
      });
    })
  }}

  loadGoogleMaps();
  }, [UserLat, UserLng]);

  return (
    <div>
      <h3>{district}區附近可篩檢的診所：</h3>
      <div id="map"></div>
    </div>
  );
};