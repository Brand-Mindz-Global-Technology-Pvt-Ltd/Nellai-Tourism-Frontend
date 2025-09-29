# Enquire Modal Integration Guide

This guide explains how to integrate the "Enquire Now" modal with your existing buttons throughout the application.

## Overview

The Enquire Modal system consists of:
- `EnquireModal.tsx` - The main modal component
- `EnquireModalContext.tsx` - Global state management
- `EnquireButton.tsx` - Pre-styled button component
- `useEnquireModal.tsx` - Hook for manual integration

## Quick Integration

### Method 1: Use the Pre-built Button Component

Replace any existing "Book Now" or "Explore More" button with the `EnquireButton` component:

```tsx
import EnquireButton from '@/components/EnquireButton';

// Replace this:
<button className="bg-blue-500 text-white px-4 py-2">
  Book Now
</button>

// With this:
<EnquireButton variant="primary">
  Book Now
</EnquireButton>
```

### Method 2: Manual Integration with Hook

For existing buttons, add the modal trigger:

```tsx
import { useEnquireModal } from '@/contexts/EnquireModalContext';

function MyComponent() {
  const { openModal } = useEnquireModal();

  return (
    <button 
      onClick={openModal}
      className="your-existing-classes"
    >
      Book Now
    </button>
  );
}
```

## Button Variants

The `EnquireButton` component supports three variants:

```tsx
// Primary (dark blue)
<EnquireButton variant="primary">Book Now</EnquireButton>

// Secondary (orange)
<EnquireButton variant="secondary">Explore More</EnquireButton>

// Outline (transparent with border)
<EnquireButton variant="outline">Learn More</EnquireButton>
```

## Form Fields

The modal includes all the fields shown in the reference image:

### Left Column:
- First Name (with User icon)
- Email (with Mail icon)
- City of Residence (with Building icon)
- Travel Destination (dropdown with Plane icon)
- No. of People (dropdown with Users icon)

### Right Column:
- Last Name (with User icon)
- Phone Number (with Phone icon)
- WhatsApp Number (with Phone icon)
- Date of Travel (date picker with Calendar icon)
- Vacation Type (dropdown with PalmTree icon)

## Pre-filled Data

The form comes pre-filled with sample data as shown in the reference image:
- First Name: "Nithiya"
- Last Name: "Prasath.S"
- Email: "nithiyaprasath1999@gmail.com"
- Phone: "+91 87541 39334"
- WhatsApp: "+91 87541 39334"
- City: "Chennai"
- Destination: "New York"
- Date: "18.08.2025"
- People: "8"
- Type: "Family Trip"

## Integration Examples

### HeroSection Integration
```tsx
// In HeroSection.tsx, replace the existing button:
<EnquireButton variant="primary" className="text-lg px-8 py-4">
  {activeImage.callToAction}
</EnquireButton>
```

### LocalHappenings Integration
```tsx
// In LocalHappenings.tsx, replace the existing buttons:
<EnquireButton variant="secondary" className="px-7 py-2 text-sm">
  Book now
</EnquireButton>
```

### Footer Integration
```tsx
// In Footer.tsx, replace the existing button:
<EnquireButton variant="secondary" className="px-8 py-3">
  Book now
</EnquireButton>
```

## Styling

The modal matches the exact design from the reference image:
- Dark blue header with "ENQUIRE NOW" title
- White form background with rounded corners
- Two-column layout on desktop
- Icons for each input field
- Orange "SUBMIT" button
- Responsive design for mobile devices

## Form Submission

Currently, the form logs the data to console. To integrate with your backend:

1. Update the `handleSubmit` function in `EnquireModal.tsx`
2. Add your API endpoint
3. Handle success/error states
4. Add loading states if needed

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/enquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Show success message
      onClose();
    }
  } catch (error) {
    // Handle error
  }
};
```

## Global State

The modal state is managed globally, so it can be opened from any component without prop drilling. The modal will always appear on top of the current page content.

## Accessibility

The modal includes:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Close button (X) in header
- Click outside to close (backdrop)
