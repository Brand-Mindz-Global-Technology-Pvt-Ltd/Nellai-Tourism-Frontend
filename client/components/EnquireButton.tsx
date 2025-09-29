import { useEnquireModal } from '../contexts/EnquireModalContext';

interface EnquireButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function EnquireButton({ 
  children, 
  className = '', 
  variant = 'primary' 
}: EnquireButtonProps) {
  const { openModal } = useEnquireModal();

  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer";
  
  const variantClasses = {
    primary: "bg-[#2C2A6B] text-white hover:bg-[#1e1d4a]",
    secondary: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border-2 border-[#2C2A6B] text-[#2C2A6B] hover:bg-[#2C2A6B] hover:text-white"
  };

  return (
    <button
      onClick={openModal}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
