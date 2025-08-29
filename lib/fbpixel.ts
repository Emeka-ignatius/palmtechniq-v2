// lib/fbpixel.ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Track page views
export const pageview = () => {
  (window as any).fbq("track", "PageView");
};

// Track custom events
export const event = (name: string, options = {}) => {
  (window as any).fbq("track", name, options);
};
