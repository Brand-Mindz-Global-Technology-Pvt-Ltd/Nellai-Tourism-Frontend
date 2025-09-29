import { useState } from 'react';
import { X, User, Mail, Building, Plane, Users, Phone, Calendar, TreePine } from 'lucide-react';

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquireModal({ isOpen, onClose }: EnquireModalProps) {
  const [formData, setFormData] = useState({
    firstName: 'Nithiya',
    lastName: 'Prasath.S',
    email: 'nithiyaprasath1999@gmail.com',
    phoneNumber: '+91 87541 39334',
    whatsappNumber: '+91 87541 39334',
    cityOfResidence: 'Chennai',
    travelDestination: 'New York',
    dateOfTravel: '18.08.2025',
    numberOfPeople: '8',
    vacationType: 'Family Trip'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-[#2C2A6B] text-white px-6 py-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold uppercase">ENQUIRE NOW</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name :
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email :
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* City of Residence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City of Residence :
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.cityOfResidence}
                    onChange={(e) => handleInputChange('cityOfResidence', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>

              {/* Travel Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Destination :
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.travelDestination}
                    onChange={(e) => handleInputChange('travelDestination', e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent appearance-none bg-white transition-all duration-200"
                    required
                  >
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Paris">Paris</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Bangkok">Bangkok</option>
                    <option value="Sydney">Sydney</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* No. of People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. of people :
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.numberOfPeople}
                    onChange={(e) => handleInputChange('numberOfPeople', e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent appearance-none bg-white transition-all duration-200"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10+">10+</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name :
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number :
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Whatsapp Number :
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your WhatsApp number"
                    required
                  />
                </div>
              </div>

              {/* Date of Travel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Travel :
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dateOfTravel}
                    onChange={(e) => handleInputChange('dateOfTravel', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Vacation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccation Type :
                </label>
                <div className="relative">
                  <TreePine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.vacationType}
                    onChange={(e) => handleInputChange('vacationType', e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C2A6B] focus:border-transparent appearance-none bg-white transition-all duration-200"
                    required
                  >
                    <option value="Family Trip">Family Trip</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Business Trip">Business Trip</option>
                    <option value="Solo Travel">Solo Travel</option>
                    <option value="Group Tour">Group Tour</option>
                    <option value="Adventure Trip">Adventure Trip</option>
                    <option value="Cultural Tour">Cultural Tour</option>
                    <option value="Religious Tour">Religious Tour</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-lg transition-all duration-200 uppercase text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
