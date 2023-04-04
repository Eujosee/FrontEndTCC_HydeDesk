import { useState } from "react";
import Qrcode from "../../images/frame.png";

export default function CardPagamento() {
  const [pagamento, setPagamento] = useState("");

  const changePagamento = (e) => {
    setPagamento(e.target.value);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="w-full mb-5 md:mb-10">
        <label className="text-lg font-medium text-gray-900 dark:text-branco">
          Forma de pagamento
        </label>
        <select
          className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent dark:text-branco"
          name="pagamento"
          onChange={changePagamento}
          required
        >
          <option className="dark:bg-gray-800" selected>
            Selecione uma opção
          </option>
          <option className="dark:bg-gray-800 dark:text-gray-50" value="Debito">
            Cartão de débito
          </option>
          <option
            className="dark:bg-gray-800 dark:text-gray-50"
            value="Credito"
          >
            Cartão de crédito
          </option>
          <option className="dark:bg-gray-800 dark:text-gray-50" value="Pix">
            Pix
          </option>
        </select>
      </div>

      <div
        data-pag={pagamento}
        className="data-[pag=Credito]:grid data-[pag=Debito]:grid hidden grid-cols-1 md:grid-cols-2 md:gap-x-5 gap-y-5"
      >
        <div className="w-full md:col-span-2">
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Número do cartão
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent dark:text-branco"
            type="text"
          />
        </div>
        <div className="w-full">
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Validade
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent dark:text-branco"
            type="int"
          />
        </div>
        <div className="w-full">
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            CVV
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent dark:text-branco"
            type="int"
          />
        </div>
        <div className="w-full md:col-span-2">
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Nome do titular
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent dark:text-branco"
            type="text"
          />
        </div>
        <div
          data-pag={pagamento}
          className="w-full data-[pag=Debito]:md:col-span-2"
        >
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            CPF
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  
            p-2 dark:bg-transparent dark:text-branco"
            type="text"
          />
        </div>
        <div
          data-pag={pagamento}
          className="w-full data-[pag=Credito]:grid hidden"
        >
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Parcelamento
          </label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent dark:text-branco"
            name="pagamento"
            required
          >
            <option className="dark:bg-gray-800" selected value="Debito">
              À vista
            </option>
            <option
              className="dark:bg-gray-800 dark:text-branco"
              value="Credito"
            >
              2x (sem juros)
            </option>
            <option className="dark:bg-gray-800 dark:text-branco" value="Pix">
              3x (sem juros)
            </option>
            <option className="dark:bg-gray-800 dark:text-branco" value="Pix">
              4x (sem juros)
            </option>
          </select>
        </div>
      </div>

      <div
        data-pag={pagamento}
        className="data-[pag=Pix]:flex hidden items-center justify-center flex-col"
      >
        <img src={Qrcode} alt="QrCode" />
        <h1 className="text-lg font-semibold dark:text-gray-50">
          Leia o QRcode para realizar o pagamento!
        </h1>
      </div>
    </div>
  );
}
