import { MouseEventHandler } from "react";

type OrderButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

function OrderButton({ onClick, disabled }: OrderButtonProps) {
  return (
    <button
      className="button order-button"
      onClick={onClick}
      disabled={Boolean(disabled)}
    >
      {Boolean(disabled) ? <span>в корзине</span> : <span>заказать</span>}
    </button>
  );
}

export { OrderButton };
