import "./sideBar.css";
import useFetch from "../../useFetch";
import 'moment/locale/fr';



export default function SideBar() {
    const API_URL ="http://api.weatherapi.com/v1/current.json?key=75a81dbcdd7f4280a08134200211709&q=Paris&aqi=no";
    
    
    const {data,loading,error} = useFetch(API_URL);
    

    if(loading) return <h1>Loading ... </h1>
    if(error) console.log(error);


    return (
        <div className="sideBar">
            <div className="sideBarTop">
                <h3 className="sideBarCityTitle">{data?.location.name}</h3>
                <h3 className="sideBarDate">
                    {data?.location.localtime}
                </h3>
            </div>
            <div className="sideBarCenter">
                <img src={data?.current.condition.icon} alt={data?.current.condition.text} className="sideBarImg" />
                <h3 className="sideBarWeatherState">{data?.current.condition.text}</h3>
                <h3 className="sideBarTemperature">{data?.current.temp_c} <span>&deg;C</span></h3>
                
            </div>
        </div>
    );
};
