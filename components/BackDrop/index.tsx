interface BackDropProps {
  onClick: () => void;
}

export function BackDrop({ onClick }: BackDropProps) {
  return (
    <div
      onClick={onClick}
      className="z-20 bg-shop-body-drop opacity-50 w-screen h-screen fixed top-0 left-0"
    ></div>
  );
}
