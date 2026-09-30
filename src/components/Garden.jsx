import Img from "./Img";

// Full-bleed evening photograph: the place, not the plate.
export default function Garden() {
  return (
    <section aria-labelledby="garden-title" className="relative isolate min-h-[70vh] overflow-hidden bg-leaf-deep text-white md:min-h-[82vh]">
      <div className="absolute inset-0 -z-10">
        <Img name="night" w={1920} h={1200} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a12]/90 via-[#0b1a12]/35 to-transparent" />
      </div>
      <div className="mx-auto flex min-h-[70vh] max-w-[1320px] flex-col justify-end px-5 pb-14 sm:px-8 md:min-h-[82vh] md:pb-20">
        <h2 id="garden-title" className="display max-w-[16ch] text-5xl sm:text-7xl">Dinner under the palms</h2>
        <p className="mt-5 max-w-[32rem] text-lg text-white/90">
          Served in a garden in the heart of Lekki, from lunch until late.
        </p>
      </div>
    </section>
  );
}
