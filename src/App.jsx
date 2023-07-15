import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import background from "./assets/pattern-bg-desktop.png"
import arrow from "./assets/icon-arrow.svg"
import icon from "./components/icon"
import "leaflet/dist/leaflet.css"

function App() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState("")

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=192.212.174.101`
        )
        const data = await res.json()
        setAddress(data)
      }

      getInitialData()
    } catch (error) {
      console.trace(error)
    }
  }, [])

  return (
    <>
      <section>
        <div className="absolute w-full -z-10">
          <img src={background} alt="" className="w-full h-80" />
        </div>

        <div className="max-w-xl mx-auto p-8">
          <h1 className="font-bold text-2xl lg:text-3xl text-white pb-8 text-center">
            IP Address Tracker
          </h1>

          <form
            autoComplete="off"
            className="w-full flex"
          >
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address or domain"
              className="w-full py-2 px-4 rounded-l-lg"
              value=""

            />
            <button type="submit" className="bg-black py-2 px-4 rounded-r-lg">
              <img src={arrow} alt="" />
            </button>
          </form>
        </div>

        <>
          <article className="p-8">
            <div
              className="bg-white rounded-xl p-8 shadow max-w-6xl mx-auto grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:text-left -mb-20 relative lg:-mb-32"
              style={{
                zIndex: 10000,
              }}
            >
              <article className="lg:border-r lg:border-slate-400 p-6">
                <h2 className="text-sm uppercase text-slate-600">
                  IP Address
                </h2>
                <p className="font-bold text-slate-900 text-2xl">
                  192.212.174.101
                </p>
              </article>

              <article className="lg:border-r lg:border-slate-400 p-6">
                <h2 className="text-sm uppercase text-slate-600">Location</h2>
                <p className="font-bold text-slate-900 text-2xl">
                  Quezon City
                </p>
              </article>

              <article className="lg:border-r lg:border-slate-400 p-6">
                <h2 className="text-sm uppercase text-slate-600">Timezone</h2>
                <p className="font-bold text-slate-900 text-2xl">
                  UTC Philippines +8
                </p>
              </article>

              <article className="p-6">
                <h2 className="text-sm uppercase text-slate-600">ISP</h2>
                <p className="font-bold text-slate-900 text-2xl">
                  Santa Monica
                </p>
              </article>
            </div>
          </article>
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height:"600px", width:"100vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={icon} position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        </>

      </section>
    </>
  )
}

export default App