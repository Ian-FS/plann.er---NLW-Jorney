export default function Loading() {
  return (
    <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center">
      <div className="w-[540px] px-6 py-5 space-y-2 rounded-xl bg-zinc-900 shadow-modalConfirmation">
        <div className="flex flex-col gap-2">
          <h1>Carregando...</h1>
        </div>
      </div>
    </div>
  );
}
