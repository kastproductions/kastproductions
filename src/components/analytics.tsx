/**
 * Google Analytics, rendered only when NEXT_PUBLIC_GA_ID is set at build time.
 *
 * Plain inline script instead of `next/script`: the site is static HTML, and
 * `next/script` would add a client chunk even when the ID is unset. The
 * `gtag` stub queues calls immediately; the gtag.js download waits for the
 * `load` event and an idle slot, so it never competes with fonts or hydration.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  const snippet = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
gtag('config','${gaId}');
addEventListener('load',function(){
  var load=function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${gaId}';document.head.appendChild(s)};
  'requestIdleCallback' in window?requestIdleCallback(load):setTimeout(load,1);
});`;

  return <script dangerouslySetInnerHTML={{ __html: snippet }} />;
}
