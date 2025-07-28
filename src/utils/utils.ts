import { http } from "./http";

export const exportExcel = async (exUrl: string, name: string, data: any) => {
  try {
    const response = await http.post(
      exUrl,
      { ...data },
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([response as any]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error, "exportExcel");
  }
};

export const getCdnUrl = (url?: string): string => {
  if (!url) return "";
  // 如果已经是完整的URL（以http或https开头），直接返回
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cdn = import.meta.env.VITE_CDN_URL;
  // 确保url开头没有斜杠，CDN_URL结尾有斜杠
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  const cdnBase = cdn.endsWith("/") ? cdn : `${cdn}/`;
  return `${cdnBase}${cleanUrl}`;
};
