import Painel from "./components/Painel";
import OptionsPainel from "./components/Options";

export default function Home() {
  return (
    <main className="">
      <Painel />
      <main className="flex mt-5 ml-10 gap-2.5">
        <OptionsPainel />
      </main>
    </main>
  );
}
