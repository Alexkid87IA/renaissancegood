const KLAVIYO_COMPANY_ID = 'SXVdnD';
const KLAVIYO_LIST_ID = 'YA9SMX';

export async function subscribeToKlaviyo(
  email: string,
  language: string,
  source = 'Website Footer',
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', revision: '2024-10-15' },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              custom_source: source,
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email,
                    properties: { language },
                  },
                },
              },
            },
            relationships: {
              list: {
                data: { type: 'list', id: KLAVIYO_LIST_ID },
              },
            },
          },
        }),
      },
    );
    return res.ok || res.status === 202;
  } catch {
    return false;
  }
}
