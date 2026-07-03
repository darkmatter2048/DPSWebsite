/**
 * 实现带有超时功能的fetch函数
 * 用于解决远程图片获取时可能发生的超时问题
 */

/**
 * 带超时的fetch函数
 * @param url 请求URL
 * @param options fetch选项
 * @param timeout 超时时间(毫秒)，默认10秒
 * @returns Promise<Response>
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 10000
): Promise<Response> {
  // 创建一个中止控制器
  const controller = new AbortController();
  const { signal } = controller;
  
  // 创建一个超时Promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`请求超时: ${url}`));
    }, timeout);
    
    // 如果fetch完成，我们需要清除超时定时器
    signal.addEventListener('abort', () => clearTimeout(timeoutId));
  });
  
  // 竞争fetch和超时
  return Promise.race([
    fetch(url, { ...options, signal }),
    timeoutPromise
  ]);
} 