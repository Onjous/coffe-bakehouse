import { interlude } from "@/content/site";
import { Roundel } from "./brand";

/** The name, explained. A copper page in the middle of the menu card. */
export function Interlude() {
  return (
    <section aria-labelledby="interlude-title" className="pinked-top pinked-bottom mt-28 bg-copper text-paper md:mt-40">
      <div className="mx-auto grid max-w-[1680px] items-center gap-y-12 px-4 py-20 sm:px-6 md:grid-cols-12 md:gap-x-8 md:py-28 lg:px-10 lg:py-36">
        <div className="md:col-span-8 lg:col-span-8">
          <h2 id="interlude-title" className="label text-paper">
            Where the name comes from
          </h2>
          <figure className="mt-6 md:mt-8">
            <blockquote>
              <p className="font-display text-[clamp(2.5rem,11vw,3.6rem)] leading-[1.02] tracking-[-0.02em] md:text-[clamp(3.6rem,6.8vw,7.6rem)]">
                <span className="block">{interlude.quote[0]}</span>
                <span className="block md:pl-[8%]">{interlude.quote[1]}</span>
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-[0.95rem] text-paper md:pl-[8%]">
              <span aria-hidden="true" className="h-px w-8 bg-paper/60" />
              <cite className="not-italic">{interlude.source}</cite>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col items-start gap-8 md:col-span-4 md:gap-10">
          <Roundel tone="paper" className="coin-spin w-28 shrink-0 sm:w-36 md:w-[min(100%,15rem)]" />
          <p className="max-w-[24rem] text-[1.02rem] leading-[1.7] text-paper">{interlude.body}</p>
        </div>
      </div>
    </section>
  );
}
