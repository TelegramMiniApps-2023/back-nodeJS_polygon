const PORT = 3000;
const VERCEL_URL = "https://back-node-js-polygon.vercel.app/";

export const production = async (req, res, bot) => {
  debug("Bot runs in production mode");
  debug(`setting webhook: ${VERCEL_URL}`);

  if (!VERCEL_URL) {
    throw new Error("VERCEL_URL is not set.");
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL) {
    debug(`deleting webhook ${VERCEL_URL}`);
    await bot.telegram.deleteWebhook();
    debug(`setting webhook: ${VERCEL_URL}`);
    await bot.telegram.setWebhook(VERCEL_URL);
  }

  if (req.method === "POST") {
    await bot.handleUpdate(req.body, res);
  } else {
    res.status(200).json("Listening to bot events...");
  }
  debug(`starting webhook on port: ${PORT}`);
};
