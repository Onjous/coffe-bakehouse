import { coinIcon } from "@/lib/coin-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return coinIcon(180, { inset: 22 });
}
