const express = require('express')
const app = express()
const port = 4003
const axios = require('axios');
const cors = require('cors');

const apiKey = "AIzaSyAHXg8iyfRi6rYFMn6eBK42TRd5_GjT4TM"

const hospitalData = require('../src/assets/data/hospitalData.json')

app.use(cors())
app.use(express.json())//可以解析json

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//把用戶LAT,Lng 打 google api拿回地址全貌
app.post('/api/location',async (req,res)=>{
  const { userLat, userLng } = req.body
  
  if (!userLat || !userLng) {
    return res.status(400).json({ error: '缺少經緯度資訊' });
  }
  //將經緯度存到網址中, 並打google api取得地址
    try {
        const reverseEncodingURL =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLng}&key=${apiKey}&language=zh-cn`

        const response = await axios.get(reverseEncodingURL)
          console.log(response)
          if(response.data && response.data.results && response.data.results.length>0){  
            const userLocation = response.data.results[0].formatted_address
              console.log("解析地址為：", userLocation);
              res.json({ address: userLocation })
          } else  {
            res.status(404).json({error:'無法解析經緯度地址'})
          }
      }catch(error){
        console.error("GoogleAPI無法解析地址",error)
      }    
  })


//打google api拿醫院地點經緯度位置
const hospital_Lat_dataSet =[]
const hospital_Lng_dataSet =[]
const hospital_ID_dataSet = []

const getEveryLatLngData = () => {
  const hospitalSliceData = hospitalData.slice(801, 844)
      hospitalSliceData.forEach((hospital)=> {
      const hospitalAdd =hospital.Address
      const hospitalID = hospital.ID
      const hospitalSliceDataWithLatLng = []

      const address = hospitalAdd

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

      axios.get(url)
        .then((response) => {
          const hospitalAddLat = response.data.results[0].geometry.location.lat 
          const hospitalAddLng = response.data.results[0].geometry.location.lng 
          hospital_Lat_dataSet.push(hospitalAddLat) 
          hospital_Lng_dataSet.push(hospitalAddLng)
          hospital_ID_dataSet.push(hospitalID)

          for(let i = 0; i < hospitalSliceData.length; i ++ ){
            hospitalSliceDataWithLatLng.push({
              ID: hospital_ID_dataSet[i],
              Lat:hospital_Lat_dataSet[i],
              Lng:hospital_Lng_dataSet[i]
            })
          }
          console.log(hospitalSliceDataWithLatLng)
        }) // 將回應轉換為 JSON 格式
        .catch((error) => {
          console.error("發生錯誤:", error);
        });
  })
  }


getEveryLatLngData()


app.listen(port, ()=>{
  console.log(`Backend server running on port ${port}`)
})