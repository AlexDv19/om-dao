import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { TOKEN_SYMBOLS } from "../../../entities";
import { observer } from "mobx-react-lite";
import { ARAFormSwapStore } from "../model";

import { TokenAddButton } from "../../add-token-to-metamask";
import { useAccount } from "wagmi";
import { useRootStore } from "../../../app/use-root-store";
import { useTranslation } from 'react-i18next';

export const ARAFormSwap: FC = observer(() => {
  const { t } = useTranslation();
  const rootStore = useRootStore()
  const dcon = useAccount();
  const { refCode } = useRootStore();
  const [store] = useState(
    () => new ARAFormSwapStore(rootStore, refCode, dcon.address)
  );
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus, maxCount, getupdateMaxCount } = store;

  return (
    <>
      <BaseTokensForm
        title={t("common.purchaseToken", { symbol: TOKEN_SYMBOLS.ARAORIG })}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.ARA}
        destinationContractSymbol={TOKEN_SYMBOLS.ARAORIG}
        calculateDestinationAmount={calculateDestinationAmount}
        swapStatus={swapStatus}
        isLoading={isLoading}
        maxCount={maxCount}
        getupdateMaxCount={getupdateMaxCount}
      />
      <TokenAddButton
        className="w-full"
        text={t("common.addToken", {
          symbol: TOKEN_SYMBOLS.ARAORIG,
          walletName: "MetaMask",
        })}
        tokenSymbol={TOKEN_SYMBOLS.ARAORIG}
      />
    </>
  );
});
