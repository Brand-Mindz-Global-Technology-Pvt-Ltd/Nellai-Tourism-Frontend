import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  flagUrl?: string;
  phoneLength: number; // Length of phone number without country code
  placeholder: string; // Placeholder text for the input
}

const countries: Country[] = [
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬", phoneLength: 8, placeholder: "01234567" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳", phoneLength: 10, placeholder: "1234567890" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸", phoneLength: 10, placeholder: "1234567890" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧", phoneLength: 10, placeholder: "1234567890" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦", phoneLength: 10, placeholder: "1234567890" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺", phoneLength: 9, placeholder: "123456789" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪", phoneLength: 10, placeholder: "1234567890" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷", phoneLength: 10, placeholder: "1234567890" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹", phoneLength: 10, placeholder: "1234567890" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸", phoneLength: 9, placeholder: "123456789" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭", phoneLength: 9, placeholder: "123456789" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰", phoneLength: 9, placeholder: "123456789" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮", phoneLength: 9, placeholder: "123456789" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "��🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", flag: "🇨🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺", phoneLength: 9, placeholder: "123456789" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Bulgaria", code: "BG", dialCode: "+359", flag: "��🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Croatia", code: "HR", dialCode: "+385", flag: "🇭🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Slovenia", code: "SI", dialCode: "+386", flag: "��🇮", phoneLength: 9, placeholder: "123456789" },
  { name: "Slovakia", code: "SK", dialCode: "+421", flag: "🇸🇰", phoneLength: 9, placeholder: "123456789" },
  { name: "Lithuania", code: "LT", dialCode: "+370", flag: "🇱🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Latvia", code: "LV", dialCode: "+371", flag: "🇱🇻", phoneLength: 9, placeholder: "123456789" },
  { name: "Estonia", code: "EE", dialCode: "+372", flag: "🇪🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Luxembourg", code: "LU", dialCode: "+352", flag: "🇱🇺", phoneLength: 9, placeholder: "123456789" },
  { name: "Malta", code: "MT", dialCode: "+356", flag: "🇲🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Cyprus", code: "CY", dialCode: "+357", flag: "🇨🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Iceland", code: "IS", dialCode: "+354", flag: "🇮🇸", phoneLength: 9, placeholder: "123456789" },
  { name: "Liechtenstein", code: "LI", dialCode: "+423", flag: "🇱🇮", phoneLength: 9, placeholder: "123456789" },
  { name: "Monaco", code: "MC", dialCode: "+377", flag: "🇲🇨", phoneLength: 9, placeholder: "123456789" },
  { name: "San Marino", code: "SM", dialCode: "+378", flag: "🇸🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Vatican City", code: "VA", dialCode: "+379", flag: "🇻🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Andorra", code: "AD", dialCode: "+376", flag: "🇦🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Albania", code: "AL", dialCode: "+355", flag: "🇦🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Armenia", code: "AM", dialCode: "+374", flag: "🇦🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Azerbaijan", code: "AZ", dialCode: "+994", flag: "��🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Belarus", code: "BY", dialCode: "+375", flag: "🇧🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Bosnia and Herzegovina", code: "BA", dialCode: "+387", flag: "🇧🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Georgia", code: "GE", dialCode: "+995", flag: "��🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Kazakhstan", code: "KZ", dialCode: "+7", flag: "🇰🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Kyrgyzstan", code: "KG", dialCode: "+996", flag: "🇰🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Moldova", code: "MD", dialCode: "+373", flag: "🇲🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Montenegro", code: "ME", dialCode: "+382", flag: "🇲🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "North Macedonia", code: "MK", dialCode: "+389", flag: "🇲🇰", phoneLength: 9, placeholder: "123456789" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "��🇺", phoneLength: 9, placeholder: "123456789" },
  { name: "Serbia", code: "RS", dialCode: "+381", flag: "🇷🇸", phoneLength: 9, placeholder: "123456789" },
  { name: "Tajikistan", code: "TJ", dialCode: "+992", flag: "🇹🇯", phoneLength: 9, placeholder: "123456789" },
  { name: "Turkmenistan", code: "TM", dialCode: "+993", flag: "🇹🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Ukraine", code: "UA", dialCode: "+380", flag: "🇺🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Uzbekistan", code: "UZ", dialCode: "+998", flag: "🇺🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵", phoneLength: 9, placeholder: "123456789" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭", phoneLength: 9, placeholder: "123456789" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭", phoneLength: 9, placeholder: "123456789" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "��🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰", phoneLength: 9, placeholder: "123456789" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰", phoneLength: 9, placeholder: "123456789" },
  { name: "Nepal", code: "NP", dialCode: "+977", flag: "🇳🇵", phoneLength: 9, placeholder: "123456789" },
  { name: "Bhutan", code: "BT", dialCode: "+975", flag: "🇧🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Maldives", code: "MV", dialCode: "+960", flag: "🇲🇻", phoneLength: 9, placeholder: "123456789" },
  { name: "Myanmar", code: "MM", dialCode: "+95", flag: "🇲🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Cambodia", code: "KH", dialCode: "+855", flag: "🇰🇭", phoneLength: 9, placeholder: "123456789" },
  { name: "Laos", code: "LA", dialCode: "+856", flag: "��🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Brunei", code: "BN", dialCode: "+673", flag: "��🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Timor-Leste", code: "TL", dialCode: "+670", flag: "🇹🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Papua New Guinea", code: "PG", dialCode: "+675", flag: "🇵🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Fiji", code: "FJ", dialCode: "+679", flag: "🇫🇯", phoneLength: 9, placeholder: "123456789" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Chile", code: "CL", dialCode: "+56", flag: "��🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Peru", code: "PE", dialCode: "+51", flag: "🇵🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Venezuela", code: "VE", dialCode: "+58", flag: "🇻🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Ecuador", code: "EC", dialCode: "+593", flag: "🇪🇨", phoneLength: 9, placeholder: "123456789" },
  { name: "Bolivia", code: "BO", dialCode: "+591", flag: "🇧🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Paraguay", code: "PY", dialCode: "+595", flag: "🇵🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Uruguay", code: "UY", dialCode: "+598", flag: "🇺🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Guyana", code: "GY", dialCode: "+592", flag: "🇬🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Suriname", code: "SR", dialCode: "+597", flag: "🇸🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "French Guiana", code: "GF", dialCode: "+594", flag: "🇬🇫", phoneLength: 9, placeholder: "123456789" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽", phoneLength: 9, placeholder: "123456789" },
  { name: "Guatemala", code: "GT", dialCode: "+502", flag: "🇬🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Belize", code: "BZ", dialCode: "+501", flag: "🇧🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "El Salvador", code: "SV", dialCode: "+503", flag: "🇸🇻", phoneLength: 9, placeholder: "123456789" },
  { name: "Honduras", code: "HN", dialCode: "+504", flag: "🇭🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Nicaragua", code: "NI", dialCode: "+505", flag: "🇳🇮", phoneLength: 9, placeholder: "123456789" },
  { name: "Costa Rica", code: "CR", dialCode: "+506", flag: "🇨🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Panama", code: "PA", dialCode: "+507", flag: "🇵🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Cuba", code: "CU", dialCode: "+53", flag: "🇨🇺", phoneLength: 9, placeholder: "123456789" },
  { name: "Jamaica", code: "JM", dialCode: "+1876", flag: "🇯🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Haiti", code: "HT", dialCode: "+509", flag: "🇭🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Dominican Republic", code: "DO", dialCode: "+1809", flag: "🇩🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Puerto Rico", code: "PR", dialCode: "+1787", flag: "🇵🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Trinidad and Tobago", code: "TT", dialCode: "+1868", flag: "🇹🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Barbados", code: "BB", dialCode: "+1246", flag: "��🇧", phoneLength: 9, placeholder: "123456789" },
  { name: "Bahamas", code: "BS", dialCode: "+1242", flag: "🇧🇸", phoneLength: 9, placeholder: "123456789" },
  { name: "Grenada", code: "GD", dialCode: "+1473", flag: "��🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Saint Lucia", code: "LC", dialCode: "+1758", flag: "🇱🇨", phoneLength: 9, placeholder: "123456789" },
  { name: "Saint Vincent and the Grenadines", code: "VC", dialCode: "+1784", flag: "🇻🇨", phoneLength: 9, placeholder: "123456789" },
  { name: "Antigua and Barbuda", code: "AG", dialCode: "+1268", flag: "🇦🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Saint Kitts and Nevis", code: "KN", dialCode: "+1869", flag: "🇰🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Dominica", code: "DM", dialCode: "+1767", flag: "��🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭", phoneLength: 9, placeholder: "123456789" },
  { name: "Ethiopia", code: "ET", dialCode: "+251", flag: "🇪🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", flag: "🇹🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Uganda", code: "UG", dialCode: "+256", flag: "🇺🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Morocco", code: "MA", dialCode: "+212", flag: "🇲🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Algeria", code: "DZ", dialCode: "+213", flag: "��🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Tunisia", code: "TN", dialCode: "+216", flag: "🇹🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Libya", code: "LY", dialCode: "+218", flag: "🇱🇾", phoneLength: 9, placeholder: "123456789" },
  { name: "Sudan", code: "SD", dialCode: "+249", flag: "🇸🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "South Sudan", code: "SS", dialCode: "+211", flag: "🇸🇸", phoneLength: 9, placeholder: "123456789" },
  { name: "Chad", code: "TD", dialCode: "+235", flag: "🇹🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Niger", code: "NE", dialCode: "+227", flag: "🇳🇪", phoneLength: 9, placeholder: "123456789" },
  { name: "Mali", code: "ML", dialCode: "+223", flag: "🇲🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Burkina Faso", code: "BF", dialCode: "+226", flag: "🇧🇫", phoneLength: 9, placeholder: "123456789" },
  { name: "Senegal", code: "SN", dialCode: "+221", flag: "🇸🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Guinea", code: "GN", dialCode: "+224", flag: "��🇳", phoneLength: 9, placeholder: "123456789" },
  { name: "Guinea-Bissau", code: "GW", dialCode: "+245", flag: "🇬🇼", phoneLength: 9, placeholder: "123456789" },
  { name: "Sierra Leone", code: "SL", dialCode: "+232", flag: "🇸🇱", phoneLength: 9, placeholder: "123456789" },
  { name: "Liberia", code: "LR", dialCode: "+231", flag: "🇱🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Ivory Coast", code: "CI", dialCode: "+225", flag: "🇨🇮", phoneLength: 9, placeholder: "123456789" },
  { name: "Togo", code: "TG", dialCode: "+228", flag: "🇹🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Benin", code: "BJ", dialCode: "+229", flag: "🇧🇯", phoneLength: 9, placeholder: "123456789" },
  { name: "Cameroon", code: "CM", dialCode: "+237", flag: "🇨🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Central African Republic", code: "CF", dialCode: "+236", flag: "🇨🇫", phoneLength: 9, placeholder: "123456789" },
  { name: "Equatorial Guinea", code: "GQ", dialCode: "+240", flag: "🇬🇶", phoneLength: 9, placeholder: "123456789" },
  { name: "Gabon", code: "GA", dialCode: "+241", flag: "🇬🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Republic of the Congo", code: "CG", dialCode: "+242", flag: "🇨🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Democratic Republic of the Congo", code: "CD", dialCode: "+243", flag: "🇨🇩", phoneLength: 9, placeholder: "123456789" },
  { name: "Angola", code: "AO", dialCode: "+244", flag: "🇦🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Zambia", code: "ZM", dialCode: "+260", flag: "🇿🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Zimbabwe", code: "ZW", dialCode: "+263", flag: "🇿🇼", phoneLength: 9, placeholder: "123456789" },
  { name: "Botswana", code: "BW", dialCode: "+267", flag: "🇧🇼", phoneLength: 9, placeholder: "123456789" },
  { name: "Namibia", code: "NA", dialCode: "+264", flag: "🇳🇦", phoneLength: 9, placeholder: "123456789" },
  { name: "Lesotho", code: "LS", dialCode: "+266", flag: "🇱🇸", phoneLength: 9, placeholder: "123456789" },
  { name: "Eswatini", code: "SZ", dialCode: "+268", flag: "🇸🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Madagascar", code: "MG", dialCode: "+261", flag: "🇲🇬", phoneLength: 9, placeholder: "123456789" },
  { name: "Mauritius", code: "MU", dialCode: "+230", flag: "🇲🇺", phoneLength: 9, placeholder: "123456789" },
  { name: "Seychelles", code: "SC", dialCode: "+248", flag: "��🇨", phoneLength: 9, placeholder: "123456789" },
  { name: "Comoros", code: "KM", dialCode: "+269", flag: "🇰🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Djibouti", code: "DJ", dialCode: "+253", flag: "🇩🇯", phoneLength: 9, placeholder: "123456789" },
  { name: "Somalia", code: "SO", dialCode: "+252", flag: "🇸🇴", phoneLength: 9, placeholder: "123456789" },
  { name: "Eritrea", code: "ER", dialCode: "+291", flag: "��🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Burundi", code: "BI", dialCode: "+257", flag: "🇧🇮", phoneLength: 9, placeholder: "123456789" },
  { name: "Rwanda", code: "RW", dialCode: "+250", flag: "🇷🇼", phoneLength: 9, placeholder: "123456789" },
  { name: "Malawi", code: "MW", dialCode: "+265", flag: "🇲🇼", phoneLength: 9, placeholder: "123456789" },
  { name: "Mozambique", code: "MZ", dialCode: "+258", flag: "��🇿", phoneLength: 9, placeholder: "123456789" },
  { name: "Cape Verde", code: "CV", dialCode: "+238", flag: "��🇻", phoneLength: 9, placeholder: "123456789" },
  { name: "São Tomé and Príncipe", code: "ST", dialCode: "+239", flag: "🇸🇹", phoneLength: 9, placeholder: "123456789" },
  { name: "Guinea-Bissau", code: "GW", dialCode: "+245", flag: "🇬🇼", phoneLength: 9, placeholder: "123456789" },
  { name: "The Gambia", code: "GM", dialCode: "+220", flag: "🇬🇲", phoneLength: 9, placeholder: "123456789" },
  { name: "Mauritania", code: "MR", dialCode: "+222", flag: "🇲🇷", phoneLength: 9, placeholder: "123456789" },
  { name: "Western Sahara", code: "EH", dialCode: "+212", flag: "🇪🇭", phoneLength: 9, placeholder: "123456789" },
  { name: "Sahrawi Arab Democratic Republic", code: "SAH", dialCode: "+212", flag: "🇸🇭", phoneLength: 9, placeholder: "123456789" },
];

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export default function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries
    .filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // First priority: Countries that start with the search term
      const aStartsWithName = a.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      const bStartsWithName = b.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      
      if (aStartsWithName && !bStartsWithName) return -1;
      if (!aStartsWithName && bStartsWithName) return 1;
      
      // Second priority: Countries that start with dial code
      const aStartsWithDial = a.dialCode.startsWith(searchTerm);
      const bStartsWithDial = b.dialCode.startsWith(searchTerm);
      
      if (aStartsWithDial && !bStartsWithDial) return -1;
      if (!aStartsWithDial && bStartsWithDial) return 1;
      
      // Third priority: Countries that start with country code
      const aStartsWithCode = a.code.toLowerCase().startsWith(searchTerm.toLowerCase());
      const bStartsWithCode = b.code.toLowerCase().startsWith(searchTerm.toLowerCase());
      
      if (aStartsWithCode && !bStartsWithCode) return -1;
      if (!aStartsWithCode && bStartsWithCode) return 1;
      
      // Finally, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus the dropdown when it opens
  useEffect(() => {
    if (isOpen && dropdownListRef.current) {
      // Small delay to ensure the dropdown is rendered
      setTimeout(() => {
        dropdownListRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
             <button
         type="button"
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center gap-2 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors hover:bg-gray-50 min-w-[80px]"
       >
         <img 
           src={`https://flagcdn.com/16x12/${selectedCountry.code.toLowerCase()}.png`}
           alt={`${selectedCountry.name} flag`}
           className="w-4 h-3 object-cover rounded-sm"
           onError={(e) => {
             // Fallback to emoji if image fails to load
             const target = e.currentTarget as HTMLImageElement;
             target.style.display = 'none';
             const nextElement = target.nextElementSibling as HTMLElement;
             if (nextElement) {
               nextElement.style.display = 'inline';
             }
           }}
         />
         <span className="text-sm hidden">{selectedCountry.flag}</span>
         <span className="text-gray-700 font-medium">{selectedCountry.dialCode}</span>
         <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0" />
       </button>

                    {isOpen && (
         <div 
           ref={dropdownListRef}
           className="absolute top-full left-0 z-50 w-72 max-h-60 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
           onKeyDown={(e) => {
             // Handle typing for search
             if (e.key.length === 1) {
               setSearchTerm(prev => prev + e.key.toLowerCase());
             } else if (e.key === 'Backspace') {
               setSearchTerm(prev => prev.slice(0, -1));
             } else if (e.key === 'Escape') {
               setIsOpen(false);
               setSearchTerm('');
             }
           }}
           tabIndex={0}
         >
           {/* Search Term Display */}
           {searchTerm && (
             <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
               <div className="flex items-center gap-2 text-xs text-gray-600">
                 <Search className="w-3 h-3" />
                 <span>Searching: "{searchTerm}"</span>
                 <button
                   onClick={() => setSearchTerm('')}
                   className="ml-auto text-gray-400 hover:text-gray-600"
                 >
                   ×
                 </button>
               </div>
             </div>
           )}
           
           {/* Countries List */}
           <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
                             <button
                 key={country.code}
                 type="button"
                 onClick={() => {
                   onCountryChange(country);
                   setIsOpen(false);
                   setSearchTerm("");
                 }}
                 className="w-full flex items-center gap-3 px-3 py-2 text-xs hover:bg-gray-100 transition-colors"
               >
                 <img 
                   src={`https://flagcdn.com/16x12/${country.code.toLowerCase()}.png`}
                   alt={`${country.name} flag`}
                   className="w-4 h-3 object-cover rounded-sm"
                   onError={(e) => {
                     // Fallback to emoji if image fails to load
                     const target = e.currentTarget as HTMLImageElement;
                     target.style.display = 'none';
                     const nextElement = target.nextElementSibling as HTMLElement;
                     if (nextElement) {
                       nextElement.style.display = 'inline';
                     }
                   }}
                 />
                 <span className="text-sm hidden">{country.flag}</span>
                 <span className="text-gray-700 font-medium min-w-[50px]">{country.dialCode}</span>
                 <span className="text-gray-600 flex-1 text-left">{country.name}</span>
               </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 