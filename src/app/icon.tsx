import { coinIcon } from "@/lib/coin-icon";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return coinIcon(48);
}
