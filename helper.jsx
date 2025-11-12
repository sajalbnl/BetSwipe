const getClobClient = async (signer: any, funderAddress: string) => {
    try {
        //In general don't create a new API key, always derive or createOrDerive
        const creds = await getClobCreds(signer);
        logger.info("creds generated");
        const clobClient = new ClobClient(
            host,
            137,
            signer,
            await creds,
            parseInt(signatureType),
            funderAddress,
        );
        return clobClient;
    } catch (error) {
        logger.error("failed to get clob client");
        console.error(error);
        throw error;
    }
};

const getClobCreds = async (signer: any) => {
    const creds = new ClobClient(host, 137, signer).createOrDeriveApiKey();
    return creds;
};

const createClobCompatibleSigner = (privySigner: any) => {
    return {
        ...privySigner,
        _signTypedData: async (domain: any, types: any, value: any) => {
            // Use the standard signTypedData method that Privy supports
            return await privySigner.signTypedData(domain, types, value);
        },
        getAddress: async () => {
            // Return the address from Privy signer
            return privySigner.address;
        },
    };
};

const placeBet = async (data: {
    walletId: string;
    betAmount: number; // usdc for buy, shares for sell
    outcome: string;
    conditionId: string;
    side: string;
    price: number;
    tokenId: string;
}) => {
    const signer = await privyService.getEthersSigner(data.walletId);
    const clobCompatibleSigner = createClobCompatibleSigner(signer);
    const clobClient = await getClobClient(clobCompatibleSigner, signer.address);
    // const balance = await clobClient.getBalanceAllowance({ asset_type: AssetType.COLLATERAL });
    // inside placeBet, after you instantiate clobClient
    const bal = await clobClient.getBalanceAllowance(
        data.side === "buy"
            ? { asset_type: AssetType.COLLATERAL } // USDC checks for BUY
            : { asset_type: AssetType.CONDITIONAL, token_id: data.tokenId }, // position checks for SELL
    );
    logger.info({ balanceOrPosition: bal });

    // logger.info({ balance });

    const marketOrder = await clobClient.createMarketOrder({
        tokenID: data.tokenId,
        side: data.side == "buy" ? Side.BUY : Side.SELL,
        amount: data.betAmount,
        price: data.price,
    });
    logger.info({ marketOrder });
    const resp = await clobClient.postOrder(marketOrder, OrderType.FOK);
    logger.info({ resp });
    return resp;
};