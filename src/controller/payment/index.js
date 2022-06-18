const { authorizationToken, api } = require("../../api/api");

const charge = {
  calendario: {
    expiracao: 3600,
  },
  devedor: {
    cpf: "12345678909",
    nome: "Anonimous da Silva",
  },
  valor: {
    original: "0.10",
  },
  chave: process.env.PIX_KEY,
  solicitacaoPagador: "Integração api pix gerencianet",
};

const oauthToken = authorizationToken();

module.exports = async (req, res, next) => {
  try {
    const token = await oauthToken;
    const { data } = token;

    api.defaults.headers.common[
      "authorization"
    ] = `${data.token_type} ${data.access_token}`;

    const cob = await api.post("/v2/cob", charge);
    const qrcode = await api.get(`/v2/loc/${cob.data.loc.id}/qrcode`);

    res.render("index", {
      imageQrcode: qrcode.data.imagemQrcode,
      qrcode: qrcode.data.qrcode,
    });
  } catch (error) {
    next(error);
  }
};
