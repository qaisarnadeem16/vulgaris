import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const BuyOneTime = async (sessionType: string, email: string, voucherCode?: string) => {
  try {
    const response = await axios.post(`${baseURL}/create-checkout-session`, {
      sessionType,
      email,
      voucherCode: voucherCode || undefined,
    });
    return response.data;
  } catch (error) {
    console.error('Error during checkout session:', error);
    throw error;
  }
};

export const BuySubscription = async (sessionType: string, email: string) => {
  try {
    const response = await axios.post(`${baseURL}/create-checkout-Subscription-session`, {
      sessionType,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error during subscription session:', error);
    throw error;
  }
};

export const TogglePaidOneTime = async (email: string) => {
  try {
    await axios.post(`${baseURL}/api/auth/toggle-paid-Onetime`, {
      email,
    });
  } catch (error) {
    console.error('Error toggling one-time paid:', error);
    throw error;
  }
};
