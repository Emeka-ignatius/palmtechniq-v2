import { create } from "zustand";

interface AnalyticsEvent {
  id: string;
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  userId?: string;
}

interface AnalyticsState {
  events: AnalyticsEvent[];
  isEnabled: boolean;
  userId?: string;
  sessionId: string;

  // Actions
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  track: (event: string, properties?: Record<string, any>) => void;
  identify: (userId: string, traits?: Record<string, any>) => void;
  page: (name: string, properties?: Record<string, any>) => void;
  setEnabled: (enabled: boolean) => void;
  clearEvents: () => void;
  getEvents: () => AnalyticsEvent[];
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  trackEvent: (event, properties = {}) => get().track(event, properties), // ✅ Fix here

  events: [],
  isEnabled: true,
  sessionId: Date.now().toString(),

  track: (event: string, properties = {}) => {
    const { isEnabled, userId } = get();
    if (!isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      id: Date.now().toString(),
      event,
      properties: {
        ...properties,
        sessionId: get().sessionId,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent:
          typeof window !== "undefined" ? window.navigator.userAgent : "",
      },
      timestamp: new Date(),
      userId,
    };

    set((state) => ({
      events: [...state.events, analyticsEvent],
    }));

    // Send to external analytics services
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", event, properties);
      }

      if (window.fbq) {
        window.fbq("track", event, properties);
      }

      if (window.mixpanel) {
        window.mixpanel.track(event, properties);
      }
    }
  },

  identify: (userId: string, traits = {}) => {
    set({ userId });

    if (typeof window !== "undefined") {
      // Google Analytics
      if (window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          user_id: userId,
        });
      }

      // Mixpanel
      if (window.mixpanel) {
        window.mixpanel.identify(userId);
        window.mixpanel.people.set(traits);
      }
    }
  },

  page: (name: string, properties = {}) => {
    get().track("Page View", {
      page: name,
      ...properties,
    });
  },

  setEnabled: (enabled: boolean) => {
    set({ isEnabled: enabled });
  },

  clearEvents: () => {
    set({ events: [] });
  },

  getEvents: () => {
    return get().events;
  },
}));

// Global analytics functions
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    useAnalyticsStore.getState().track(event, properties);
  },
  identify: (userId: string, traits?: Record<string, any>) => {
    useAnalyticsStore.getState().identify(userId, traits);
  },
  page: (name: string, properties?: Record<string, any>) => {
    useAnalyticsStore.getState().page(name, properties);
  },
};
