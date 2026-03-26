import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
        <a
          href="https://www.are.na/block/25962540"
          target="_blank"
          className="text-white/60 hover:text-white transition-colors"
        >
          Original design by Anton Blinkov
        </a>
      </div>
      <Slider />
    </>
  );
}
