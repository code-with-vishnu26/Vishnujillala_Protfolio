
# Professional Portfolio Image Implementation Plan

## Overview
Transform your uploaded photo into a professional portrait with a suit and suitable background, then integrate it into the Hero section of your portfolio homepage.

## Current State
- The Hero section currently displays a gradient box with "VJ" initials on the right side
- Your uploaded photo shows you in a white shirt against a plain background
- The photo needs professional enhancement to match a portfolio's aesthetic

## Implementation Steps

### Step 1: Create AI Image Editing Service
Create an edge function that uses Lovable AI's image editing capabilities (google/gemini-2.5-flash-image or google/gemini-3-pro-image-preview) to:
- Transform your photo to show you wearing a professional dark suit/blazer
- Replace the plain background with a professional backdrop (modern office, gradient, or tech-themed)
- Maintain your face and likeness accurately

### Step 2: Generate Professional Image
The AI will be prompted to:
- Keep your exact face, hair, and features
- Replace the white shirt with a professional dark navy or charcoal suit with tie
- Add a sophisticated background suitable for a tech portfolio (subtle gradient, bokeh lights, or modern office setting)
- Apply professional portrait lighting and color grading

### Step 3: Save Generated Image
- Store the generated professional image in the project's assets folder
- Optimize for web display (proper sizing and format)

### Step 4: Update Hero Component
Modify `src/components/Hero.tsx` to:
- Import the professional image
- Replace the gradient "VJ" box with the actual professional photo
- Add professional styling (rounded corners, shadow, border effects)
- Maintain the existing animations and responsive design

## Technical Details

### Edge Function for Image Generation
```text
Location: supabase/functions/generate-professional-image/index.ts
- Uses Lovable AI gateway with google/gemini-3-pro-image-preview model
- Accepts base64 image input
- Returns professionally edited image
```

### Hero Component Changes
```text
Location: src/components/Hero.tsx
Lines 90-107: Replace the current gradient box with:
- <img> element with the professional photo
- Rounded corners (rounded-2xl)
- Shadow effect (shadow-2xl)
- Optional gradient border overlay
- Responsive sizing (w-80 h-96 on desktop, smaller on mobile)
```

### Image Styling
- Add subtle glow effect matching the purple/blue theme
- Apply gradient border to tie into the overall design
- Ensure proper aspect ratio for portrait display

## Expected Result
Your Hero section will display a professional headshot showing you in a suit against a polished background, creating a strong first impression for portfolio visitors while maintaining the existing animations and design language.
