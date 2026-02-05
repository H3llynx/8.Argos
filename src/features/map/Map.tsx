import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export function Map() {

    return (
        <main>
            <div className="w-full lg:w-1/2 h-[400px] shadow-1 border border-grey-1 rounded-lg overflow-hidden">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </main>
    )
}