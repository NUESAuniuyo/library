import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { 
  MapPin, 
  Building, 
  Users, 
  Phone, 
  Mail,
  Navigation,
  Layers
} from 'lucide-react';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  // University of Uyo Faculty of Engineering coordinates (approximate)
  const facultyCenter = [5.0104, 7.8591];

  const departments = [
    {
      id: 'mechanical',
      name: 'Mechanical Engineering',
      position: [5.0110, 7.8585],
      hod: 'Prof. John Akpan',
      building: 'Engineering Block A',
      phone: '+234 85 200 2345',
      email: 'mechanical@uniuyo.edu.ng',
      description: 'Department of Mechanical Engineering - Design, manufacturing, and analysis of mechanical systems.',
      facilities: ['CAD Lab', 'Manufacturing Workshop', 'Materials Testing Lab', 'Thermodynamics Lab'],
      color: '#3B82F6'
    },
    {
      id: 'chemical',
      name: 'Chemical Engineering',
      position: [5.0108, 7.8588],
      hod: 'Dr. Mary Okon',
      building: 'Engineering Block B',
      phone: '+234 85 200 2346',
      email: 'chemical@uniuyo.edu.ng',
      description: 'Department of Chemical Engineering - Process design and optimization in chemical industries.',
      facilities: ['Process Control Lab', 'Unit Operations Lab', 'Chemical Analysis Lab', 'Pilot Plant'],
      color: '#10B981'
    },
    {
      id: 'petroleum',
      name: 'Petroleum Engineering',
      position: [5.0106, 7.8592],
      hod: 'Prof. David Etim',
      building: 'Petroleum Engineering Complex',
      phone: '+234 85 200 2347',
      email: 'petroleum@uniuyo.edu.ng',
      description: 'Department of Petroleum Engineering - Oil and gas exploration, drilling, and production.',
      facilities: ['Drilling Simulator', 'Reservoir Engineering Lab', 'Well Testing Lab', 'PVT Lab'],
      color: '#F59E0B'
    },
    {
      id: 'electrical',
      name: 'Electrical Engineering',
      position: [5.0112, 7.8590],
      hod: 'Prof. Peter Obot',
      building: 'Engineering Block C',
      phone: '+234 85 200 2348',
      email: 'electrical@uniuyo.edu.ng',
      description: 'Department of Electrical Engineering - Power systems, electronics, and electrical infrastructure.',
      facilities: ['Power Systems Lab', 'Electronics Lab', 'Control Systems Lab', 'Telecommunications Lab'],
      color: '#8B5CF6'
    },
    {
      id: 'computer',
      name: 'Computer Engineering',
      position: [5.0104, 7.8595],
      hod: 'Dr. Emmanuel Bassey',
      building: 'ICT Complex',
      phone: '+234 85 200 2349',
      email: 'computer@uniuyo.edu.ng',
      description: 'Department of Computer Engineering - Hardware and software systems design and development.',
      facilities: ['Computer Lab', 'Networking Lab', 'Embedded Systems Lab', 'Software Engineering Lab'],
      color: '#EC4899'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Engineering',
      position: [5.0100, 7.8587],
      hod: 'Dr. Grace Udoh',
      building: 'Agricultural Engineering Block',
      phone: '+234 85 200 2350',
      email: 'agricultural@uniuyo.edu.ng',
      description: 'Department of Agricultural Engineering - Engineering principles applied to agricultural production.',
      facilities: ['Farm Machinery Lab', 'Soil & Water Lab', 'Post-Harvest Lab', 'Irrigation Systems Lab'],
      color: '#84CC16'
    },
    {
      id: 'food',
      name: 'Food Engineering',
      position: [5.0102, 7.8583],
      hod: 'Prof. Samuel Udo',
      building: 'Food Technology Block',
      phone: '+234 85 200 2351',
      email: 'food@uniuyo.edu.ng',
      description: 'Department of Food Engineering - Food processing, preservation, and packaging technology.',
      facilities: ['Food Processing Lab', 'Quality Control Lab', 'Packaging Lab', 'Sensory Evaluation Lab'],
      color: '#EF4444'
    }
  ];

  // Create custom icons for each department
  const createCustomIcon = (color) => {
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-r from-nuesa-green to-nuesa-green-light text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Faculty of Engineering Map
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Explore the Faculty of Engineering campus and locate all department buildings, 
              laboratories, and facilities with our interactive map.
            </p>
            <div className="flex justify-center items-center space-x-8 text-lg">
              <div className="flex items-center space-x-2">
                <Building className="w-6 h-6" />
                <span>7 Departments</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <span>Multiple Buildings</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Map Controls */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-nuesa-green" />
                  Map Controls
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Map View
                    </label>
                    <select
                      value={mapView}
                      onChange={(e) => setMapView(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nuesa-green focus:border-transparent"
                    >
                      <option value="satellite">Satellite</option>
                      <option value="street">Street Map</option>
                      <option value="terrain">Terrain</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setSelectedDepartment(null)}
                    className="w-full btn-primary py-2 text-sm"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Reset View
                  </button>
                </div>
              </div>

              {/* Departments List */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Departments</h3>
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        selectedDepartment?.id === dept.id
                          ? 'bg-nuesa-green text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: dept.color }}
                        />
                        <span className="text-sm font-medium">{dept.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-96 lg:h-[600px]">
                  <MapContainer
                    center={facultyCenter}
                    zoom={17}
                    style={{ height: '100%', width: '100%' }}
                    className="rounded-xl"
                  >
                    <TileLayer
                      url={
                        mapView === 'satellite'
                          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                          : mapView === 'terrain'
                          ? 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
                          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      }
                      attribution={
                        mapView === 'satellite'
                          ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                          : '&copy; OpenStreetMap contributors'
                      }
                    />
                    
                    {departments.map((dept) => (
                      <Marker
                        key={dept.id}
                        position={dept.position}
                        icon={createCustomIcon(dept.color)}
                        eventHandlers={{
                          click: () => setSelectedDepartment(dept)
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[250px]">
                            <h4 className="font-bold text-lg mb-2">{dept.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4 text-nuesa-green" />
                                <span>{dept.building}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-nuesa-green" />
                                <span>HOD: {dept.hod}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-nuesa-green" />
                                <span>{dept.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-nuesa-green" />
                                <span>{dept.email}</span>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Details */}
      {selectedDepartment && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-lg p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: selectedDepartment.color }}
                    />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedDepartment.name}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedDepartment.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-nuesa-green" />
                      <span><strong>Building:</strong> {selectedDepartment.building}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-nuesa-green" />
                      <span><strong>Head of Department:</strong> {selectedDepartment.hod}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-nuesa-green" />
                      <span><strong>Phone:</strong> {selectedDepartment.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-nuesa-green" />
                      <span><strong>Email:</strong> {selectedDepartment.email}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Facilities & Laboratories</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDepartment.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-nuesa-orange rounded-full" />
                          <span className="text-sm font-medium">{facility}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MapPage;
