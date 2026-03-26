import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
        <a
          href="https://x.com/MalayVasa/status/1748726374079381930"
          target="_blank"
          className="text-white/60 hover:text-white transition-colors"
        >
          Original design by Malay Vasa
        </a>
      </div>
      <Slider />
    </>
  );
}
