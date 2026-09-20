/**
 * Vercel Web Analytics: a page view for every visit, and one event for every
 * call to action a reader clicks.
 *
 * The script comes from this deployment, at the `/_vercel/insights/*` path
 * Vercel adds to a project once Web Analytics is turned on. No third-party
 * host is contacted, nothing is stored on the reader's device and no visitor
 * is identified, so the site needs no consent banner.
 *
 * Plain tags rather than the `@vercel/analytics` component: that component
 * appends the script from an effect, which would leave the tag out of the HTML
 * the build writes and add a client chunk to carry it. These tags are in every
 * emitted page, which is where the suite reads them. The tracker itself
 * counts a client-side route change, so the site keeps its page views while
 * `next/link` moves a reader between pages.
 *
 * The loader is deferred: it is fetched alongside the document and runs only
 * once the whole page is parsed, so it competes with nothing a reader waits
 * for. In `bun run dev` the path is not served and the request 404s, because
 * only a deployment has a tracker to serve.
 */
const script = "/_vercel/insights/script.js";

/*
 * Every call to action on this site is a mailto link, so a click on one is the
 * nearest thing to a conversion the site can observe. One delegated listener
 * counts all of them, rather than a handler at each of the call sites: the
 * links share the shape, not a component.
 *
 * The subject of the mail is how this site marks which door a reader came
 * through, so it is the event's `door`. A link to the bare address carries no
 * subject and reads as `address`. `page` is the path the reader clicked from.
 *
 * `window.va` is the tracker's queue. The stub is the one Vercel documents for
 * plain HTML: it holds a call made before the loader has run, and the tracker
 * drains it on arrival.
 */
const events = `
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};
addEventListener('click',function(e){
  var link=e.target.closest&&e.target.closest('a[href^="mailto:"]');
  if(!link)return;
  var subject=/[?&]subject=([^&]*)/.exec(link.getAttribute('href'));
  window.va('event',{name:'mailto',data:{
    door:subject?decodeURIComponent(subject[1]):'address',
    page:location.pathname
  }});
});`;

export function Analytics() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: events }} />
      <script defer src={script} />
    </>
  );
}
