/**
 * 自定义的远程图片探测函数
 * 用于替代Astro内部的实现，增加超时处理和错误重试
 */
import { fetchWithTimeout } from './fetch-with-timeout';

/**
 * 从远程URL获取图片尺寸
 * @param url 图片URL
 * @param retries 重试次数
 * @param timeout 超时时间(毫秒)
 * @returns Promise<{width: number, height: number} | null>
 */
export async function probeRemoteImage(
  url: string,
  retries: number = 2,
  timeout: number = 10000
): Promise<{ width: number; height: number } | null> {
  let lastError: Error | null = null;
  
  // 尝试多次获取图片信息
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // 使用带超时的fetch
      const response = await fetchWithTimeout(url, {}, timeout);
      
      if (!response.ok) {
        throw new Error(`获取图片失败: ${response.status} ${response.statusText}`);
      }
      
      // 获取图片的Content-Type头
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error(`URL不是图片: ${url}`);
      }
      
      // 尝试从响应头获取尺寸信息
      // 一些CDN会提供这些信息
      const dimensions = getImageDimensionsFromHeaders(response.headers);
      if (dimensions) {
        return dimensions;
      }
      
      // 如果无法从头信息获取，则使用默认尺寸
      // 这里可以根据需要调整默认值
      return {
        width: 1200,
        height: 630
      };
    } catch (error) {
      lastError = error as Error;
      console.warn(`获取远程图片信息失败(尝试 ${attempt + 1}/${retries + 1}): ${url}`, error);
      
      // 如果还有重试次数，等待一段时间后再试
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  // 所有尝试都失败了，返回默认尺寸
  console.error(`无法获取远程图片信息: ${url}`, lastError);
  return {
    width: 1200,
    height: 630
  };
}

/**
 * 尝试从HTTP头中提取图片尺寸
 * 一些CDN和图片服务会在头信息中提供这些数据
 */
function getImageDimensionsFromHeaders(headers: Headers): { width: number; height: number } | null {
  // 检查常见的头信息格式
  const width = 
    parseInt(headers.get('x-image-width') || 
    headers.get('x-width') || 
    headers.get('image-width') || '') || null;
    
  const height = 
    parseInt(headers.get('x-image-height') || 
    headers.get('x-height') || 
    headers.get('image-height') || '') || null;
    
  if (width && height) {
    return { width, height };
  }
  
  return null;
} 