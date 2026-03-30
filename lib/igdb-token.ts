export interface AccessDataType {
  access_token: string;
  expires_in: number;
  token_type: string;
  timestamp: number;
}
let accessData: AccessDataType | null = null;
let pendingRefresh: Promise<AccessDataType | null> | null = null;

export function getAccessData() {
  return accessData;
}

export function setAccessData(token: AccessDataType) {
  accessData = token;
}

export function refreshAccessData(
  fetcher: () => Promise<AccessDataType | null>
): Promise<AccessDataType | null> {
  if (!pendingRefresh) {
    pendingRefresh = fetcher().then((result) => {
      if (result) {
        accessData = result;
      }
      pendingRefresh = null;
      return result;
    });
  }
  return pendingRefresh;
}
